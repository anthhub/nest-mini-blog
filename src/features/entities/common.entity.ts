import { Exclude } from 'class-transformer'
import {
  CreateDateColumn,
  ObjectIdColumn,
  ObjectID,
  UpdateDateColumn,
} from 'typeorm'

export class CommonEntity {
  @ObjectIdColumn()
  id: ObjectID

  @CreateDateColumn({
    comment: '创建时间',
  })
  create_at: number

  @UpdateDateColumn({
    comment: '更新时间',
  })
  update_at: number
}
