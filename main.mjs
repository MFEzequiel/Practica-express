import express from 'express'
import path from 'node:path'
import fs from 'node:fs'
import crypto from 'node:crypto'
import z from 'zod'

const app = express()
const PORT = process.env.PORT ?? 3000
const filePath = path.join('public', 'db.json')
const cl = s => console.log(s)
// My dominio
// https://the-brother.vercel.app/

app.disable('x-powered-by')

app.use(express.json())
app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Origin', 'https://the-brother.vercel.app/')
  next()
})

app.get('/', (req, res) => {
  res.send('<p>Title</p>')
})

app.use('/public', express.static('public'))

app.get('/product', (req, res) => {
  const { category } = req.query

  fs.readFile(filePath, 'utf-8', (err, date) => {
    if (err) {
      res.status(500).json({ erro: 'Internal server error' })
    }
    const jsonData = JSON.parse(date)

    if (category) {
      const filteredProduct = jsonData.product.filter(product =>
        product.Category.some(c => c.toLowerCase() === category.toLowerCase())
      )
      return res.status(200).json(filteredProduct)
    }

    res.status(200).json(jsonData)
  })
})

app.get('/product/:id', (req, res) => {
  const { id } = req.params

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).json({ err: 'Internal server error' })
    }

    const jsonData = JSON.parse(data)
    const productId = jsonData.product.filter(n => n.Id === id)

    if (productId === -1) {
      return res.status(404).send('Not product')
    }

    res.status(200).json(productId)
  })
})

app.post('/product', (req, res) => {
  cl(`Reques: ${req.url}`)

  const productSchame = z.Object({
    Title: z.string({
      invalid_type_error: 'product title must be a string',
      required_error: 'product title is required'
    })
  })

  const { Title, Description, Poster, Stocked, Category, Price } = req.body

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).json({ err: 'Internal server error' })
    }

    const jsonData = JSON.parse(data)
    const product = jsonData.product

    const newProduct = {
      Id: crypto.randomUUID(),
      Title,
      Description,
      Poster,
      Stocked,
      Category,
      Price
    }

    product.push(newProduct)

    fs.writeFile(
      filePath,
      JSON.stringify({ product: product }, null, 2),
      err => {
        if (err) {
          res.status(500).json({ err: 'Internal server error' })
        }

        res.status(201).json(newProduct)
      }
    )
  })
})

app.use((req, res) => {
  res.status(404).send('<h1>Error 404</h1>')
})

app.listen(PORT, cl(`Server http://localhost:${PORT}`))
