import * as bcrypt from 'bcryptjs'
import { Exclude, Expose } from 'class-transformer'
import { IsEmail } from 'class-validator'
import { BeforeInsert, Column, Entity, ObjectID } from 'typeorm'

import { CommonEntity } from './common.entity'

@Entity('user')
export class UserEntity extends CommonEntity {
  @Column({
    comment: '邮箱',
    unique: true,
  })
  @IsEmail()
  email: string

  @Exclude({ toPlainOnly: true })
  @Column({ comment: '密码' })
  password: string

  @Column()
  avatarHd: string

  @Column()
  avatarLarge: string

  @Column()
  blogAddress: string

  @Column()
  company: string

  @Column()
  emailVerified: boolean

  @Column()
  jobTitle: string

  @Column()
  mobilePhoneNumber: string

  @Column()
  mobilePhoneVerified: boolean

  @Column()
  selfDescription: string

  @Expose()
  get uid(): ObjectID {
    return this.id
  }

  @Expose()
  get objectId(): ObjectID {
    return this.id
  }

  @Column()
  username: string

  @BeforeInsert()
  async beforeInsert() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password || '12345678', salt)
  }
}
