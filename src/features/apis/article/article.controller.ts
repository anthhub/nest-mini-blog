import { EntityManager, Transaction, TransactionManager } from 'typeorm'

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Render,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiImplicitQuery, ApiUseTags } from '@nestjs/swagger'

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
  @ApiImplicitQuery({ name: 'own', required: false })
  @ApiImplicitQuery({ name: 'search', required: false })
  @UseInterceptors(ClassSerializerInterceptor)
  getArticles(
    @Query('own') own: string = 'all',
    @Query('search') search: string,
    @Query('endCursor') endCursor: number,
  ): Promise<any> {
    const query = { own, search, endCursor: +endCursor }

    return this.articleService.getArticles(query)
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  getArticleById(@Param('id') id: string): Promise<Partial<ArticleEntity>[]> {
    return this.articleService.getArticle(id)
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  update(
    @Param('id') id: string,
    @Body() updateArticleDto: CreateArticleDto,
  ): Promise<Partial<ArticleEntity>[]> {
    return this.articleService.updateArticle(id, updateArticleDto)
  }

  @Put(':id/putViewCount')
  @UseInterceptors(ClassSerializerInterceptor)
  putViewCount(@Param('id') id: string): Promise<Partial<ArticleEntity>[]> {
    return this.articleService.putViewCount(id)
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createCatDto: CreateArticleDto,
    @Req() req: IUserRequest,
  ): Promise<void> {
    const {
      user: { id: userId },
    } = req

    return this.articleService.createArticle(createCatDto, userId)
  }

  @Delete()
  @ApiImplicitQuery({ name: 'id', required: false })
  @UseGuards(AuthGuard('jwt'))
  delete(@Query('id') id?: string): Promise<void> {
    return this.articleService.deleteArticle(id)
  }
}
