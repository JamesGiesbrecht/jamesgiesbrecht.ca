import mongoose from 'mongoose'

import { PostType } from '../../../@types/james-giesbrecht'

const { Schema } = mongoose

const postSchema = new Schema<PostType>({
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
