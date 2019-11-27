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
import { FileController } from './apis/file/file.controller'
import { UserController } from './apis/user/user.controller'
import { UserService } from './apis/user/user.service'
import { ArticleEntity } from './entities/article.entity'
import { LikeEntity } from './entities/like.entity'
import { UserEntity } from './entities/user.entity'

const ENTITIES = [UserEntity, ArticleEntity, LikeEntity]

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://root:123456@localhost:27017/blog', {}),
    TypegooseModule.forFeature([...ENTITIES]),
    // TypeOrmModule.forRoot(config.orm as TypeOrmModuleOptions),
    // TypeOrmModule.forFeature([...ENTITIES]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(config.jwt),
  ],
  controllers: [
    ArticleController,
    AccountController,
    UserController,
    FileController,
  ],
  providers: [
    ArticleService,
    AuthService,
    JwtStrategy,
    AccountService,
    UserService,
  ],
  exports: [],
})
export class FeaturesModule {}
