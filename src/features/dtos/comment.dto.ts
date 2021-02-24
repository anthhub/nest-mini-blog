import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator'

import { ApiModelProperty } from '@nestjs/swagger'

// firstComment: 5ddbb9e85188256aac7b4f63
// respComment: 5ddc7b26e51d451d323618c8
// respUser: 59fac8c7f265da431d3c047c
// targetId: 5ddb285f6fb9a07a7c5d3c19
// targetType: entry
// content: 顶一下

export class CreateCommentDto {
  // 最外层评论 id
  @ApiModelProperty()
  @IsString()
  @Length(24, 24)
  @IsOptional()
  readonly firstComment: string

  // 回复评论的 id
  @ApiModelProperty()
  @IsString()
  @Length(24, 24)
  @IsOptional()
  readonly respComment: string

  // 回复的用户id
  @ApiModelProperty()
  @IsString()
  @Length(24, 24)
  readonly respUser: string

  // 文章 id
  @ApiModelProperty()
  @IsString()
  @Length(24, 24)
  readonly articleId: string

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty({ message: '手机号不能为空' })
  readonly content: string
}
