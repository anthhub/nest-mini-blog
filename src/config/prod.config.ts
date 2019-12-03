import { resolve } from 'path'

export default {
  port: 3003,

  mongo: {
    type: 'mongodb',
    host: '172.17.0.1',
    port: 27017,
    username: 'root',
    password: '123456',
    db: 'blog',
  },
}
