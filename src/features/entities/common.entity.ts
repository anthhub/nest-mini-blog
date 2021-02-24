import { ObjectID } from 'mongodb'

import { post, pre, prop, Typegoose } from '@typegoose/typegoose'
import { async } from 'rxjs/internal/scheduler/async'

@pre<CommonEntity>('save', function(next) {
  if (!this.create_at) {
    this.create_at = Date.now()
  }
  this.update_at = Date.now()

  this.id = this._id
  next()
})
// @pre<CommonEntity>('findOneAndUpdate', async function(next) {
//   console.log(
//     '%c%s',
//     'color: #20bd08;font-size:15px',
//     '===TQY===: this.getUpdate()',
//     this.getUpdate(),
//     this.getOptions(),
//     this.getQuery(),

//     await this.findOneAndUpdate(this.getOptions(), {
//       ...this.getUpdate(),
//       update_at: Date.now(),
//     }),
//   )
//   next()
// })
export class CommonEntity extends Typegoose {
  @prop({ select: false })
  __v: number

  // @prop({ select: false })
  // _id: ObjectID

  @prop({ index: true })
  id: ObjectID

  @prop({})
  create_at: number

  @prop({})
  update_at: number
}
