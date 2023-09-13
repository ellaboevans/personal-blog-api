const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const connectionDB = require('./utils/db')
require('dotenv').config()

const app = express()

//Middlewares
app.use(morgan('short'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Database Connection
connectionDB()

//API Versioning
const api_v1 = require('./routes/api_v1')
app.use('/api/v1/posts', api_v1)

app.get('/', (req, res) => {
  res.send('Hello, World! from the server')
})

let port = process.env.PORT || 3500
http.createServer(app).listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})
