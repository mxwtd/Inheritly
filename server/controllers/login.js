const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { email, password } = body

  const user = await User.findOne({ email })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    id: user._id,
    username: user.email
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET_KEY,
    // { expiresIn: 60 * 60 }
    { expiresIn: 60 }
  )

  response.status(200).send({
    name: user.name,
    email: user.email,
    token
  })
})

module.exports = loginRouter
