import { ObjectId } from 'mongodb'
import { InjectModel } from 'nestjs-typegoose'
import { UserEntity } from 'src/features/entities/user.entity'
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

  async getFollowersByUserId(
    following: string,
    userId: string,
  ): Promise<IPage<FollowEntity>> {
    let edges = (await this.followRepository
      .find({ following }, null, {
        sort: { update_at: -1 }, // 按照 _id倒序排列
        // limit: 20, // 查询100条
      })
      .populate({ path: 'follower' })).filter(item => !!item.follower)

    if (userId) {
      edges = await Promise.all(
        edges.map(async item => {
          (item.follower as any).isFollowing = await this.isFollowing(
            (item.follower as any).id,
            userId,
          )
          return item
        }),
      )
    }

    return {
      edges,
      pageInfo: { hasNextPage: true, endCursor: 20 },
    }
  }

  async isFollowing(followingId: string, followerId: string): Promise<any> {
    const obj = await this.followRepository.findOne({
      follower: followerId,
      following: followingId,
    })

    return !!obj
  }

  async getFollowingByUserId(follower: string): Promise<IPage<FollowEntity>> {
    let edges = (await this.followRepository
      .find({ follower }, null, {
        sort: { update_at: -1 }, // 按照 _id倒序排列
        // limit: 20, // 查询100条
      })
      .populate({ path: 'following' })).filter(item => !!item.following)

    edges = edges.map(item => {
      (item.following as any).isFollowing = true
      return item
    })

    return {
      edges,
      pageInfo: { hasNextPage: true, endCursor: 20 },
    }
  }

  async putUserFollow(following: string, follower: ObjectId): Promise<any> {
    const obj: any = await this.followRepository.findOne({
      following,
      follower,
    })

    if (obj) {
      return
    }

    return await new this.followRepository({
      following,
      follower,
    }).save()
  }

  async deleteUserFollow(following: string, follower: ObjectId): Promise<any> {
    return await this.followRepository.findOneAndRemove({
      following,
      follower,
    })
  }

  async getFollowingCount(follower: string): Promise<any> {
    return await this.followRepository.count({
      follower,
      following: { $nin: [null] },
    })
  }

  async getFollowersCount(following: string): Promise<any> {
    return await this.followRepository.count({
      following,
      follower: { $nin: [null] },
    })
  }
}
