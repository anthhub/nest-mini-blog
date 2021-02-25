import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as rateLimit from 'express-rate-limit'
import * as helmet from 'helmet'
import { join } from 'path'

import { AppModule } from './app.module'
import config from './config'
import { ExceptionsFilter } from './core/filter/errors.filter'
import { TransformInterceptor } from './core/interceptor/transform.interceptor'
import { logger } from './core/middleware/logger.middleware'
import { user } from './core/middleware/user.middleware'
import { ValidationPipe } from './core/pipe/validation.pipe'
import { Logger } from './shared/utils/logger'

const API_HOST = 'blog-test'

const API_VERSION = '/api/v1'

const API_PREFIX = API_HOST + API_VERSION

async function initSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('Awesome-nest')
    .setDescription('The Awesome-nest API Documents')
    .setBasePath(API_PREFIX)
    .addBearerAuth()
    .setVersion('0.0.1')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup(API_HOST, app, document)
  // swagger 地址: http://${config.hostName}:${config.port}/docs
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  })

  app.useStaticAssets(join(__dirname, '..', 'static'))
  // app.setBaseViewsDir(join(__dirname, '..', 'views'))
  // app.setViewEngine('hbs')

  app.setGlobalPrefix(API_PREFIX)

  await initSwagger(app)

  app.use(helmet())
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000 * 1000, // limit each IP to 100 requests per windowMs
    }),
  )
  app.use(user)
  app.use(logger)
  app.useGlobalFilters(new ExceptionsFilter())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalPipes(new ValidationPipe())

  config.port = 7700

  await app.listen(config.port, config.hostName, () => {
    console.log(`http://${config.hostName}:${config.port}`)

    Logger.log(
      `Awesome-nest API server has been started on http://${config.hostName}:${config.port}`,
    )
  })
}

bootstrap()
