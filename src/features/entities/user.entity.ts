import * as bcrypt from 'bcryptjs'
import { Exclude, Expose } from 'class-transformer'
import { IsEmail } from 'class-validator'
import { BeforeInsert, Column, Entity, ObjectID, OneToMany } from 'typeorm'

import { ArticleEntity } from './article.entity'
import { CommonEntity } from './common.entity'

@Entity('user')
export class UserEntity extends CommonEntity {
  @Column({
    comment: '邮箱',
    nullable: true,
  })
  email: string

  @Exclude()
  @Column({ comment: '密码', select: false })
  password: string

  @Column({
    default: `http://img5.imgtn.bdimg.com/it/u=1595848418,2195099331&fm=26&gp=0.jpg`,
  })
  avatarHd: string

  @Column({
    default: `http://img5.imgtn.bdimg.com/it/u=1595848418,2195099331&fm=26&gp=0.jpg`,
  })
  avatarLarge: string

  @Column()
  blogAddress: string

  @Column()
  company: string

  @Column()
  emailVerified: boolean

  @Column()
  jobTitle: string

  @Column({
    comment: '手机号',
    unique: true,
  })
  mobilePhoneNumber: string

  @Column()
  mobilePhoneVerified: boolean

  @Column()
  selfDescription: string

  @Column({ unique: true, nullable: true })
  username: string

  @OneToMany(type => ArticleEntity, article => article.user)
  articles: ArticleEntity[]

  @BeforeInsert()
  async beforeInsert() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password || '12345678', salt)
  }
}
