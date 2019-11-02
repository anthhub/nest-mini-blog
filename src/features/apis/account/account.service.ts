import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { AccountDto } from '../../dtos/account.dto'
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
  async signIn(authDto: AccountDto): Promise<IToken> {
    return this.authService.createToken(authDto.email)
  }

  async signUp(authDto: AccountDto): Promise<void> {
    await this.userRepository.save(authDto)
  }
}
