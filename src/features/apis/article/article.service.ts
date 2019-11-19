import { ObjectId } from 'mongodb'
import { InjectModel } from 'nestjs-typegoose'
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

  async getArticle(id: string): Promise<any> {
    Logger.info('id', id)

    const doc: any = await this.articleRepository.findById(id)

    return doc && doc._doc
  }

  async getArticles(query: {
    own: string
    search: string
  }): Promise<IPage<ArticleEntity>> {
    const { own, search } = query

    const reg = new RegExp(search, 'i')

    const option = search
      ? {
          $or: [{ title: { $regex: reg } }, { content: { $regex: reg } }],
        }
      : {}

    const edges = await this.articleRepository.find(
      {
        ...option,
      },
      null,
      {
        sort: { update_at: -1 }, // 按照 _id倒序排列
        limit: 20, // 查询100条
      },
    )

    return {
      edges,
      pageInfo: { hasNextPage: true, endCursor: '20' },
    }
  }

  async createArticle(createArticleDto: CreateArticleDto): Promise<any> {
    console.log(
      '%c%s',
      'color: #20bd08;font-size:15px',
      '===TQY===: ArticleService -> createArticleDto',
      createArticleDto,
    )
    return await new this.articleRepository(createArticleDto).save()
  }

  // async deleteArticle(author: string, manager: EntityManager): Promise<void> {
  //   await manager.delete(ArticleEntity, { author })
  // }
}
