import { CreateCommentDto } from 'src/features/dtos/comment.dto'
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
@UseGuards(AuthGuard('jwt'))
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

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
}
