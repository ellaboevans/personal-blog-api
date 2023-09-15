const User = require('../models/User')
const bcrypt = require('bcrypt')
const { STATUS } = require('../utils/utils.js')
const Post = require('../models/Post')

const userController = {
  getSingleUser: async (req, res) => {
    const { id } = req.params
    try {
      const isUser = await User.findById(id)
      const { password, ...info } = isUser._doc
      res.status(STATUS.SUCCESS.code).json(info)
    } catch (error) {
      console.log(error)
      res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
    }
  },
  updateUser: async (req, res) => {
    if (req.body.userId === req.params.id) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body
          },
          { new: true }
        )
        res.status(STATUS.SUCCESS.code).json(updatedUser)
      } catch (error) {
        console.error(error)
        res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
      }
    } else {
      res.status(STATUS.UNAUTHORIZED.code).json(STATUS.UNAUTHORIZED.message)
    }
  },
  deleteUser: async (req, res) => {
    if (req.body.userId === req.params.id) {
      try {
        const isUser = await User.findById(req.params.id)
        if (isUser === null) {
          res.status(STATUS.NOT_FOUND.code).json('User not found!')
          return
        }
        try {
          await Post.deleteMany({ username: isUser.username })
          await User.findByIdAndDelete(req.params.id)
          res
            .status(STATUS.SUCCESS.code)
            .json('User aacount deleted successfully!')
        } catch (error) {
          console.error(error)
          res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
        }
      } catch (error) {
        console.log(error)
        res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
      }
    } else {
      res.status(STATUS.UNAUTHORIZED.code).json(STATUS.UNAUTHORIZED.message)
    }
  }
}

module.exports = { userController }
