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

import { ArticleEntity } from '../../entities/article.entity'
import { IUserRequest } from '../../interfaces/auth.interface'
import { FollowService } from './follow.service'

@ApiUseTags('follow')
@ApiBearerAuth()
@Controller('follow')
@UseGuards(AuthGuard('jwt'))
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Put('/:followingId')
  @ApiOperation({ title: '关注某人' })
  follow(
    @Param('followingId') followingId: string,
    @Req() req: IUserRequest,
  ): Promise<Partial<ArticleEntity>[]> {
    const {
      user: { id: userId },
    } = req
    return this.followService.putUserFollow(followingId, userId)
  }

  @Delete('/:followingId')
  @ApiOperation({ title: '取消关注某人' })
  unfollow(
    @Param('followingId') followingId: string,
    @Req() req: IUserRequest,
  ): Promise<Partial<ArticleEntity>[]> {
    const {
      user: { id: userId },
    } = req
    return this.followService.deleteUserFollow(followingId, userId)
  }
}
