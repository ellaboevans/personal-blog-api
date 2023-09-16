const { Schema, model } = require('mongoose')
const { sluggerPlugin } = require('mongoose-slugger-plugin')

const PostSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    summary: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: false
    },
    image: {
      type: String,
      default: ''
    },
    tag: String,
    slug: String
  },
  { timestamps: true }
)

PostSchema.index({ post: 1, slug: 1 }, { name: 'post_slug', unique: true })
PostSchema.plugin(sluggerPlugin, {
  slugPath: 'slug',
  generateFrom: ['title'],
  maxLength: 30,
  index: 'post_slug'
})

module.exports = model('Post', PostSchema)
