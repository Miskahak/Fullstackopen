const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require("../models/blog")

beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[3])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[4])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[5])
    await blogObject.save()
  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test("all blogs are returned", async () =>{
    const response = await api.get("/api/blogs")

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test("blogs identifier is called id", async ()=>{
    const response = await api.get("/api/blogs")
    const blogs = response.body
    console.log(response.body[0].id)
    expect(blogs[0].id).toBeDefined()
    expect(blogs[1].id).toBeDefined()
    expect(blogs[2].id).toBeDefined()
})

test("you can send blog to blogs list", async ()=>{
    const newBlog = {
        title: "testi Title",
        author: "Testi author", 
        url: "testi.com",
        likes: 212,
    }
    
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test("if likes === undefined => likes === 0 and send to blogs", async ()=>{
    const newBlog = {
        title: "testi Title",
        author: "Testi author", 
        url: "testi.com"
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)


    const blog = await Blog.find({
        title: "testi Title",
        author: "Testi author", 
        url: "testi.com"
    })

    console.log(blog)
    expect(blog[0].likes).toBe(0)
})

test("if title || url === undefined, expect  400 bad request", async ()=>{
    const newBlog = {
        author: "Testi author"
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})



afterAll(() => {
  mongoose.connection.close()
})

