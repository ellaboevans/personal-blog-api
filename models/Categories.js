const { Schema, model } = require('mongoose')

const CategorySchema = Schema({
  name: {
    type: String
  }
})

module.exports = model('Category', CategorySchema)
