const { Schema, model } = require('mongoose')

const UserSchema = Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: false
    },
    lastName: {
      type: String,
      required: true,
      unique: false
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: false,
      unique: true
    },
    password: {
      type: String,
      required: true,
      length: 8
    }
  },
  { timestamps: true }
)

module.exports = model('User', UserSchema)
