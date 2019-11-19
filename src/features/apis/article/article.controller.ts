import { EntityManager, Transaction, TransactionManager } from 'typeorm'

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Render,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger'

import { CreateArticleDto } from '../../dtos/article.dto'
import { ArticleEntity } from '../../entities/article.entity'
import { IUserRequest } from '../../interfaces/auth.interface'
import { ArticleService } from './article.service'

@ApiUseTags('article')
@ApiBearerAuth()
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('query')
  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  getArticles(
    @Query('own') own: string = 'all',
    @Query('search') search: string,
    @Req() req: IUserRequest,
  ): Promise<any> {
    const query = { own, search }
    const { user } = req
    console.log(
      '%c%s',
      'color: #20bd08;font-size:15px',
      '===TQY===: ArticleController -> constructor -> query',
      query,
    )
    console.log(
      '%c%s',
      'color: #20bd08;font-size:15px',
      '===TQY===: ArticleController -> constructor -> user',
      user,
    )
    return this.articleService.getArticles(query)
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id') id: string): Promise<Partial<ArticleEntity>[]> {
    return this.articleService.getArticle(id)
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createCatDto: CreateArticleDto): Promise<void> {
    return this.articleService.createArticle(createCatDto)
  }

  // @Delete(':author')
  // @Transaction()
  // delete(
  //   @Param('author') author: string,
  //   @TransactionManager() manager: EntityManager,
  // ): Promise<void> {
  //   return this.articleService.deleteArticle(author, manager)
  // }
}
