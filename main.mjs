import express from 'express';
import path from 'node:path'
import fs from 'node:fs'

const app = express()
const PORT = process.env.PORT ?? 3000
const filePath = path.join('public', 'db.json')
const cl = s => console.log(s);

app.disable('x-powered-by')
app.use(express.json())
// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

app.get('/', (req, res) => {
  res.send('hello')
})

app.use('/public',express.static('public'))

app.get('/product', (req, res) => {
    cl(`Reques: ${req.url}`)

    fs.readFile(filePath, 'utf-8', (err, date) => {
      if (err) {
        res.status(500).json({erro: 'Internal server error'})
      } 
      const jsonData = JSON.parse(date)
      res.send(jsonData)
    })
})

app.get('/product/:id', (req, res) => {
  const { id } = req.params

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).json({err: 'Internal server error'})
    }

    const jsonData = JSON.parse(data)
    const productId = jsonData.Search.filter(n => n.Id === id)

    if (productId === -1) {
      return res.status(404).send('Not product')
    }
    
    res.status(200).json(productId)
  })

})

app.use((req, res) => {
    res.send('<h1>Error 404</h1>')
})

app.listen(PORT,cl(`Server http://localhost:${PORT}`))