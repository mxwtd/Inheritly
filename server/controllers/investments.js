const userRouter = require('express').Router()
// const User = require('../models/User')
const Investment = require('../models/Investment')
// const userExtractor = require('../middleware/userExtractor')

userRouter.get('/', async (request, response) => {
  const investments = await Investment.find({})
  response.json(investments)
})

module.exports = userRouter
