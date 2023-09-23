const express = require('express')
const { authController } = require('../controllers/authController')
const router = express.Router()

//Register
router.post('/register', authController.registerUser)

//Login
router.post('/login', authController.loginUser)

//Profile
router.get('/profile', authController.profile)

//Logout
router.post('/logout', authController.logoutUser)

module.exports = router
