const { Schema, model } = require('mongoose')

const UserSchema = Schema(
  {
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
      required: true
    }
  },
  { timestamps: true }
)

module.exports = model('User', UserSchema)
