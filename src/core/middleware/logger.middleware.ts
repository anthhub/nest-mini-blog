import { Logger } from '../../shared/utils/logger'

export function logger(req, res, next) {
  console.log(
    '%c%s',
    'color: #20bd08;font-size:15px',
    '===TQY===: logger -> req',
    req.get('Authorization'),
  )

  const statusCode = res.statusCode
  const logFormat = `${req.method} ${req.originalUrl} ip: ${req.ip} statusCode: ${statusCode}`

  next()

  if (statusCode >= 500) {
    Logger.error(logFormat)
  } else if (statusCode >= 400) {
    Logger.warn(logFormat)
  } else {
    Logger.log(logFormat)
  }
}
