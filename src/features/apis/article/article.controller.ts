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
import {
  ApiBearerAuth,
  ApiImplicitQuery,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger'

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
  @ApiOperation({ title: '文章搜索' })
  @ApiImplicitQuery({ name: 'own', required: false })
  @ApiImplicitQuery({ name: 'search', required: false })
  getArticles(
    @Query('own') own: string = 'all',
    @Query('search') search: string,
    @Query('endCursor') endCursor: number,
  ): Promise<any> {
    const query = { own, search, endCursor: +endCursor }

    return this.articleService.getArticles(query)
  }

  @Get(':id')
  @ApiOperation({ title: '获取文章详情' })
  getArticleById(@Param('id') id: string): Promise<Partial<ArticleEntity>[]> {
    return this.articleService.getArticle(id)
  }

  @Patch(':id')
  @ApiOperation({ title: '修改文章' })
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateArticleDto: CreateArticleDto,
  ): Promise<Partial<ArticleEntity>[]> {
    return this.articleService.updateArticle(id, updateArticleDto)
  }

  @Put(':id/putViewCount')
  @ApiOperation({ title: '调用此接口,阅读数+1' })
  putViewCount(@Param('id') id: string): Promise<Partial<ArticleEntity>[]> {
    return this.articleService.putViewCount(id)
  }

  @Post()
  @ApiOperation({ title: '发布新文章' })
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
  @ApiOperation({ title: '删除指定文章,不传 id 删除所有' })
  @ApiImplicitQuery({ name: 'id', required: true })
  @UseGuards(AuthGuard('jwt'))
  delete(@Query('id') id?: string): Promise<void> {
    return this.articleService.deleteArticle(id)
  }
}
