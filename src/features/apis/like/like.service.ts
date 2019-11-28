import { ObjectId } from 'mongodb'
import { InjectModel } from 'nestjs-typegoose'
import { LikeEntity } from 'src/features/entities/like.entity'

import { IPage } from 'src/features/interfaces/common.interface'

import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'

import { Logger } from '../../../shared/utils/logger'
import { CreateArticleDto } from '../../dtos/article.dto'
import { ArticleEntity } from '../../entities/article.entity'
import { FollowEntity } from '../../entities/follow.entity'

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(LikeEntity)
    private readonly likeRepository: ReturnModelType<typeof LikeEntity>,
    @InjectModel(ArticleEntity)
    private readonly articleRepository: ReturnModelType<typeof ArticleEntity>,
  ) {}

  async getLikesByUserId(id: string): Promise<IPage<ArticleEntity>> {
    const edges = await this.likeRepository
      .find({ user: id }, null, {
        sort: { update_at: -1 }, // 按照 _id倒序排列
        // limit: 20, // 查询100条
      })
      .populate({ path: 'article', populate: 'user' })

    return {
      edges: edges.map(item => item.article) as ArticleEntity[],
      pageInfo: { hasNextPage: true, endCursor: '20' },
    }
  }

  async isLiked(articleId: string, userId: ObjectId): Promise<any> {
    const obj: any = await this.likeRepository.findOne({
      article: articleId,
      user: userId,
    })
    return { like: !!obj }
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

  async getLikesCount(id: string): Promise<any> {
    return await this.likeRepository.count({ user: id })
  }

  async getLikedCount(id: string): Promise<any> {
    const articles = await this.articleRepository.find({ user: id })
    const ids = articles.map(item => item.id)
    return await this.likeRepository.count({ article: { $in: ids } })
  }
}
