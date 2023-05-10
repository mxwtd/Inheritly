const userRouter = require('express').Router()
// const User = require('../models/User')
const Property = require('../models/InvestmentTypes/Property')
// const userExtractor = require('../middleware/userExtractor')

userRouter.get('/', async (request, response) => {
  const properties = await Property.find({})
  response.json(properties)
})

userRouter.get('/:id', async (request, response) => {
  const property = await Property.findById(request.params.id)
  response.json(property)
})

module.exports = userRouter
