import { Body, Controller, Post, Request } from '@nestjs/common'
import { ApiImplicitBody, ApiUseTags } from '@nestjs/swagger'
import { SignInDto } from 'src/features/dtos/signIn.dto'

import { SignUpDto } from '../../dtos/signUp.dto'
import { IToken } from '../../interfaces/auth.interface'

import { AccountService } from './account.service'

@ApiUseTags('account')
@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  // 注册
  @Post('signUp')
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return await this.accountService.signUp(signUpDto)
  }

  // 登录
  @Post('signIn')
  async signIn(@Body() signInDto: SignInDto): Promise<IToken> {
    return await this.accountService.signIn(signInDto)
  }
}
