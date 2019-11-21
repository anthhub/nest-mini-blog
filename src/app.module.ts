import { Module } from '@nestjs/common'

import { FeaturesModule } from './features/features.module'
import { SharedModule } from './shared/shared.module'

import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    SharedModule,
    FeaturesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
