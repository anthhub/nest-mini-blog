import { ApiModelProperty } from '@nestjs/swagger'
import { IsBoolean, IsEmail, IsString } from 'class-validator'

export class UserDto {
  @ApiModelProperty()
  @IsString()
  email: string

  @ApiModelProperty()
  @IsString()
  avatarHd: string

  @ApiModelProperty()
  @IsString()
  avatarLarge: string

  @ApiModelProperty()
  @IsString()
  blogAddress: string

  @ApiModelProperty()
  @IsString()
  company: string

  @ApiModelProperty()
  @IsBoolean()
  emailVerified: boolean

  @ApiModelProperty()
  @IsString()
  jobTitle: string

  @ApiModelProperty()
  @IsString()
  mobilePhoneNumber: string

  @ApiModelProperty()
  @IsBoolean()
  mobilePhoneVerified: boolean

  @ApiModelProperty()
  @IsString()
  selfDescription: string

  @ApiModelProperty()
  @IsString()
  username: string
}
