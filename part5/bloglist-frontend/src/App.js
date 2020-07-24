import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) 
  const [errorMessage, setErrorMessage] = useState(null)
  const [author,setAuthor] = useState("")
  const [title,setTitle] = useState("")
  const [url,setUrl] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        "loggedBlogappUser", JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCreateBlog = async (event) =>{
    event.preventDefault()
    const data = await blogService.create({
      title: title,
      author: author,
      url:url
    })
    console.log(data)
    setBlogs(blogs.concat(data))

  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser")

 
  }

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const blogForm = () => (
    <form onSubmit ={handleCreateBlog}>
      <div>
        title
        <input type = "text"
        value={title}
        name = "Title"
        onChange ={({target}) => setTitle(target.value)}/>
      </div>
      <div>
        author
        <input type = "text"
        value={author}
        name = "Author"
        onChange ={({target}) => setAuthor(target.value)}/>
      </div>
      <div>
        url
        <input type = "text"
        value={url}
        name = "Url"
        onChange ={({target}) => setUrl(target.value)}/>
      </div>
      <button type = "submit">create blog</button>
    </form>
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  
  if(user === null){
    return (
      <div>
        {errorMessage}
      <h1>login to application</h1>
      {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <p>logged in as {user.username}
      <button onClick={handleLogout}>
        logout
      </button> </p>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <h2>create new blog</h2>
      {blogForm()}
    </div>
  )
}

export default App