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
  console.log('Get posts')
  let query = { isPublic: true }
  if (req.user) {
    query = { $or: [ { userId: req.user }, query ]}
  }
  Post.find(query)
    .then((posts) => res.status(200).json(posts))
    .catch((error) => {
      console.log(error)
      res.status(404).json({ message: error.message })
    })
}
