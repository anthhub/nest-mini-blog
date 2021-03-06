import { TypegooseModule } from 'nestjs-typegoose'

import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { getConfig } from '../config'
import { AccountController } from './apis/account/account.controller'
import { AccountService } from './apis/account/account.service'
import { ArticleController } from './apis/article/article.controller'
import { ArticleService } from './apis/article/article.service'
import { AuthService } from './apis/auth/auth.service'
import { JwtStrategy } from './apis/auth/jwt.strategy'
import { CommentController } from './apis/comment/comment.controller'
import { CommentService } from './apis/comment/comment.service'
import { FileController } from './apis/file/file.controller'
import { FollowController } from './apis/follow/follow.controller'
import { FollowService } from './apis/follow/follow.service'
import { LikeController } from './apis/like/like.controller'
import { LikeService } from './apis/like/like.service'
import { UserController } from './apis/user/user.controller'
import { UserService } from './apis/user/user.service'

import { ArticleEntity } from './entities/article.entity'
import { CommentEntity } from './entities/comment.entity'
import { FollowEntity } from './entities/follow.entity'
import { LikeEntity } from './entities/like.entity'
import { UserEntity } from './entities/user.entity'

const {
  mongoConfig: { username, password, host, port, db },
  jwt,
} = getConfig()

console.log('getConfig: ', getConfig())

const ENTITIES = [
  UserEntity,
  ArticleEntity,
  LikeEntity,
  FollowEntity,
  CommentEntity,
]

@Module({
  imports: [
    TypegooseModule.forRoot(
      `mongodb://${username}:${password}@${host}:${port}/${db}?authSource=admin`,
      { useNewUrlParser: true },
      // { useMongoClient: true },
    ),
    TypegooseModule.forFeature([...ENTITIES]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(jwt),
  ],
  controllers: [
    ArticleController,
    AccountController,
    UserController,
    FileController,
    LikeController,
    FollowController,
    CommentController,
  ],
  providers: [
    ArticleService,
    AuthService,
    JwtStrategy,
    AccountService,
    UserService,
    LikeService,
    FollowService,
    CommentService,
  ],
  exports: [],
})
export class FeaturesModule {}
