import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'
import { Repository } from 'typeorm'

import { UserEntity } from '../../entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserByMobilePhoneNumber(
    mobilePhoneNumber: string,
  ): Promise<UserEntity> {
    return await this.userRepository.findOne({
      mobilePhoneNumber,
    })
  }
}
