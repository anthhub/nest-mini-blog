// import { Exclude } from 'class-transformer'
// import {
//   CreateDateColumn,
//   ObjectIdColumn,
//   ObjectID,
//   UpdateDateColumn,
// } from 'typeorm'

// export class CommonEntity {
//   @ObjectIdColumn()
//   id: ObjectID

//   @Exclude()
//   @CreateDateColumn({
//     comment: '创建时间',
//   })
//   create_at: number

//   @Exclude()
//   @UpdateDateColumn({
//     comment: '更新时间',
//   })
//   update_at: number
// }

import { Exclude } from 'class-transformer'
import { ObjectID } from 'mongodb'

import { pre, prop, Typegoose } from '@typegoose/typegoose'

@pre<CommonEntity>('save', function(next) {
  if (!this.create_at) {
    this.create_at = Date.now()
  }
  this.update_at = Date.now()

  this.id = this._id
  next()
})
export class CommonEntity extends Typegoose {
  // @Exclude()
  // @prop({ select: false })
  // _v: number

  // @Exclude()
  // @prop({ select: false })
  // _id: ObjectID

  @prop({ index: true })
  id: ObjectID

  @Exclude()
  @prop({})
  create_at: number

  @Exclude()
  @prop({})
  update_at: number
}
