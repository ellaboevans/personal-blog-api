const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { STATUS } = require('../utils/utils.js')

const authController = {
  registerUser: async (req, res) => {
    const { firstName, lastName, username, email, password, confirmPassword } =
      req.body
    try {
      if (!username || !email || !password) {
        res.status(STATUS.BAD_REQUEST.code).json(STATUS.BAD_REQUEST.message)
        return
      } else if (password.length < 8) {
        res
          .status(STATUS.BAD_REQUEST.code)
          .json('Password must be at least 8 characters')
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
      const hashedConfirmPass = await bcrypt.hash(confirmPassword, salt)

      const newUser = await new User({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        confirmPassword: hashedConfirmPass
      })

      if (password !== confirmPassword) {
        res.status(STATUS.BAD_REQUEST.code).json('Passwords do not match!')
        return
      }
      await newUser.save()
      res
        .status(STATUS.CREATED.code)
        .json(`${newUser.firstName}'s account created successfully`)
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
      const isValidated = await bcrypt.compare(userPassword, isUser.password)
      if (isValidated) {
        //User is logged in
        const token = jwt.sign(
          { username, id: isUser._id, firstName: isUser.firstName },
          process.env.JWT_SECRET_KEY
        )
        if (token === null) {
          res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
        }
        res
          .status(STATUS.SUCCESS.code)
          .cookie('token', token)
          .json(STATUS.SUCCESS.message)
      } else {
        res
          .status(STATUS.BAD_REQUEST.code)
          .json('Wrong Credentials, please try again!')
        return
      }
    } catch (error) {
      console.error(error)
      res.status(STATUS.SERVER_ERROR).json(STATUS.SERVER_ERROR.message)
    }
  },
  profile: (req, res) => {
    const { token } = req.cookies
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if (verified === null) {
      res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
      return
    }
    res.status(STATUS.SUCCESS.code).json(verified)
    const Token = req.headers.authorization // Get the token from the request header
    if (!Token) {
      // Handle the case where no token is provided
      return res.status(401).json({ error: 'Token not provided' })
    }
  },
  logoutUser: (req, res) => {
    res
      .status(STATUS.SUCCESS.code)
      .cookie('token', '')
      .json(STATUS.SUCCESS.message)
  }
}

module.exports = { authController }
