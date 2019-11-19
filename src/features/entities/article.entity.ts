// import { Transform } from 'class-transformer'
// import { prop, Entity, ManyToOne } from 'typeorm'

// import { CommonEntity } from './common.entity'
// import { UserEntity } from './user.entity'

// @Entity('article')
// export class ArticleEntity extends CommonEntity {
//   @prop()
//   author: string

//   @prop()
//   content: string

//   @prop()
//   html: string

//   @prop()
//   title: string

//   @prop()
//   screenshot: string

//   @prop()
//   type: string

//   @ManyToOne(type => UserEntity, user => user.articles)
//   user: UserEntity
// }

import { prop, Typegoose } from '@typegoose/typegoose'
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
}
