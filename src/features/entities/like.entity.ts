import { arrayProp, post, prop, Ref } from '@typegoose/typegoose'

import { ArticleEntity } from './article.entity'
import { CommonEntity } from './common.entity'
import { UserEntity } from './user.entity'

export class LikeEntity extends CommonEntity {
  // @prop({ enum: ELikeStatus })
  // status: ELikeStatus

  // @prop()
  // get statusText() {
  //   return this.status ? '点赞' : '未点赞'
  // }

  @prop({ ref: ArticleEntity, index: true })
  article: Ref<ArticleEntity>

  @prop({ ref: UserEntity, index: true })
  user: Ref<UserEntity>
}
