const Post = require('../models/post')

exports.postNewPost = (req, res) => {
  const { title, content, isPublic } = req.body
  const { uid, username } = req.user
  const newPost = new Post({
    title,
    content,
    isPublic,
    dateCreated: Date.now(),
    uid,
    username,
  })
  newPost
    .save()
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
  if (req.user && req.user.uid) {
    query = { $or: [{ uid: req.user.uid }, query] }
  }
  Post.find(query)
    .sort({ dateCreated: 'desc' })
    .limit(100)
    .then((posts) => res.status(200).json(posts))
    .catch((error) => {
      console.log(error)
      res.status(404).json({ message: error.message })
    })
}

exports.updatePost = (req, res) => {
  const { title, content, isPublic } = req.body
  const { postId } = req.params

  Post.findOne({ _id: postId, uid: req.user.uid })
    .then((post) => {
      /* eslint-disable no-param-reassign */
      post.title = title
      post.content = content
      post.isPublic = isPublic
      /* eslint-enable no-param-reassign */
      return post.save()
    })
    .then((post) => {
      res.status(200).json({ message: 'Post updated', post })
    })
    .catch((error) => {
      console.log(error)
      res.status(405).json({ message: error.message })
    })
}

exports.deletePost = (req, res) => {
  const { postId } = req.params
  Post.deleteOne({ _id: postId, uid: req.user.uid })
    .then((result) => {
      console.log(result)
      const { deletedCount } = result
      if (deletedCount === 0) {
        res.status(204).json({ message: 'Content not found', deletedCount })
      } else {
        console.log(`Destroyed product: ${postId}`)
        res.status(200).json({ message: 'Post deleted', deletedCount })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ message: error.message })
    })
}
