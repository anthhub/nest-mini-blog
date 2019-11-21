import { Exclude } from 'class-transformer'

import { arrayProp, prop, Ref, Typegoose } from '@typegoose/typegoose'

import { CommonEntity } from './common.entity'

export class UserEntity extends CommonEntity {
  @prop({
    comment: '邮箱',
    index: true,
    unique: true,
  })
  email: string

  @prop({ comment: '密码' })
  password: string

  @prop({
    default: `http://b-ssl.duitang.com/uploads/item/201812/04/20181204120508_emnne.thumb.700_0.jpg`,
  })
  avatarHd: string

  @prop({
    default: `http://b-ssl.duitang.com/uploads/item/201812/04/20181204120508_emnne.thumb.700_0.jpg`,
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

  // @arrayProp({ itemsRef: ArticleEntity })
  // Articles?: Ref<ArticleEntity>[]
}
