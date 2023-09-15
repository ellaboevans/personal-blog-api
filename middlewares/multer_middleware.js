const multer = require('multer')
const path = require('path')

const multerConfig = () => {
  const multerStorage = multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, 'public')
    },
    filename: (request, file, callback) => {
      const extenstion = file.mimetype.split('/')[1]
      callback(
        null,
        `images/post-${file.fieldname}-${Date.now()}.${extenstion}`
      )
    }
  })
  const ImageFilter = {
    filter: (request, file, callback) => {
      let extenstion = path.extname(file.originalname)
      if (
        extenstion !== '.jpg' &&
        extenstion !== '.jpeg' &&
        extenstion !== '.png'
      ) {
        callback(new Error('Unsupported File type!'), false)
        return
      }
      callback(null, true)
    }
  }
  const upload = multer({
    storage: multerStorage,
    fileFilter: ImageFilter.filter
  })

  return upload
}

module.exports = multerConfig
