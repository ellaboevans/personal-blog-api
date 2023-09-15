const Category = require('../models/Categories')
const { STATUS } = require('../utils/utils.js')

const categoryCrontroller = {
  getAllCategory: async (req, res) => {
    try {
      const categories = await Category.find()
      if (categories.length < 1) {
        res.status(STATUS.NOT_FOUND).json(STATUS.NOT_FOUND.message)
        return
      }
      res.status(STATUS.SUCCESS.code).json(STATUS.SUCCESS.message)
    } catch (error) {
      console.error(error)
      res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
    }
  },
  createCategory: async (req, res) => {
    const newCat = await new Category(req.body)
    try {
      const savedCat = await newCat.save()
      res.status(STATUS.SUCCESS.code).json(savedCat)
    } catch (error) {
      console.log(error)
      res.status(STATUS.SERVER_ERROR.code).json(STATUS.SERVER_ERROR.message)
    }
  }
}

module.exports = { categoryCrontroller }
