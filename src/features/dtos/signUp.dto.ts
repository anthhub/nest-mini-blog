import { ApiModelProperty } from '@nestjs/swagger'
import { IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator'

export class SignUpDto {
  @ApiModelProperty()
  @IsPhoneNumber('CN')
  readonly mobilePhoneNumber: string

  @ApiModelProperty()
  @IsString()
  readonly username: string

  @ApiModelProperty()
  @MinLength(6)
  @MaxLength(12)
  @IsString()
  readonly password: string
}
