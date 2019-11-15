import {
  IsEmail,
  IsEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator'

import { ApiModelProperty } from '@nestjs/swagger'

export class UpdateUserDto {
  @ApiModelProperty()
  @IsEmail(
    {},
    {
      message: '邮箱错误',
    },
  )
  @IsOptional()
  readonly email: string

  @ApiModelProperty()
  @IsString({ message: '格式错误' })
  @IsOptional()
  readonly avatarHd: string

  @ApiModelProperty()
  @IsString({ message: '格式错误' })
  @IsOptional()
  readonly avatarLarge: string

  @ApiModelProperty()
  @IsString({ message: '格式错误' })
  @IsOptional()
  readonly blogAddress: string

  @ApiModelProperty()
  @IsString({ message: '格式错误' })
  @IsOptional()
  readonly company: string

  @ApiModelProperty()
  @IsString({ message: '格式错误' })
  @IsOptional()
  readonly jobTitle: string

  @ApiModelProperty()
  @IsString({ message: '格式错误' })
  @IsOptional()
  readonly selfDescription: string

  @ApiModelProperty()
  @IsString({ message: '格式错误' })
  @MinLength(1, { message: '用户名不能为空' })
  @IsOptional()
  readonly username: string
}
