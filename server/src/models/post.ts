import mongoose from 'mongoose'

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
  uid: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
})

export default mongoose.model('Post', postSchema)
