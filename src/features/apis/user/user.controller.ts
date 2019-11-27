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
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiImplicitBody, ApiUseTags } from '@nestjs/swagger'

import { ArticleService } from '../article/article.service'
import { UserService } from './user.service'

@ApiUseTags('user')
@ApiBearerAuth()
@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly articleService: ArticleService,
  ) {}

  // 登录
  @Get('info')
  @UseInterceptors(ClassSerializerInterceptor)
  async info(@Req() req: IUserRequest): Promise<any> {
    return req.user
  }

  @Get('/:id/article')
  @UseInterceptors(ClassSerializerInterceptor)
  myArticles(@Param('id') id: string): Promise<any> {
    return this.articleService.getArticlesByUserId(id)
  }

  @Get('/:id/like')
  @UseInterceptors(ClassSerializerInterceptor)
  myLikes(@Param('id') id: string): Promise<any> {
    return this.articleService.getLikesByUserId(id)
  }

  // 更新
  @Patch('update')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: IUserRequest,
  ): Promise<any> {
    const curUser = req.user

    return await this.userService.updateUser(curUser, updateUserDto)
  }
}
