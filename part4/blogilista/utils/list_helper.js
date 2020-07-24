var _ = require('lodash');

const dummy = (blogs) => {
    return 1
  }
  


const totalLikes = (blogs) =>{
    var total = 0
    blogs.forEach(blog => {
        total += Number(blog.likes)
    });
    return total
}

const favoriteBlog = (blogs) =>{
    var highest_likes = 0
    var favorite = blogs[0]
    blogs.forEach(blog =>{
        if(Number(blog.likes) >=highest_likes){
            highest_likes = Number(blog.likes)
            favorite = blog
        }
    })
    return {
        title:favorite.title,
        author: favorite.author,
        likes: Number(favorite.likes)

    }
}

const mostBlogs = (blogs) =>{
    var manipulated = _(blogs).groupBy(blog => blog.author).map((value,key) => ({author:key, blogs: value.length})).value()
    var most_blogs_author = manipulated[0]
 
    manipulated.forEach(blog =>{
        if(Number(blog.blogs)>Number(most_blogs_author.blogs)){
            most_blogs_author = blog
        }
    })
    console.log(manipulated)
    console.log(most_blogs_author)
    return {
        author: most_blogs_author.author,
        blogs: most_blogs_author.blogs
    }
}

const mostLikes = (blogs) =>{
    var manipulated = _(blogs).groupBy(blog => blog.author).map((value,key) =>({author: key, likes: _.sumBy(value,"likes")})).value()
    var mostLikesAuthor =manipulated[0]
    manipulated.forEach(author =>{
        if(Number(author.likes)>Number(mostLikesAuthor.likes)){
            mostLikesAuthor = author
        }
    })
    return {
        author: mostLikesAuthor.author,
        likes: mostLikesAuthor.likes
    }

}

module.exports = {
    dummy,totalLikes,favoriteBlog,mostBlogs,mostLikes
  }