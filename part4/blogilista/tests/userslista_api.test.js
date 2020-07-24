const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("secret",10)
    const user = new User({
        username: "root",
        passwordHash
    })
    await user.save()
  
})

test("same username cannot be created again", async ()=>{
    const usersAtStart = await helper.usersInDb()
    console.log(usersAtStart[0])
    const newUser = {
        username: 'root',
        name: 'adada',
        password: 'sasasa',
    }

    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('`username` to be unique')

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd.length).toBe(usersAtStart.length)
})

test("cant make username that has 3 or fewer characters", async ()=>{
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: 'ro',
        name: 'adada',
        password: 'saasd',
    }

    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)


  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd.length).toBe(usersAtStart.length)
})

test.only("cant make password that has 3 or fewer characters", async ()=>{
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: 'rowqwq',
        name: 'adada',
        password: 'sa',
    }

    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)


  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd.length).toBe(usersAtStart.length)
})

afterAll(() => {
    mongoose.connection.close()
  })