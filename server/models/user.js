const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  googleSub: String,
})

module.exports = mongoose.model('User', userSchema)
