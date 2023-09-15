const express = require('express')
const router = express.Router()
const { blogControllers } = require('../controllers/postController')
const multerConfig = require('../middlewares/multer_middleware')

let upload = multerConfig()

router.get('/', blogControllers.getAllPosts)
router.post('/', upload.single('image'), blogControllers.createPost)
router.post('/uploads', upload.single('image'), blogControllers.upload)
router.get('/:slug', blogControllers.getSinglePost)
router.patch('/:postId', blogControllers.updatePost)
router.delete('/:postId', blogControllers.deletePost)

module.exports = router
