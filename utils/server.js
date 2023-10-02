const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

const api_v1_Route = require('../routes/post')
const authRoute = require('../routes/auth')

const createServer = () => {
  //App Initialization
  const app = express()

  //Middlewares
  app.use(cors({ credentials: true, origin: 'https://oxconcept.vercel.app/' }))
  app.use(morgan('short'))
  app.use(express.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())
  //serve static files
  app.use('/uploads', express.static('uploads'))

  //Routes
  app.use('/api/v1/posts', api_v1_Route)
  app.use('/api/v1/auth', authRoute)
  return app
}

module.exports = createServer
