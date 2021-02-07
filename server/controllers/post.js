const Post = require('../models/post')

exports.postNewPost = (req, res) => {
  const { title, content, isPublic } = req.body

  const newPost = new Post({ title, content, isPublic, userId: req.user })
  newPost.save()
    .then((result) => {
      console.log('Created post', result)
      res.status(201).json(newPost)
    })
    .catch((error) => {
      console.log('Error creating post', error)
      res.status(409).json({ message: error.message })
    })
}

exports.getPosts = (req, res) => {
  let query = { isPublic: true }
  if (req.user) {
    query.userId = req.user._id
  }
  Post.find(query)
    .then((posts) => res.status(200).json(postMessages))
    .catch((error) => res.status(404).json({ message: error.message }))
}
