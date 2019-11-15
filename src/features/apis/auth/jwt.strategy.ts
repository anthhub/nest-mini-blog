import { ExtractJwt, Strategy } from 'passport-jwt'

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import config from '../../../config'
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
      secretOrKey: config.jwt.secret,
    })
  }

  async validate(payload: UserEntity) {
    console.log(
      '%c%s',
      'color: #20bd08;font-size:15px',
      '===TQY===: JwtStrategy -> validate -> validate',
      'jwt 校验',
    )
    const user = await this.userService.getUserByMobilePhoneNumber(
      payload.mobilePhoneNumber,
    )

    if (!user) {
      throw new UnauthorizedException('身份验证失败')
    }

    return user
  }
}
