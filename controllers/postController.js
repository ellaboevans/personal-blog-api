const Post = require('../models/post')
const { STATUS } = require('../utils/utils')

const blogControllers = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find().sort({ _id: -1 })
      if (posts.length < 1) {
        res.status(STATUS.NOT_FOUND.code).json(STATUS.NOT_FOUND.message)
        return
      }
      await res.status(STATUS.SUCCESS.code).json(posts)
    } catch (error) {
      console.error(error)
      res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
    }
  },
  createPost: async (req, res) => {
    const { title, content, author, tag } = req.body
    try {
      if (!title || !content || !author) {
        res.status(STATUS.BAD_REQUEST.code).json(STATUS.BAD_REQUEST.message)
        return
      }
      const post = new Post({
        title,
        content,
        author,
        tag
      })
      await post.save()
      res.status(STATUS.CREATED.code).json(STATUS.CREATED.message)
      return
    } catch (error) {
      console.error(error)
      res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
    }
  },
  getSinglePost: async (req, res) => {
    const { slug } = req.params
    try {
      const post = await Post.findOne({ slug })
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
    const fields = ['title', 'content', 'author', 'tag']
    let updateField = {}
    try {
      for (const field of fields) {
        if (req.body[field]) {
          updateField[field] = req.body[field]
        }
      }
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { ...updateField, updatedAt: Date.now() },
        { new: true }
      )
      if (!updatedPost) {
        res.status(STATUS.NOT_FOUND.code).json(STATUS.NOT_FOUND.message)
        return
      }
      await res.status(STATUS.SUCCESS.code).json(STATUS.SUCCESS.message)
    } catch (error) {
      console.error(error)
      res.status(STATUS.NOT_MODIFIED.code).json(STATUS.NOT_MODIFIED.message)
    }
  },
  deletePost: async (req, res) => {
    const { postId } = req.params
    try {
      const post = await Post.findByIdAndDelete(postId)
      if (post === null) {
        res.status(STATUS.NOT_FOUND.code).json(STATUS.NOT_FOUND.message)
        return
      }
      await res.status(STATUS.SUCCESS.code).json(STATUS.SUCCESS.message)
    } catch (error) {
      console.error(error)
      res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
    }
  }
}

module.exports = { blogControllers }
