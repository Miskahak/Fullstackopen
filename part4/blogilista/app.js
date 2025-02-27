const config = require('./utils/config')
const express = require("express")
require("express-async-errors")
const app = express()
const cors = require('cors')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require("./controllers/users")
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require("./utils/logger")
const Blog = require("./models/blog")


logger.info("connecting to", config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})

app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use("/api/users",usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)


module.exports = app