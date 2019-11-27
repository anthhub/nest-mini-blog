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

import { ArticleEntity } from '../../entities/article.entity'
import { IUserRequest } from '../../interfaces/auth.interface'
import { FollowService } from './follow.service'

@ApiUseTags('follow')
@ApiBearerAuth()
@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Put('/:following')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  follow(
    @Param('following') following: string,
    @Req() req: IUserRequest,
  ): Promise<Partial<ArticleEntity>[]> {
    const {
      user: { id: userId },
    } = req
    return this.followService.putUserFollow(following, userId)
  }

  @Delete('/:following')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  unfollow(
    @Param('following') following: string,
    @Req() req: IUserRequest,
  ): Promise<Partial<ArticleEntity>[]> {
    const {
      user: { id: userId },
    } = req
    return this.followService.deleteUserFollow(following, userId)
  }
}
