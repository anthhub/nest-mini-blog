import { SignInDto } from 'src/features/dtos/signIn.dto'
import { UpdateUserDto } from 'src/features/dtos/updateUser.dto'
import { ArticleEntity } from 'src/features/entities/article.entity'
import { UserEntity } from 'src/features/entities/user.entity'
import { IUserRequest } from 'src/features/interfaces/auth.interface'

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiImplicitBody, ApiUseTags } from '@nestjs/swagger'

import { ArticleService } from '../article/article.service'
import { FollowService } from '../follow/follow.service'
import { LikeService } from '../like/like.service'
import { UserService } from './user.service'

@ApiUseTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly articleService: ArticleService,
    private readonly likeService: LikeService,
    private readonly followService: FollowService,
  ) {}

  // 更新
  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: IUserRequest,
  ): Promise<any> {
    const curUser = req.user
    return await this.userService.updateUser(curUser, updateUserDto)
  }

  @Get('/:id/info')
  @UseInterceptors(ClassSerializerInterceptor)
  async info(@Param('id') id: string): Promise<any> {
    return this.userService.getUserById(id)
  }

  @Get('/:id/articles')
  @UseInterceptors(ClassSerializerInterceptor)
  myArticles(
    @Param('id') id: string,
    @Query('endCursor') endCursor: number,
  ): Promise<any> {
    return this.articleService.getArticlesByUserId(id, +endCursor)
  }

  @Get('/:id/likes')
  @UseInterceptors(ClassSerializerInterceptor)
  myLikes(@Param('id') id: string): Promise<any> {
    return this.likeService.getLikesByUserId(id)
  }

  @Get('/:id/likes/count')
  @UseInterceptors(ClassSerializerInterceptor)
  myLikesCount(@Param('id') id: string): Promise<any> {
    return this.likeService.getLikesCount(id)
  }

  @Get('/:id/liked/count')
  @UseInterceptors(ClassSerializerInterceptor)
  myLikedCount(@Param('id') id: string): Promise<any> {
    return this.likeService.getLikedCount(id)
  }

  @Get('/:id/followers')
  @UseInterceptors(ClassSerializerInterceptor)
  myFollowers(@Param('id') id: string): Promise<any> {
    return this.followService.getFollowersByUserId(id)
  }

  @Get('/:id/following')
  @UseInterceptors(ClassSerializerInterceptor)
  myFollowing(@Param('id') id: string): Promise<any> {
    return this.followService.getFollowingByUserId(id)
  }

  // 关注我的人
  @Get('/:id/followers/count')
  @UseInterceptors(ClassSerializerInterceptor)
  myFollowersCount(@Param('id') id: string): Promise<any> {
    return this.followService.getFollowersCount(id)
  }

  // 我关注的人
  @Get('/:id/following/count')
  @UseInterceptors(ClassSerializerInterceptor)
  myFollowingCount(@Param('id') id: string): Promise<any> {
    return this.followService.getFollowingCount(id)
  }

  @Get('/:id/view/count')
  @UseInterceptors(ClassSerializerInterceptor)
  myViewCount(@Param('id') id: string): Promise<any> {
    return this.articleService.getViewCount(id)
  }
}
