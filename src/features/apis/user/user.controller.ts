import { UpdateUserDto } from '../../dtos/updateUser.dto'

import { IUserRequest } from '../../interfaces/auth.interface'

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
import {
  ApiBearerAuth,
  ApiImplicitBody,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger'

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

  @Get('/:id/articles')
  @ApiOperation({ title: '获取用户写的文章' })
  myArticles(
    @Param('id') id: string,
    @Query('endCursor') endCursor: number,
  ): Promise<any> {
    return this.articleService.getArticlesByUserId(id, +endCursor)
  }

  @Get('/:id/likes')
  @ApiOperation({ title: '获取用户点赞的文章' })
  myLikes(@Param('id') id: string): Promise<any> {
    return this.likeService.getLikesByUserId(id)
  }

  @Get('/:id/followers')
  @ApiOperation({ title: '获取关注用户的人' })
  myFollowers(@Param('id') id: string, @Req() req: IUserRequest): Promise<any> {
    return this.followService.getFollowersByUserId(id, req.userId)
  }

  @Get('/:id/following')
  @ApiOperation({ title: '获取用户关注的人' })
  myFollowing(@Param('id') id: string): Promise<any> {
    return this.followService.getFollowingByUserId(id)
  }

  @Get('/:id/isFollowing/:followerId')
  @ApiOperation({ title: '是否关注此用户' })
  isMyFollowing(
    @Param('id') id: string,
    @Param('followerId') followerId: string,
  ): Promise<any> {
    return this.followService.isFollowing(id, followerId)
  }

  @Get('/:id/followers/count')
  @ApiOperation({ title: '关注我的人数', deprecated: true })
  myFollowersCount(@Param('id') id: string): Promise<any> {
    return this.followService.getFollowersCount(id)
  }

  @Get('/:id/following/count')
  @ApiOperation({ title: '我关注的人数', deprecated: true })
  myFollowingCount(@Param('id') id: string): Promise<any> {
    return this.followService.getFollowingCount(id)
  }

  @Get('/:id/view/count')
  @ApiOperation({ title: '我的文章的总阅读数', deprecated: true })
  myViewCount(@Param('id') id: string): Promise<any> {
    return this.articleService.getViewCount(id)
  }

  @Get('/:id/likes/count')
  @ApiOperation({ title: '获取用户点赞数', deprecated: true })
  myLikesCount(@Param('id') id: string): Promise<any> {
    return this.likeService.getLikesCount(id)
  }

  @Get('/:id/liked/count')
  @ApiOperation({ title: '获取用户被点赞数', deprecated: true })
  myLikedCount(@Param('id') id: string): Promise<any> {
    return this.likeService.getLikedCount(id)
  }

  // 更新
  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  @ApiOperation({ title: '更新用户信息' })
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: IUserRequest,
  ): Promise<any> {
    const curUser = req.user
    console.log(
      '%c%s',
      'color: #20bd08;font-size:15px',
      '===TQY===: UserController -> curUser',
      curUser,
    )
    console.log(
      '%c%s',
      'color: #20bd08;font-size:15px',
      '===TQY===: UserController -> updateUserDto',
      updateUserDto,
    )

    return await this.userService.updateUser(curUser, updateUserDto)
  }

  @Get('/:id/info')
  @ApiOperation({ title: '获取用户信息' })
  async info(@Param('id') id: string): Promise<any> {
    return this.userService.getUserInfoById(id)
  }
}
