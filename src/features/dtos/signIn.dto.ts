import { ApiModelProperty } from '@nestjs/swagger'
import { IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator'

export class SignInDto {
  @ApiModelProperty()
  @IsPhoneNumber('CN')
  readonly mobilePhoneNumber: string

  @ApiModelProperty()
  @MinLength(6)
  @MaxLength(10)
  @IsString()
  readonly password: string
}
