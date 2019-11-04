import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { SignInDto } from 'src/features/dtos/signIn.dto'
import { Repository } from 'typeorm'

import { SignUpDto } from '../../dtos/signUp.dto'
import { UserEntity } from '../../entities/user.entity'
import { IToken } from '../../interfaces/auth.interface'
import { AuthService } from '../auth/auth.service'

@Injectable()
export class AccountService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async signIn(signInDto: SignInDto): Promise<IToken> {
    return this.authService.createToken(signInDto.mobilePhoneNumber)
  }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    await this.userRepository.save(signUpDto)
  }
}
