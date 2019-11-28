import { ObjectID } from 'mongodb'

import { arrayProp, post, prop, Ref } from '@typegoose/typegoose'

import { ArticleEntity } from './article.entity'
import { CommonEntity } from './common.entity'
import { UserEntity } from './user.entity'

export class CommentEntity extends CommonEntity {
  @prop({ index: true })
  article: string

  // 我是否点赞
  @prop({})
  isLiked: boolean

  // 点赞数
  @prop({})
  likesCount: number

  @prop({})
  content: string

  // 子评论数
  @prop({})
  subCount: number

  // 子评论
  @arrayProp({ itemsRef: CommentEntity })
  topComment: Ref<CommentEntity>[]

  @prop({ index: true })
  respComment: string

  @prop({ ref: UserEntity, index: true })
  respUser: Ref<UserEntity>

  @prop({ ref: UserEntity, index: true })
  user: Ref<UserEntity>
}
