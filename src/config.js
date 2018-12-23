export const {
  APP_PORT = 4000,
  NODE_ENV = 'development',
  DB_USERNAME = 'chat_db',
  DB_PASSWORD = 'chat20db',
  DB_HOST = 'ds141674.mlab.com',
  DB_PORT = '41674',
  DB_NAME = 'chat'
} = process.env

export const IN_PROD = NODE_ENV !== 'development'
