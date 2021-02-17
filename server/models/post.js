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
  dateCreated: {
    type: Date,
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

module.exports = mongoose.model(process.env.POST || 'Post', postSchema)
