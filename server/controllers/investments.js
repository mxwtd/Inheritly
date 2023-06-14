const userRouter = require('express').Router()
// const User = require('../models/User')
const Investment = require('../models/Investment')

userRouter.get('/', async (request, response) => {
  const investments = await Investment.find({})
  response.json(investments)
})

module.exports = userRouter
