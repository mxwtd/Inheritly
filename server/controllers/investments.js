const userRouter = require('express').Router()
const Investment = require('../models/Investment')

userRouter.get('/', async (request, response) => {
  const investments = await Investment.find({})
  response.json(investments)
})

module.exports = userRouter
