import express from 'express'
import { routerProduct } from './routers/product.js'
import { ModelProducts } from './models/product.js'
import { corssMiddleware } from './utils/midleware.js'
import { ModelsUsers } from './models/auth.js'
import { routerUsers } from './routers/auth.js'
import cookieParser from 'cookie-parser'
import { SECRET_KEY } from './utils/config.js'
import jwt from 'jsonwebtoken'
import { jsonResponce } from './controllers/jsonResponce.js'

const app = express()

app.disable('x-powered-by')

app.use(cookieParser( ))
app.use(express.json())
app.use((req, res, next) => corssMiddleware(req, res, next))
app.use((req, res, next) => {
  const token = req.cookies.access_token
  let data = null

  res.session = { user: null }

  try {
    data = jwt.verify(token, SECRET_KEY)
    req.session.user = data
  } catch {}
  next()
})

app.get('/', (req, res) => {
  try {
    const { user } = req.session
    res.status(200).send('hello')
  } catch (error) {
    res.status(401).json(jsonResponce(401, false, { message: 'User is required' }))    
  }
})

app.use('/products', routerProduct({ modelProducts: ModelProducts }))
app.use('/auth', routerUsers({ modelsUsers: ModelsUsers }))

app.use((req, res) => {
  res.status(404).send('Error 404')
})

export default app