import { SignInDto } from 'src/features/dtos/signIn.dto'
import { UpdateUserDto } from 'src/features/dtos/updateUser.dto'
import { UserEntity } from 'src/features/entities/user.entity'
import { IUserRequest } from 'src/features/interfaces/auth.interface'

import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiImplicitBody, ApiUseTags } from '@nestjs/swagger'

import { UserService } from './user.service'

@ApiUseTags('user')
@ApiBearerAuth()
@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 登录
  @Get('info')
  async info(@Req() req: IUserRequest): Promise<any> {
    return req.user
  }

  // 更新
  @Patch('update')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: IUserRequest,
  ): Promise<any> {
    const curUser = req.user
    console.log(
      '%c%s',
      'color: #20bd08;font-size:15px',
      '===TQY===: UserController -> constructor -> curUser',
      curUser,
    )
    return await this.userService.updateUser(curUser, updateUserDto)
  }
}
