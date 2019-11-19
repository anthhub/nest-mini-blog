// import * as bcrypt from 'bcryptjs'
// import { Exclude, Expose } from 'class-transformer'
// import { IsEmail } from 'class-validator'
// import { BeforeInsert, prop, Entity, ObjectID, OneToMany } from 'typeorm'

// import { ArticleEntity } from './article.entity'
// import { CommonEntity } from './common.entity'

// @Entity('user')
// export class UserEntity extends CommonEntity {
//   @prop({
//     comment: '邮箱',
//     nullable: true,
//   })
//   email: string

//   @Exclude()
//   @prop({ comment: '密码', select: false })
//   password: string

//   @prop({
//     default: `http://img5.imgtn.bdimg.com/it/u=1595848418,2195099331&fm=26&gp=0.jpg`,
//   })
//   avatarHd: string

//   @prop({
//     default: `http://img5.imgtn.bdimg.com/it/u=1595848418,2195099331&fm=26&gp=0.jpg`,
//   })
//   avatarLarge: string

//   @prop()
//   blogAddress: string

//   @prop()
//   company: string

//   @prop()
//   emailVerified: boolean

//   @prop()
//   jobTitle: string

//   @prop({
//     comment: '手机号',
//     unique: true,
//   })
//   mobilePhoneNumber: string

//   @prop()
//   mobilePhoneVerified: boolean

//   @prop()
//   selfDescription: string

//   @prop({ unique: true, nullable: true })
//   username: string

//   @OneToMany(type => ArticleEntity, article => article.user)
//   articles: ArticleEntity[]
// }

import { Exclude } from 'class-transformer'

import { prop, Typegoose } from '@typegoose/typegoose'

import { CommonEntity } from './common.entity'

export class UserEntity extends CommonEntity {
  @prop({
    comment: '邮箱',
    index: true,
    unique: true,
  })
  email: string

  @Exclude()
  @prop({ comment: '密码' })
  password: string

  @prop({
    default: `http://img5.imgtn.bdimg.com/it/u=1595848418,2195099331&fm=26&gp=0.jpg`,
  })
  avatarHd: string

  @prop({
    default: `http://img5.imgtn.bdimg.com/it/u=1595848418,2195099331&fm=26&gp=0.jpg`,
  })
  avatarLarge: string

  @prop()
  blogAddress: string

  @prop()
  company: string

  @prop()
  emailVerified: boolean

  @prop()
  jobTitle: string

  @prop({
    comment: '手机号',
    unique: true,
    index: true,
  })
  mobilePhoneNumber: string

  @prop()
  mobilePhoneVerified: boolean

  @prop()
  selfDescription: string

  @prop({ unique: true })
  username: string
}
