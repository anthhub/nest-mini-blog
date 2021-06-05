import { resolve } from 'path'

export default {
  port: 8000,

  mongo: {
    type: 'mongodb',
    host: process.env.DB_HOST ? process.env.DB_HOST : '118.190.37.169',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 27017,
    username: process.env.DB_USERNAME
      ? Number(process.env.DB_USERNAME)
      : 'mongoadmin',
    password: process.env.DB_PASSWORD
      ? Number(process.env.DB_PASSWORD)
      : 'secret',
    db: 'blog',
  },
}
