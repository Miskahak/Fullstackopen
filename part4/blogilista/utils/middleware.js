
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    
    request.token = authorization.substring(7)
  }
  next()
}

const errorHandler = (error, request, response, next) => {
    console.error("virhe",error.message)

    if(error.name === 'ValidationError'){
      return response.status(400).json({
        error : error.message
      })
    }else if ((error.name === 'JsonWebTokenError')){
        return response.status(401).json({ error: 'invalid token' })
    }
    next(error)
}


module.exports = {
    errorHandler,tokenExtractor
}