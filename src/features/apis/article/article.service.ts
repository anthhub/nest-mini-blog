import { ObjectId } from 'mongodb'
import { InjectModel } from 'nestjs-typegoose'
import { UserEntity } from 'src/features/entities/user.entity'
import { IPage } from 'src/features/interfaces/common.interface'
import { EntityManager, Like, Repository } from 'typeorm'

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ReturnModelType } from '@typegoose/typegoose'

import { LunarCalendarService } from '../../../shared/services/lunar-calendar/lunar-calendar.service'
import { Logger } from '../../../shared/utils/logger'
import { CreateArticleDto } from '../../dtos/article.dto'
import { ArticleEntity } from '../../entities/article.entity'

@Injectable()
export class ArticleService {
  constructor(
    // @InjectRepository(ArticleEntity)
    // private readonly articleRepository: Repository<ArticleEntity>,
    private readonly lunarCalendarService: LunarCalendarService,

    @InjectModel(ArticleEntity)
    private readonly articleRepository: ReturnModelType<typeof ArticleEntity>,
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

  async createArticle(
    createArticleDto: CreateArticleDto,
    user: UserEntity,
  ): Promise<any> {
    return await new this.articleRepository({
      ...createArticleDto,
      user: user.id,
    }).save()
  }

  async deleteArticle(id: string): Promise<any> {
    if (id) {
      return this.articleRepository.findByIdAndRemove(id)
    } else {
      return this.articleRepository.remove({})
    }
  }
}
