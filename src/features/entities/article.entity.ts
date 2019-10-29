import { Transform } from 'class-transformer'
import { Column, Entity } from 'typeorm'

import { CommonEntity } from './common.entity'

@Entity('article')
export class ArticleEntity extends CommonEntity {
  @Column()
  author: string

  @Column()
  content: string

  @Column({ length: 50 })
  title: string

  @Column()
  type: string
}
