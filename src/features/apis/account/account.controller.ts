import { Body, Controller, Post, Request } from '@nestjs/common'
import { ApiOperation, ApiUseTags } from '@nestjs/swagger'
import { SignInDto } from '../../dtos/signIn.dto'
import { UserEntity } from '../../entities/user.entity'

import { SignUpDto } from '../../dtos/signUp.dto'
import { IToken } from '../../interfaces/auth.interface'

import { AccountService } from './account.service'

@ApiUseTags('account')
@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  // 注册
  @Post('signUp')
  @ApiOperation({ title: '注册' })
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return await this.accountService.signUp(signUpDto)
  }

  // 登录
  @Post('signIn')
  @ApiOperation({ title: '登录' })
  async signIn(@Body() signInDto: SignInDto): Promise<IToken | UserEntity> {
    return await this.accountService.signIn(signInDto)
  }
}
