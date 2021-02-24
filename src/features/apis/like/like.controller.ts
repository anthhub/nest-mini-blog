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
import { LikeService } from './like.service'

@ApiUseTags('like')
@ApiBearerAuth()
@Controller('like')
@UseGuards(AuthGuard('jwt'))
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Get('/:articleId')
  @ApiOperation({ title: '我是否点赞文章', deprecated: true })
  isLiked(
    @Param('articleId') articleId: string,
    @Req() req: IUserRequest,
  ): Promise<Partial<ArticleEntity>[]> {
    const {
      user: { id: userId },
    } = req
    return this.likeService.isLiked(articleId, userId)
  }

  @Put('/:articleId')
  @ApiOperation({ title: '点赞文章' })
  like(
    @Param('articleId') articleId: string,
    @Req() req: IUserRequest,
  ): Promise<Partial<ArticleEntity>[]> {
    const {
      user: { id: userId },
    } = req
    return this.likeService.putArticleLike(articleId, userId)
  }

  @Delete('/:articleId')
  @ApiOperation({ title: '取消点赞文章' })
  unlike(
    @Param('articleId') articleId: string,
    @Req() req: IUserRequest,
  ): Promise<Partial<ArticleEntity>[]> {
    const {
      user: { id: userId },
    } = req
    return this.likeService.deleteArticleLike(articleId, userId)
  }

  @Get('/:articleId/count')
  @ApiOperation({ title: '文章点赞数', deprecated: true })
  countArticleLike(
    @Param('articleId') articleId: string,
  ): Promise<Partial<ArticleEntity>[]> {
    return this.likeService.countArticleLike(articleId)
  }
}
