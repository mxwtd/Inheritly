const userRouter = require('express').Router()
// const User = require('../models/User')
const Property = require('../models/InvestmentTypes/Property')
// const userExtractor = require('../middleware/userExtractor')

userRouter.get('/', async (request, response) => {
  const properties = await Property.find({})
  response.json(properties)
})

module.exports = userRouter
