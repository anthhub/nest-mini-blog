import { Transform } from 'class-transformer'
import { Column, Entity, ManyToOne } from 'typeorm'

import { CommonEntity } from './common.entity'
import { UserEntity } from './user.entity'

@Entity('article')
export class ArticleEntity extends CommonEntity {
  @Column()
  author: string

  @Column()
  content: string

  @Column()
  html: string

  @Column()
  title: string

  @Column()
  screenshot: string

  @Column()
  type: string

  @ManyToOne(type => UserEntity, user => user.articles)
  user: UserEntity
}
