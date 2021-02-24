import { arrayProp, post, prop, Ref } from '@typegoose/typegoose'

import { ArticleEntity } from './article.entity'
import { CommonEntity } from './common.entity'
import { UserEntity } from './user.entity'

export class FollowEntity extends CommonEntity {
  @prop({ ref: UserEntity, index: true })
  following: Ref<UserEntity>

  @prop({ ref: UserEntity, index: true })
  follower: Ref<UserEntity>
}
