import * as _ from 'lodash'
import { resolve } from 'path'

import productionConfig from './prod.config'

export const isProd = process.env.NODE_ENV === 'production'
console.log(
  '%c%s',
  'color: #20bd08;font-size:15px',
  '===TQY===: isProdAPI_ENV',
  isProd,
  process.env.API_ENV,
)

// mongodb://root:123456@localhost:27017/blog'

let config = {
  port: 3003,
  hostName: '0.0.0.0',

  mongoConfig: {
    type: 'mongodb',
    host: process.env.API_ENV === 'development' ? 'localhost' : '172.17.0.2',
    port: 27017,
    username: 'root',
    password: '123456',
    db: 'blog',
  },

  jwt: {
    secret: 'secretKey',
    signOptions: {
      expiresIn: 60 * 60 * 24 * 30,
    },
  },
}

if (isProd) {
  config = _.merge(config, productionConfig)
}

export { config }
export default config
