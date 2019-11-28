import { CreateCommentDto } from 'src/features/dtos/comment.dto'
import { ArticleEntity } from 'src/features/entities/article.entity'
import { IUserRequest } from 'src/features/interfaces/auth.interface'
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

import { CommentService } from './comment.service'

@ApiUseTags('comment')
@ApiBearerAuth()
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  comment(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: IUserRequest,
  ): Promise<void> {
    const {
      user: { id: userId },
    } = req

    return this.commentService.comment(createCommentDto, userId)
  }

  @Get('/:articleId')
  @UseInterceptors(ClassSerializerInterceptor)
  comments(@Param('articleId') articleId: string): Promise<Partial<any>[]> {
    return this.commentService.comments(articleId)
  }

  @Get('/:articleId/count')
  @UseInterceptors(ClassSerializerInterceptor)
  countArticleComment(
    @Param('articleId') articleId: string,
  ): Promise<Partial<ArticleEntity>[]> {
    return this.commentService.countArticleComment(articleId)
  }

  @Put('/:commentId/like')
  @UseInterceptors(ClassSerializerInterceptor)
  likeComment(
    @Param('commentId') commentId: string,
  ): Promise<Partial<ArticleEntity>[]> {
    return this.commentService.putCommentLike(commentId)
  }

  @Delete('/:commentId/like')
  @UseInterceptors(ClassSerializerInterceptor)
  unlikeComment(
    @Param('commentId') commentId: string,
  ): Promise<Partial<ArticleEntity>[]> {
    return this.commentService.deleteCommentLike(commentId)
  }
}
