import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiImplicitBody, ApiUseTags } from '@nestjs/swagger'
import { SignInDto } from 'src/features/dtos/signIn.dto'

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

  // // 更新
  // @Post('update')
  // async update(@Body() signInDto: SignInDto): Promise<IToken | UserEntity> {
  //   return await this.accountService.signIn(signInDto)
  // }
}
