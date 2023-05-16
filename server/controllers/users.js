const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.post('/', async (request, response) => {
  try {
    const { body } = request
    const { username, name, password, email, profilePic } = body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      email,
      profilePic,
      passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    response.status(400).json({ error })
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('reviews', { title: 1, content: 1, date: 1, important: 1 })
  response.json(users)
})

module.exports = usersRouter
