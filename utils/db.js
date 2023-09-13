const { connect } = require('mongoose')

const connectionDB = () =>
  connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_SECRET_KEY}@node-course.ina7eck.mongodb.net/${process.env.DB_NAME}`,
    { useNewUrlParser: true }
  )
    .then(() => console.log('Connected to Database'))
    .catch((error) =>
      console.error('Error connecting to Database:', error.message)
    )

module.exports = connectionDB
