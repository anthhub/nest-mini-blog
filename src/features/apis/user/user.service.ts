import { ObjectId } from 'mongodb'
import { UpdateUserDto } from 'src/features/dtos/updateUser.dto'
import { UserEntity } from 'src/features/entities/user.entity'
import { Repository } from 'typeorm'

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { SignUpDto } from 'src/features/dtos/signUp.dto'

@Injectable()
export class UserService {
  constructor(
    // @InjectRepository(UserEntity)
    // private readonly userRepository: Repository<UserEntity>,

    @InjectModel(UserEntity)
    private readonly userRepository: ReturnModelType<typeof UserEntity>,
  ) {}

  async getUserByMobilePhoneNumber(
    mobilePhoneNumber: string,
  ): Promise<UserEntity> {
    const doc: any = await this.userRepository.findOne({
      mobilePhoneNumber,
    })
    return doc && doc._doc
  }

  async getUserByUsername(username: string): Promise<UserEntity> {
    const doc: any = await this.userRepository.findOne({
      username,
    })
    return doc && doc._doc
  }

  async createUser(updateUserDto: SignUpDto): Promise<any> {
    return await new this.userRepository(updateUserDto).save()
  }

  async updateUser(
    curUser: UserEntity,
    updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return await this.userRepository.update(curUser, updateUserDto)
  }
}
