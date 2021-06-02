import { resolve } from 'path'

export default {
  port: 3003,

  mongo: {
    type: 'mongodb',
    host: '118.190.37.169',
    port: 27017,
    username: 'mongoadmin',
    password: 'secret',
    db: 'blog',
  },
}
