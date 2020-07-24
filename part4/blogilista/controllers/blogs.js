const blogsRouter = require('express').Router()
const jwt = require("jsonwebtoken")
const Blog = require("../models/blog")
const User = require("../models/user")


blogsRouter.get('/',async (request, response) => {
  const blogs = await Blog.find({}).populate("user",{username:1, name:1 })
  response.json(blogs.map(blog =>blog.toJSON()))  
  })

//  const getTokenFrom = request => {
//    const authorization = request.get('authorization')
//    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//      return authorization.substring(7)
//    }
//    return null
//  }

  blogsRouter.post('/',async (request, response) => {
    const body = request.body
    const title = body.title
    const url = body.url
    console.log(typeof request.token)
    console.log("post metodin tokeni",request.token)
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    console.log(user)
    if(!title || !url){
      console.log("400 ran")
      response.status(400).end()
    }
    if(body.likes === undefined){
      body.likes = 0
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
    console.log("json ran")
  })

  blogsRouter.delete("/:id", async (request,response) => {
    console.log(request.params.id)
       
    //await Blog.findByIdAndRemove(request.params.id)
    const token = request.token
    console.log(token)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const userid = decodedToken.id
    const blog = await Blog.findById(request.params.id)
    console.log(blog)
    if(blog.user.toString() === userid.toString()){
      Blog.remove(blog)
      response.status(204).end()
    }
    response.status(400).json({
      error: "blog doesnt exist"
    })
  })

  blogsRouter.put("/:id", async (request,response) =>{
    console.log(request.params.id + " " + request.body.likes)
    const result = await Blog.findByIdAndUpdate(request.params.id,request.body,{new: true})
    response.json(result.toJSON())
  })

  module.exports = blogsRouter