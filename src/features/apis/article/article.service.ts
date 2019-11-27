import { ObjectId } from 'mongodb'
import { InjectModel } from 'nestjs-typegoose'
import { LikeEntity } from 'src/features/entities/like.entity'
import { UserEntity } from 'src/features/entities/user.entity'
import { IPage } from 'src/features/interfaces/common.interface'

import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'

import { Logger } from '../../../shared/utils/logger'
import { CreateArticleDto } from '../../dtos/article.dto'
import { ArticleEntity } from '../../entities/article.entity'

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(ArticleEntity)
    private readonly articleRepository: ReturnModelType<typeof ArticleEntity>,
    @InjectModel(LikeEntity)
    private readonly likeRepository: ReturnModelType<typeof LikeEntity>,
  ) {}

  async updateArticle(
    id: string,
    updateArticleDto: CreateArticleDto,
  ): Promise<any> {
    Logger.info('id', id)

    const doc: any = await this.articleRepository.findByIdAndUpdate(
      id,
      updateArticleDto,
    )

    return doc && doc._doc
  }

  async getArticle(id: string): Promise<any> {
    Logger.info('id', id)

    const doc: any = await this.articleRepository.findById(id).populate('user')

    return doc && doc._doc
  }

  async getArticles(query: {
    own: string
    search: string
  }): Promise<IPage<ArticleEntity>> {
    const { own, search } = query

    const option = search
      ? {
          $or: [
            {
              type: { $regex: new RegExp('.*?' + search.trim() + '.*?', 'i') },
            },

            {
              title: { $regex: new RegExp('.*?' + search.trim() + '.*?', 'i') },
            },
            {
              html: {
                $regex: new RegExp(
                  '<[a-zA-Z]+?.*?>.*?' + search.trim() + '.*?</[a-zA-Z]+?.*?>',
                  'i',
                ),
              },
            },
          ],
        }
      : {}

    const edges = await this.articleRepository
      .find(
        {
          ...option,
        },
        null,
        {
          sort: { update_at: -1 }, // 按照 _id倒序排列
          // limit: 20, // 查询100条
        },
      )
      .populate('user')

    return {
      edges,
      pageInfo: { hasNextPage: true, endCursor: '20' },
    }
  }

  async getArticlesByUserId(id: string): Promise<IPage<ArticleEntity>> {
    const edges = await this.articleRepository
      .find({ user: id }, null, {
        sort: { update_at: -1 }, // 按照 _id倒序排列
        // limit: 20, // 查询100条
      })
      .populate('user')

    return {
      edges,
      pageInfo: { hasNextPage: true, endCursor: '20' },
    }
  }

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

  async createArticle(
    createArticleDto: CreateArticleDto,
    userId: ObjectId,
  ): Promise<any> {
    return await new this.articleRepository({
      ...createArticleDto,
      user: userId,
    }).save()
  }

  async deleteArticle(id: string): Promise<any> {
    if (id) {
      return this.articleRepository.findByIdAndRemove(id)
    } else {
      // return this.articleRepository.remove({})
    }
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
}
