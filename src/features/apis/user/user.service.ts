import { ObjectId } from 'mongodb'
import { UpdateUserDto } from 'src/features/dtos/updateUser.dto'
import { UserEntity } from 'src/features/entities/user.entity'
import { Repository } from 'typeorm'

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

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

  async getUserByUsername(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      username,
    })
  }

  async updateUser(
    curUser: UserEntity,
    updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return await this.userRepository.update(curUser, updateUserDto)
  }
}
