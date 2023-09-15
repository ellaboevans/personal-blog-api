const express = require('express')
const router = express.Router()
const { userController } = require('../controllers/userController')

//Update
router.put('/:id', userController.updateUser)

//Delete
router.delete('/:id', userController.deleteUser)

//Get Single User
router.get('/:id', userController.getSingleUser)

module.exports = router
