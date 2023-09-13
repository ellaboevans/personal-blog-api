const express = require('express')
const router = express.Router()

const { blogControllers } = require('../controllers/postController')

router.get('/', blogControllers.getAllPosts)
router.post('/', blogControllers.createPost)
router.get('/:slug', blogControllers.getSinglePost)
router.patch('/:postId', blogControllers.updatePost)
router.delete('/:postId', blogControllers.deletePost)

module.exports = router
