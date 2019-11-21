import { arrayProp, prop } from '@typegoose/typegoose'
import { CommonEntity } from './common.entity'

export class ArticleEntity extends CommonEntity {
  @prop()
  author: string

  @prop()
  content: string

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
}
