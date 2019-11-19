import { prop, Typegoose } from '@typegoose/typegoose'
import { IsString } from 'class-validator'

export class Cat extends Typegoose {
  @IsString()
  @prop({})
  name: string
}
