import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

import { ApiModelProperty } from '@nestjs/swagger'

import { SignInDto } from './signIn.dto'

export class SignUpDto extends SignInDto {
  @ApiModelProperty()
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString()
  readonly username: string
}
