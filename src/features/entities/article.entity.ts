import { Transform } from 'class-transformer'
import { Column, Entity } from 'typeorm'

import { CommonEntity } from './common.entity'

@Entity('article')
export class ArticleEntity extends CommonEntity {
  @Column()
  author: string

  @Column()
  content: string

  @Column()
  title: string

  @Column()
  screenshot: string

  @Column()
  type: string
}
