import { ObjectId } from 'mongodb'
import { InjectModel } from 'nestjs-typegoose'

import { IPage } from 'src/features/interfaces/common.interface'

import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'

import { Logger } from '../../../shared/utils/logger'
import { CreateArticleDto } from '../../dtos/article.dto'
import { ArticleEntity } from '../../entities/article.entity'
import { FollowEntity } from '../../entities/follow.entity'

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(ArticleEntity)
    private readonly articleRepository: ReturnModelType<typeof ArticleEntity>,
  ) {}

  async getViewCount(id: string): Promise<any> {
    return (await this.articleRepository.find({ user: id })).reduce(
      (res, cur) => {
        res = res + (cur ? Number(cur.viewCount) : 0)
        return res
      },
      0,
    )
  }

  async putViewCount(id: string): Promise<any> {
    const doc: any = await this.articleRepository.findByIdAndUpdate(id, {
      $inc: { viewCount: 1 },
    })

    return doc && doc._doc
  }

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

  async getArticleStat(articleId: string, userId: string): Promise<any> {
    return
  }

  async getArticles(query: {
    own: string
    search: string
    endCursor: number
  }): Promise<IPage<ArticleEntity>> {
    const { own, search, endCursor } = query

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

    const control =
      endCursor || endCursor >= 0
        ? {
            skip: endCursor,
            sort: { update_at: -1 }, // 按照 _id倒序排列
            limit: 20, // 查询100条
          }
        : { sort: { update_at: -1 } }

    const edges = await this.articleRepository
      .find(
        {
          ...option,
        },
        null,
        {
          ...control,
        },
      )
      .populate('user')

    return {
      edges,
      pageInfo: { hasNextPage: !!edges.length, endCursor: endCursor + 20 },
    }
  }

  async getArticlesByUserId(
    id: string,
    endCursor: number,
  ): Promise<IPage<ArticleEntity>> {
    const control =
      endCursor || endCursor >= 0
        ? {
            skip: endCursor,
            sort: { update_at: -1 }, // 按照 _id倒序排列
            limit: 20, // 查询100条
          }
        : { sort: { update_at: -1 } }

    const edges = await this.articleRepository
      .find({ user: id }, null, {
        ...control,
      })
      .populate('user')

    return {
      edges,
      pageInfo: { hasNextPage: true, endCursor: 20 },
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
}
