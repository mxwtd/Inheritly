const userRouter = require('express').Router()
// const User = require('../models/User')
const Investment = require('../models/Investment')
// const userExtractor = require('../middleware/userExtractor')

userRouter.get('/', async (request, response) => {
  console.log('/investments path is working')
  const investments = await Investment.find({})
  response.json(investments)
})
