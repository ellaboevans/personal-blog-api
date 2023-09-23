const Post = require('../models/Post')
const { STATUS } = require('../utils/utils')
const jwt = require('jsonwebtoken')

const blogControllers = {
  getAllPosts: async (req, res) => {
    const tag = req.query.tag
    let posts
    try {
      posts = await Post.find()
      if (posts.length < 1) {
        res.status(STATUS.NOT_FOUND.code).json(STATUS.NOT_FOUND.message)
        return
      } else {
        try {
          if (tag) {
            posts = await Post.find({ tag })
              .sort({ _id: -1 })
              .populate('author', ['firstName', 'lastName'])
          } else {
            posts = await Post.find()
              .sort({ _id: -1 })
              .populate('author', ['firstName', 'lastName'])
          }
          await res.status(STATUS.SUCCESS.code).json(posts)
        } catch (error) {
          console.error(error)
          res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
        }
      }
    } catch (error) {
      console.error(error)
      res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
    }
  },
  createPost: async (req, res) => {
    const { path } = req.file
    const { title, content, summary, tag } = req.body
    if (!title || !content || !summary) {
      res.status(STATUS.BAD_REQUEST.code).json(STATUS.BAD_REQUEST.message)
      return
    }
    try {
      const { token } = req.cookies
      const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
      if (verified === null) {
        res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
      }
      const post = new Post({
        title,
        content,
        summary,
        author: verified.id,
        tag,
        image: path
      })
      const createdPost = await post.save()
      res.status(STATUS.CREATED.code).json(createdPost)
      return
    } catch (error) {
      console.error(error)
      res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
    }
  },
  getSinglePost: async (req, res) => {
    const { slug } = req.params
    try {
      const post = await Post.findOne({ slug }).populate('author', [
        'firstName',
        'lastName'
      ])
      if (post === null) {
        res.status(STATUS.NOT_FOUND.code).json(STATUS.NOT_FOUND.message)
        return
      }
      await res.status(STATUS.SUCCESS.code).json(post)
    } catch (error) {
      console.log(error)
      res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
    }
  },
  updatePost: async (req, res) => {
    const { postId } = req.params
    try {
      const post = await Post.findById(postId)
      if (post === null) {
        res.status(STATUS.NOT_FOUND.code).json(STATUS.NOT_FOUND.message)
        return
      }
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $set: req.body },
        { new: true }
      )
      res.status(STATUS.SUCCESS.code).json(updatedPost)
    } catch (error) {
      res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
    }
  },
  deletePost: async (req, res) => {
    const { postId } = req.params
    try {
      const post = await Post.findById(postId)
      if (post === null) {
        res.status(STATUS.NOT_FOUND.code).json(STATUS.NOT_FOUND.message)
        return
      }
      await Post.findByIdAndDelete(postId)
      res
        .status(STATUS.SUCCESS.code)
        .json('Post has been deleted successfully!')
    } catch (error) {
      res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
    }
  }
}
module.exports = { blogControllers }
