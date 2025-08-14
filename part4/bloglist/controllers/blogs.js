const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog.toJSON)
  } catch (error) {
    next(error)
  }
})


blogsRouter.delete('/:id', async (request, response, next) => {
  try{
    const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
    if (deletedBlog){
      return response.status(204).end()
    } else{
      return response.status(404).json({ error: 'blog not found' })
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes },
      { new: true, runValidators: true, context: 'query' }
    )

    if (updatedBlog) {
      response.json(updatedBlog.toJSON())
    } else {
      response.status(404).json({ error: 'blog not found' })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
