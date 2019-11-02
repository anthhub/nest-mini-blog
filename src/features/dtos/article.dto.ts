import { ApiModelProperty } from '@nestjs/swagger'
import { IsInt, IsString } from 'class-validator'

export class CreateArticleDto {
  @ApiModelProperty()
  @IsString()
  readonly author: string

  @ApiModelProperty()
  @IsString()
  readonly content: string

  @ApiModelProperty()
  @IsString()
  readonly title: string

  @ApiModelProperty()
  @IsString()
  readonly screenshot: string

  @ApiModelProperty()
  @IsString()
  readonly type: string
}
