process.loadEnvFile()
import mysql from 'mysql2/promise'
import { cl, err } from './logger.js'

export const { PORT = 3000, SECRET_KEY } = process.env

const dbPool = await mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'thebrother'
})

dbPool.on('erro', error => {
  err(error)
})

dbPool.once('open', () => {
  cl('conection whit database')
})

export { dbPool }
