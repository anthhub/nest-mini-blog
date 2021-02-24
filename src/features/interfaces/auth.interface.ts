import { UserEntity } from '../entities/user.entity'

import { Request } from 'express'

export interface IToken {
  access_token: string
  expires_in: number
}

export interface IUserRequest extends Request {
  user?: UserEntity
  userId?: string
}
