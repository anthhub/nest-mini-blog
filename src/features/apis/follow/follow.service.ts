import { ObjectId } from 'mongodb'
import { InjectModel } from 'nestjs-typegoose'
import { IPage } from 'src/features/interfaces/common.interface'

import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'

import { FollowEntity } from '../../entities/follow.entity'

@Injectable()
export class FollowService {
  constructor(
    @InjectModel(FollowEntity)
    private readonly followRepository: ReturnModelType<typeof FollowEntity>,
  ) {}

  async getFollowersByUserId(id: string): Promise<IPage<FollowEntity>> {
    const edges = await this.followRepository
      .find({ followee: id }, null, {
        sort: { update_at: -1 }, // 按照 _id倒序排列
        // limit: 20, // 查询100条
      })
      .populate({ path: 'user' })

    return {
      edges,
      pageInfo: { hasNextPage: true, endCursor: '20' },
    }
  }

  async getFolloweesByUserId(id: string): Promise<IPage<FollowEntity>> {
    const edges = await this.followRepository
      .find({ user: id }, null, {
        sort: { update_at: -1 }, // 按照 _id倒序排列
        // limit: 20, // 查询100条
      })
      .populate({ path: 'followee' })

    return {
      edges,
      pageInfo: { hasNextPage: true, endCursor: '20' },
    }
  }

  async putUserFollow(followeeId: string, userId: ObjectId): Promise<any> {
    const obj: any = await this.followRepository.findOne({
      followee: followeeId,
      user: userId,
    })

    if (obj) {
      return
    }

    return await new this.followRepository({
      followee: followeeId,
      user: userId,
    }).save()
  }

  async deleteUserFollow(followeeId: string, userId: ObjectId): Promise<any> {
    return await this.followRepository.findOneAndRemove({
      followee: followeeId,
      user: userId,
    })
  }

  async getFolloweesCount(id: string): Promise<any> {
    return await this.followRepository.count({ user: id })
  }

  async getFollowersCount(id: string): Promise<any> {
    return await this.followRepository.count({ followee: id })
  }
}
