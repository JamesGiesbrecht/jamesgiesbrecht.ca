const mongoose = require('mongoose')

const { Schema } = mongoose

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isPublic: Boolean,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

module.exports = mongoose.model('Post', postSchema)
