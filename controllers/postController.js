const Post = require('../models/Post')
const { STATUS } = require('../utils/utils')

const blogControllers = {
  getAllPosts: async (req, res) => {
    const username = req.query.user
    const category = req.query.cat
    try {
      let posts
      if (username) {
        posts = await Post.find({ username }).sort({ _id: -1 })
      } else if (category) {
        posts = await Post.find({
          categories: {
            $in: [category]
          }
        }).sort({ _id: -1 })
      } else {
        posts = await Post.find().sort({ _id: -1 })
      }
      await res.status(STATUS.SUCCESS.code).json(posts)
    } catch (error) {
      console.error(error)
      res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
    }
  },
  createPost: async (req, res) => {
    const { title, content, author, tag, username, image } = req.body
    try {
      if (!title || !content || !username) {
        res.status(STATUS.BAD_REQUEST.code).json(STATUS.BAD_REQUEST.message)
        return
      }
      const post = new Post({
        title,
        content,
        author,
        tag,
        username,
        image
      })
      const createdPost = await post.save()
      res.status(STATUS.CREATED.code).json(createdPost)
      return
    } catch (error) {
      console.error(error)
      res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
    }
  },
  upload: async (req, res) => {
    res.status(STATUS.CREATED.code).json(STATUS.CREATED.message)
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
    try {
      const post = await Post.findById(postId)
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
              $set: req.body
            },
            { new: true }
          )
          res.status(STATUS.SUCCESS.code).json(updatedPost)
        } catch (error) {
          console.log(error)
          res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
        }
      } else {
        res.status(401).json('You can only update post!')
      }
    } catch (error) {
      res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
    }
  },
  deletePost: async (req, res) => {
    const { postId } = req.params
    try {
      const post = await Post.findById(postId)
      if (post.username === req.body.username) {
        try {
          await Post.findByIdAndDelete(postId)
          res
            .status(STATUS.SUCCESS.code)
            .json('Post has been deleted successfully!')
        } catch (error) {
          console.log(error)
          res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
        }
      } else {
        res.status(401).json('You can only update post!')
      }
    } catch (error) {
      res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
    }
  }
}
module.exports = { blogControllers }
