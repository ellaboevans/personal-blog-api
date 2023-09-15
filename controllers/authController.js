const User = require('../models/User')
const bcrypt = require('bcrypt')
const { STATUS } = require('../utils/utils.js')

const authController = {
  registerUser: async (req, res) => {
    const { username, email, password } = req.body
    try {
      if (!username || !email || !password) {
        res.status(STATUS.BAD_REQUEST.code).json(STATUS.BAD_REQUEST.message)
        return
      }
      const isUser = await User.findOne({ username })
      if (isUser) {
        res
          .status(STATUS.SERVER_ERROR.code)
          .json(`${isUser.username} already exists!`)
        return
      }
      //Hashing password with bcrypt
      const SALT_FACTOR = 10
      const salt = await bcrypt.genSalt(SALT_FACTOR)
      const hashedPassword = await bcrypt.hash(password, salt)

      const newUser = await new User({
        username,
        email,
        password: hashedPassword
      })
      await newUser.save()
      res
        .status(STATUS.CREATED.code)
        .json(`${newUser.username}'s account created successfully`)
    } catch (error) {
      console.error(error)
      res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
    }
  },
  loginUser: async (req, res) => {
    const { username } = req.body
    try {
      const isUser = await User.findOne({ username })
      if (!isUser) {
        res.status(STATUS.NOT_FOUND.code).json(`${isUser.username} not found!`)
        return
      }
      //compare the hashedPassword to login user
      let userPassword = req.body.password
      const validated = await bcrypt.compare(userPassword, isUser.password)
      if (!validated) {
        res
          .status(STATUS.BAD_REQUEST.code)
          .json('Wrong Credentials, please try again!')
        return
      }
      const { password, ...info } = isUser._doc
      res.status(STATUS.SUCCESS.code).json(info)
    } catch (error) {
      console.error(error)
      res.status(STATUS.SERVER_ERROR).json(STATUS.SERVER_ERROR.message)
    }
  }
}

module.exports = { authController }
