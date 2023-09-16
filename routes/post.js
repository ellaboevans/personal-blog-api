const express = require('express')
const router = express.Router()
const { blogControllers } = require('../controllers/postController')
const multerConfig = require('../middlewares/multer_middleware')

//File upload Config
let upload = multerConfig()

//Get all Posts
router.get('/', blogControllers.getAllPosts)

//Create New Posts
router.post('/', upload.single('image'), blogControllers.createPost)

//Get Single Post with ['slug']
router.get('/:slug', blogControllers.getSinglePost)

//Update Post
router.patch('/:postId', blogControllers.updatePost)

//Delete Post
router.delete('/:postId', blogControllers.deletePost)

module.exports = router
