import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import * as Youch from 'youch'

import { isProd } from '../../config'
import { Logger } from '../../shared/utils/logger'

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  async catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    Logger.error('exception', JSON.stringify(exception))

    let { message } = exception

    let isDeepestMessage = false
    while (!isDeepestMessage) {
      isDeepestMessage = !message.message
      message = isDeepestMessage ? message : message.message
    }

    const errorResponse = {
      message: message || '请求失败',
      status: exception.message && exception.message.status,
    }
    // 技术错误
    if (exception instanceof HttpException) {
      const status = exception.getStatus()
      Logger.error(
        `Catch http exception at ${request.method} ${request.url} ${status}`,
      )

      response.status(status)
      response.header('Content-Type', 'application/json; charset=utf-8')
      response.send(errorResponse)
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR)
      response.header('Content-Type', 'application/json; charset=utf-8')
      response.send(errorResponse)
    }
  }
}
