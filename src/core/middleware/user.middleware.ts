import { Logger } from '../../shared/utils/logger'

import * as jwt from 'jsonwebtoken'

export function user(req, res, next) {
  const Authorization: string = req.get('Authorization') || ' '
  console.log(
    '%c%s',
    'color: #20bd08;font-size:15px',
    '===TQY===: user -> Authorization',
    { Authorization },
  )
  const jwtObj: any = jwt.decode(Authorization.split(' ')[1]) || {}
  console.log(
    '%c%s',
    'color: #20bd08;font-size:15px',
    '===TQY===: user -> obj',
    { jwtObj },
  )

  req.userId = jwtObj.id

  next()
}
