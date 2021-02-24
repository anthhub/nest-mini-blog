import { Exclude } from 'class-transformer'

import { arrayProp, prop, Ref, Typegoose } from '@typegoose/typegoose'

import { CommonEntity } from './common.entity'

export class UserEntity extends CommonEntity {
  @prop({
    comment: '邮箱',
  })
  email: string

  @prop({ comment: '密码', select: false })
  password: string

  @prop({})
  avatarHd: string

  @prop({})
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

  @prop({ default: false })
  isFollowing: boolean

  // @arrayProp({ itemsRef: ArticleEntity })
  // Articles?: Ref<ArticleEntity>[]
}
