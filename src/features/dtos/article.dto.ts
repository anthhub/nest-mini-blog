import { ApiModelProperty } from '@nestjs/swagger'
import { IsInt, IsString } from 'class-validator'

import { UserDto } from './user.dto'

export class CreateArticleDto {
  @ApiModelProperty()
  @IsString()
  readonly author: string

  @ApiModelProperty()
  @IsString()
  readonly content: string

  @ApiModelProperty()
  @IsString()
  readonly html: string

  @ApiModelProperty()
  @IsString()
  readonly title: string

  @ApiModelProperty()
  @IsString()
  readonly screenshot: string

  @ApiModelProperty()
  @IsString()
  readonly user: UserDto

  @ApiModelProperty()
  @IsString()
  readonly type: string
}
