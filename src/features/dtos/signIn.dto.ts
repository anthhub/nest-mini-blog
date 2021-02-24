import {
  IsAlphanumeric,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

import { ApiModelProperty } from '@nestjs/swagger'

export class SignInDto {
  @ApiModelProperty()
  @IsPhoneNumber('CN', {
    message: '手机号格式错误',
  })
  @IsNotEmpty({ message: '手机号不能为空' })
  readonly mobilePhoneNumber: string

  @ApiModelProperty()
  @MinLength(6, { message: '密码不能少于 6 位' })
  @MaxLength(12, { message: '密码不能多于 12 位' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsAlphanumeric({ message: '密码必须为字母数字' })
  @IsString()
  readonly password: string
}
