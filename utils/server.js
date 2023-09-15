const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
require('dotenv').config()

const api_v1_Route = require('../routes/api_v1')
const authRoute = require('../routes/auth')
const userRoute = require('../routes/users')
const categoriesRoute = require('../routes/categories')

const createServer = () => {
  const app = express()

  //Middlewares
  app.use(morgan('short'))
  app.use(express.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  //Routes
  app.use('/api/v1/posts', api_v1_Route)
  app.use('/api/v1/auth', authRoute)
  app.use('/api/v1/users', userRoute)
  app.use('/api/v1/categories', categoriesRoute)
  return app
}

module.exports = createServer
