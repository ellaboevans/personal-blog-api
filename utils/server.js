const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
require('dotenv').config()

const api_v1 = require('../routes/api_v1')

const createServer = () => {
  const app = express()

  //Middlewares
  app.use(morgan('short'))
  app.use(express.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  //API Versioning
  app.use('/api/v1/posts', api_v1)
  return app
}

module.exports = createServer
