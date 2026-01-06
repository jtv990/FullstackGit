const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/users')
const helper = require('./test_helper')

const api = supertest(app)

let testUser

beforeEach(async () => {
  await Blog.deleteMany({})
    
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const testUser = new User({
    username: 'testiuser',
    name: 'Test User',
    passwordHash
  })
  await testUser.save()
})
test('blogs return as json', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('is named id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    blogs.forEach(blog => {
        assert.ok(blog.id)
        assert.strictEqual(blog._id, undefined)
    })
})

test('if there are no likes', async () => {
    const token = await helper.getTokenForTest()
    const newBlog = {
        title: 'no likes',
        author: 'Author',
        url: 'https://something.com'
    }

    const response = await api
    .post('/api/blogs')
    .set('Authorization', `This ${token}`)
    .send(newBlog)
    .expect(201)

    assert.strictEqual(response.body.likes, 0)  
    }
)

test('blog can be added', async() => {
    const token = await helper.getTokenForTest(testUser)
    const newBlog = {
        title: 'Test blog',
        author: 'Author',
        url: 'http://something.com/test',
        likes: 10
    }

    await api
    .post('/api/blogs')
    .set('Authorization', `This ${token}`)
    .send(newBlog)
    .expect(201)

    const blogsAtEnd = await helper.blogsDB()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length +1)

    const titles = blogsAtEnd.map(blog => blog.title)
    assert.ok(titles.includes('Test blog'))
})

test('status 204 for deleting a blog', async () => {
    const blogsAtStart = await helper.blogsDB()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsDB()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length -1)
    const ids = blogsAtEnd.map(b => b.id)
    assert.ok(!ids.includes(blogToDelete.id))
})

test('status 200 for updating likes', async () => {
  const blogsAtStart = await helper.blogsDB()
  const blogToUpdate = blogsAtStart[0]

  const updatedData = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

  const result = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedData)
    .expect(200)

  assert.strictEqual(result.body.likes, blogToUpdate.likes + 1)
})

test('creating a blog fails without token', async () => {
  const newBlog = {
    title: 'Blog without token',
    author: 'Tester',
    url: 'http://example.com/no-token',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401) // should fail
    .expect('Content-Type', /application\/json/)
})

test('creating a blog succeeds with valid token', async () => {
  const token = await helper.getTokenForTest(testUser)

  const newBlog = {
    title: 'Blog with token',
    author: 'Tester',
    url: 'http://example.com/with-token',
    likes: 5
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `This ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.title, newBlog.title)
  assert.ok(response.body.user)
})


after(async() => {
    await mongoose.connection.close()
})