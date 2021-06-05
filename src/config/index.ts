import * as _ from 'lodash'

import productionConfig from './prod.config'

export const isProd = process.env.NODE_ENV === 'production'

// mongodb://root:123456@localhost:27017/blog'

const config = {
  port: 8000,
  hostName: '0.0.0.0',

  mongoConfig: {
    type: 'mongodb',
    host: '0.0.0.0',
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

type Config = typeof config

export function getConfig(): Config {
  if (process.env.NODE_ENV === 'production') {
    return {
      ...config,
      ...productionConfig,
    }
  }

  return config
}



