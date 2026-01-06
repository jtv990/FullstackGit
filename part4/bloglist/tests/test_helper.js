process.env.SECRET = process.env.SECRET || 'mytestsecret'
const Blog = require('../models/blog')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
]

const blogsDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const getTokenForTest = async () => {
  let users = await User.find({})
  
  if (users.length === 0) {
    const testUser = new User({
      username: 'testuser',
      name: 'Test User',
      passwordHash: 'sekret' // dummy hash for test
    })
    await testUser.save()
    users = [testUser]
  }

  const user = users[0]

  const userForToken = {
    username: user.username,
    id: user._id
  }

  return jwt.sign(userForToken, process.env.SECRET)
}

module.exports = {
  initialBlogs,
  blogsDB,
  getTokenForTest
}