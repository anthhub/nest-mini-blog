import { InjectModel } from 'nestjs-typegoose'
import { CommentEntity } from 'src/features/entities/comment.entity'

import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { ObjectId, ObjectID } from 'mongodb'
import { CreateCommentDto } from 'src/features/dtos/comment.dto'

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(CommentEntity)
    private readonly commentRepository: ReturnModelType<typeof CommentEntity>,
  ) {}

  async putCommentLike(commentId: string): Promise<any> {
    return await this.commentRepository.findByIdAndUpdate(
      {
        id: commentId,
      },
      { $inc: { likesCount: 1 }, isLiked: true },
    )
  }

  async deleteCommentLike(commentId: string): Promise<any> {
    return await this.commentRepository.findByIdAndUpdate(
      {
        id: commentId,
      },
      { $inc: { likesCount: -1 }, isLiked: false },
    )
  }

  async countArticleComment(articleId: string): Promise<any> {
    return await this.commentRepository.count({ article: articleId })
  }

  async comments(articleId: string): Promise<any> {
    // this.commentRepository.createCollection().then( ()=>   )

    return await this.commentRepository
      .find({ article: articleId, respComment: null }, null, {
        sort: { update_at: -1 }, // 按照 _id倒序排列
        // limit: 20, // 查询100条
      })
      .populate({ path: 'user' })
      .populate({ path: 'respUser' })
      .populate({ path: 'topComment', populate: 'user respUser' })
  }

  async comment(
    createCommentDto: CreateCommentDto,
    userId: ObjectId,
  ): Promise<any> {
    const {
      firstComment,
      respComment,
      articleId,
      respUser,
      content,
    } = createCommentDto

    // 顶级评论
    if (!firstComment) {
      return await new this.commentRepository({
        article: articleId,
        user: userId,
        content,
        respUser,
      }).save()
    }

    // 顶级评论的评论
    if (firstComment && respComment) {
      const first = await this.commentRepository.findById(firstComment)

      if (!first) {
        return
      }

      // 子评论
      const comment = await new this.commentRepository({
        article: articleId,
        user: userId,
        content,
        respUser,
        respComment,
      }).save()

      return await this.commentRepository.findByIdAndUpdate(firstComment, {
        $push: { topComment: comment },
      })
    }
  }
}
