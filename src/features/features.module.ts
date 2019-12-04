import { TypegooseModule } from 'nestjs-typegoose'

import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import config from '../config'
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
} = config

const ENTITIES = [
  UserEntity,
  ArticleEntity,
  LikeEntity,
  FollowEntity,
  CommentEntity,
]

// mongodb://root:123456@localhost:27017/blog'

@Module({
  imports: [
    TypegooseModule.forRoot(
      'mongodb://root:123456@172.21.0.2:27017,172.21.0.3:27018,172.21.0.4:27019/blog',
      // `mongodb://${username}:${password}@${host}:${port}/${db},${host}:${port}/${db},${host}:${port}/${db}`,
      // { useNewUrlParser: true },
      { useMongoClient: true },
    ),
    TypegooseModule.forFeature([...ENTITIES]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(config.jwt),
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
