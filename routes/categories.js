const express = require('express')
const router = express.Router()
const { categoryCrontroller } = require('../controllers/catController')

router.get('/', categoryCrontroller.getAllCategory)

router.post('/', categoryCrontroller.createCategory)

module.exports = router
