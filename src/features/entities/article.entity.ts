import { arrayProp, post, prop, Ref } from '@typegoose/typegoose'

import { CommonEntity } from './common.entity'
import { UserEntity } from './user.entity'

export class ArticleEntity extends CommonEntity {
  @prop()
  author: string

  @prop()
  content: string

  @prop({ default: 0 })
  viewCount: number

  @prop()
  html: string

  @prop()
  title: string

  @prop()
  screenshot: string

  @prop()
  type: string

  // @arrayProp({ items: String })
  // tag: string[]

  @prop({ ref: UserEntity })
  user: Ref<UserEntity>
}
