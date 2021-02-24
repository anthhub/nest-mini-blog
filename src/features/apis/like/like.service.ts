import { ObjectId } from 'mongodb'
import { InjectModel } from 'nestjs-typegoose'
import { LikeEntity } from '../../entities/like.entity'

import { IPage } from '../../interfaces/common.interface'

import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'

import { ArticleEntity } from '../../entities/article.entity'
import { CommentService } from '../comment/comment.service'

@Injectable()
export class LikeService {
  constructor(
    private readonly commentService: CommentService,
    @InjectModel(LikeEntity)
    private readonly likeRepository: ReturnModelType<typeof LikeEntity>,
    @InjectModel(ArticleEntity)
    private readonly articleRepository: ReturnModelType<typeof ArticleEntity>,
  ) {}

  async getLikesByUserId(id: string): Promise<IPage<ArticleEntity>> {
    const list = (await this.likeRepository
      .find({ user: id }, null, {
        sort: { update_at: -1 }, // 按照 _id倒序排列
        // limit: 20, // 查询100条
      })
      .populate({ path: 'article', populate: 'user' }))
      .map(item => item.article)
      .filter(Boolean) as ArticleEntity[]

    const edges: any[] = await Promise.all(
      list.map(async item => {
        item.likeCount = await this.countArticleLike(
          (item.id as unknown) as string,
        )
        item.commentCount = await this.commentService.countArticleComment(
          (item.id as unknown) as string,
        )
        item.isLiked = true
        return item
      }),
    )

    return {
      edges,
      pageInfo: { hasNextPage: true, endCursor: 20 },
    }
  }

  async isLiked(articleId: string, userId: ObjectId): Promise<any> {
    const obj: any = await this.likeRepository.findOne({
      article: articleId,
      user: userId,
    })
    return !!obj
  }

  async putArticleLike(articleId: string, userId: ObjectId): Promise<any> {
    const obj: any = await this.likeRepository.findOne({
      article: articleId,
      user: userId,
    })

    if (obj) {
      return
    }

    return await new this.likeRepository({
      article: articleId,
      user: userId,
    }).save()
  }

  async deleteArticleLike(articleId: string, userId: ObjectId): Promise<any> {
    return await this.likeRepository.findOneAndRemove({
      article: articleId,
      user: userId,
    })
  }

  async countArticleLike(articleId: string): Promise<any> {
    return await this.likeRepository.count({ article: articleId })
  }

  async getLikedCount(id: string): Promise<any> {
    const articles = await this.articleRepository.find({ user: id })
    const ids = articles.map(item => item.id)
    return await this.likeRepository.count({ article: { $in: ids } })
  }

  async getLikesCount(id: string): Promise<any> {
    return await this.likeRepository.count({ user: id })
  }
}
