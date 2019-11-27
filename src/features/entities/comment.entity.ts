import { arrayProp, post, prop, Ref } from '@typegoose/typegoose'

import { ArticleEntity } from './article.entity'
import { CommonEntity } from './common.entity'
import { UserEntity } from './user.entity'

export class CommentEntity extends CommonEntity {
  @prop({ ref: ArticleEntity, index: true })
  article: Ref<ArticleEntity>

  @prop({ ref: UserEntity, index: true })
  followee: Ref<UserEntity>

  @prop({ ref: UserEntity, index: true })
  user: Ref<UserEntity>
}
