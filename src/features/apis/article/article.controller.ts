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

  @ApiImplicitQuery({ name: 'own', required: false })
  @ApiImplicitQuery({ name: 'search', required: false })
  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('query')
  getArticles(
    @Query('own') own: string = 'all',
    @Query('search') search: string,
    // @Req() req: IUserRequest,
  ): Promise<any> {
    const query = { own, search }
    // const { user } = req

    return this.articleService.getArticles(query)
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id') id: string): Promise<Partial<ArticleEntity>[]> {
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

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createCatDto: CreateArticleDto,
    @Req() req: IUserRequest,
  ): Promise<void> {
    const { user } = req

    return this.articleService.createArticle(createCatDto, user)
  }

  @ApiImplicitQuery({ name: 'id', required: false })
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  delete(@Query('id') id?: string): Promise<void> {
    return this.articleService.deleteArticle(id)
  }
}
