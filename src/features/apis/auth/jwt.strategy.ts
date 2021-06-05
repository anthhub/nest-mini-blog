import { ExtractJwt, Strategy } from 'passport-jwt'

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { getConfig } from '../../../config'
import { UserEntity } from '../../entities/user.entity'
import { UserService } from '../user/user.service'
import { AuthService } from './auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: getConfig().jwt.secret,
    })
  }

  async validate(payload: UserEntity) {
    const user = await this.userService.getUserById(
      (payload.id as unknown) as string,
    )
    return user
  }
}
