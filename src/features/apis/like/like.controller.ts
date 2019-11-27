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
import { LikeService } from './like.service'

@ApiUseTags('like')
@ApiBearerAuth()
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Put('/:articleId')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
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
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
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
  @UseInterceptors(ClassSerializerInterceptor)
  countArticleLike(
    @Param('articleId') articleId: string,
  ): Promise<Partial<ArticleEntity>[]> {
    return this.likeService.countArticleLike(articleId)
  }
}
