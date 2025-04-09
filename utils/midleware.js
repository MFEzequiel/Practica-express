import jwt from 'jsonwebtoken'
import { cl, err } from "./logger.js"
import { jsonResponce } from '../controllers/jsonResponce.js'
import { SECRET_KEY } from './config.js'

const ACCESS_ORIGIN = ['http://localhost:5173','http://localhost:5173/']

export function corssMiddleware(req, res, next, { acceptOptions = ACCESS_ORIGIN } = {}) {
  const origin = req.header('origin')
  
  if (acceptOptions.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-headers', 'Origin, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Credentials', 'true')
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204)
  }

  next()
}

export function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.access_token

    if(!token) {
      return res.status(401).json(jsonResponce(401, false, { message: 'Access denied. No token provided.' }))
    }

    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = decoded
    next
  } catch (error) {
    err(error)
    return res.status(401).json(jsonResponce(401, false, { message: 'Invalid token' }))
  }
} 