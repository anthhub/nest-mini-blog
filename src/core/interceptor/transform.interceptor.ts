import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

interface IResponse<T> {
  data?: T
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    return next.handle().pipe(
      map(rawData => {
        if (rawData && rawData.status && rawData.status !== 0) {
          const { status, message } = rawData

          return {
            status,
            message,
          }
        }

        return {
          data: rawData,
          status: 0,
          message: '请求成功',
        }
      }),
    )
  }
}
