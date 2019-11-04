import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'
import { IPage } from 'src/features/interfaces/common.interface'
import { EntityManager, Repository } from 'typeorm'

import { LunarCalendarService } from '../../../shared/services/lunar-calendar/lunar-calendar.service'
import { Logger } from '../../../shared/utils/logger'
import { CreateArticleDto } from '../../dtos/article.dto'
import { ArticleEntity } from '../../entities/article.entity'

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    private readonly lunarCalendarService: LunarCalendarService,
  ) {}

  async getArticle(id: string): Promise<Partial<ArticleEntity>[]> {
    Logger.info('id', id)

    const lunarCalendar = await this.lunarCalendarService
      .getLunarCalendar()
      .toPromise()
    Logger.log(lunarCalendar)
    return await this.articleRepository.findByIds([new ObjectId(id)])
  }

  async getArticles(): Promise<IPage<ArticleEntity>> {
    const edges = await this.articleRepository.find()
    return {
      edges,
      pageInfo: { hasNextPage: true, endCursor: '20' },
    }
  }

  async createArticle(createArticleDto: CreateArticleDto): Promise<void> {
    console.log(
      '%c%s',
      'color: #20bd08;font-size:15px',
      '===TQY===: ArticleService -> createArticleDto',
      createArticleDto,
    )
    await this.articleRepository.save(createArticleDto)
  }

  async deleteArticle(author: string, manager: EntityManager): Promise<void> {
    await manager.delete(ArticleEntity, { author })
  }
}
