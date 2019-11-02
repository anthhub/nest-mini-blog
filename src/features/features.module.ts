import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import config from '../config'

import { AccountController } from './apis/account/account.controller'
import { AccountService } from './apis/account/account.service'
import { ArticleController } from './apis/article/article.controller'
import { ArticleService } from './apis/article/article.service'
import { AuthService } from './apis/auth/auth.service'
import { JwtStrategy } from './apis/auth/jwt.strategy'
import { ArticleEntity } from './entities/article.entity'
import { UserEntity } from './entities/user.entity'

const ENTITIES = [UserEntity, ArticleEntity]

@Module({
  imports: [
    TypeOrmModule.forRoot(config.orm as TypeOrmModuleOptions),
    TypeOrmModule.forFeature([...ENTITIES]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(config.jwt),
  ],
  controllers: [ArticleController, AccountController],
  providers: [ArticleService, AuthService, JwtStrategy, AccountService],
  exports: [],
})
export class FeaturesModule {}
