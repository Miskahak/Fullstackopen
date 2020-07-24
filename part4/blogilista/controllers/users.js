const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.post("/", async (request, response) => {
    const body = request.body
    if (body.password.length < 3){
        response.status(400).send("password must have at least 3 characters")
    }
    const salrRounds = 10
    const passwordHash = await bcrypt.hash(body.password, salrRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()
    response.json(savedUser)
})

usersRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs",{url: 1, title: 1, author: 1})
    response.json(users.map(u => u.toJSON()))
})




module.exports = usersRouter