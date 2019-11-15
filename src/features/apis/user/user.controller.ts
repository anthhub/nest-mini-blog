import { SignInDto } from 'src/features/dtos/signIn.dto'
import { UpdateUserDto } from 'src/features/dtos/updateUser.dto'
import { UserEntity } from 'src/features/entities/user.entity'

import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiImplicitBody, ApiUseTags } from '@nestjs/swagger'

import { SignUpDto } from '../../dtos/signUp.dto'
import { IToken } from '../../interfaces/auth.interface'
import { UserService } from './user.service'

@ApiUseTags('user')
@ApiBearerAuth()
@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 登录
  @Get('info')
  async info(@Request() req): Promise<any> {
    return req.user
  }

  // 更新
  @Patch('update')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
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
