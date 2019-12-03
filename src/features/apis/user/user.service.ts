import { ObjectId } from 'mongodb'
import { InjectModel } from 'nestjs-typegoose'
import { SignUpDto } from 'src/features/dtos/signUp.dto'
import { UpdateUserDto } from 'src/features/dtos/updateUser.dto'
import { UserEntity } from 'src/features/entities/user.entity'
import { Repository } from 'typeorm'

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ReturnModelType } from '@typegoose/typegoose'

import { ArticleService } from '../article/article.service'
import { FollowService } from '../follow/follow.service'
import { LikeService } from '../like/like.service'

@Injectable()
export class UserService {
  constructor(
    private readonly articleService: ArticleService,
    private readonly likeService: LikeService,
    private readonly followService: FollowService,

    @InjectModel(UserEntity)
    private readonly userRepository: ReturnModelType<typeof UserEntity>,
  ) {}

  // 查询是否有相同手机号
  async getUserByMobilePhoneNumber(
    mobilePhoneNumber: string,
  ): Promise<UserEntity> {
    const doc: any = await this.userRepository
      .findOne({
        mobilePhoneNumber,
      })
      .select('+password')
    return doc && doc._doc
  }

  // 查询用户 id 是否存在
  async getUserById(id: string): Promise<UserEntity> {
    const doc: any = await this.userRepository.findById(id)
    return doc && doc._doc
  }

  // 查询是否有相同用户名
  async getUserByUsername(username: string): Promise<UserEntity> {
    const doc: any = await this.userRepository.findOne({
      username,
    })
    return doc && doc._doc
  }

  // 用户统计信息
  async getUserStatById(id: string): Promise<any> {
    return {
      followersCount: await this.followService.getFollowersCount(id),
      followingCount: await this.followService.getFollowingCount(id),
      viewCount: await this.articleService.getViewCount(id),
      likesCount: await this.likeService.getLikesCount(id),
      likedCount: await this.likeService.getLikedCount(id),
    }
  }

  // 用户信息
  async getUserInfoById(id: string): Promise<UserEntity> {
    const obj = await this.getUserById(id)
    const stat = await this.getUserStatById(id)
    return { ...stat, ...obj }
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
