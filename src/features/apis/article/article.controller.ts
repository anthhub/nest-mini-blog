import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Render,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger'
import { EntityManager, Transaction, TransactionManager } from 'typeorm'

import { CreateArticleDto } from '../../dtos/article.dto'
import { ArticleEntity } from '../../entities/article.entity'

import { ArticleService } from './article.service'

@ApiUseTags('article')
@ApiBearerAuth()
@Controller('article')
// @UseGuards(AuthGuard())
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('query')
  // @Render('catsPage')
  @UseInterceptors(ClassSerializerInterceptor)
  getCatsPage(): Promise<any> {
    return this.articleService.getArticles()
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id') id: string): Promise<Partial<ArticleEntity>[]> {
    return this.articleService.getArticle(id)
  }

  @Post()
  create(@Body() createCatDto: CreateArticleDto): Promise<void> {
    return this.articleService.createArticle(createCatDto)
  }

  @Delete(':author')
  @Transaction()
  delete(
    @Param('author') author: string,
    @TransactionManager() manager: EntityManager,
  ): Promise<void> {
    return this.articleService.deleteArticle(author, manager)
  }
}
