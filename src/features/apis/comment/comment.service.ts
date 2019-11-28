import { InjectModel } from 'nestjs-typegoose'
import { CommentEntity } from 'src/features/entities/comment.entity'

import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { CreateCommentDto } from 'src/features/dtos/comment.dto'

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(CommentEntity)
    private readonly commentRepository: ReturnModelType<typeof CommentEntity>,
  ) {}

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
      // 子评论
      const comment = await new this.commentRepository({
        article: articleId,
        user: userId,
        content,
        respUser,
        respComment,
      }).save()

      await this.commentRepository.findByIdAndUpdate(
        { id: firstComment },
        { $push: { topComment: comment } },
      )
    }
  }
}
