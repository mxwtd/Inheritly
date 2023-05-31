const userRouter = require('express').Router()
// const User = require('../models/User')
const Vehicle = require('../models/InvestmentTypes/Vehicle')

userRouter.get('/', async (request, response) => {
  const vehicles = await Vehicle.find({})
  response.json(vehicles)
})

module.exports = userRouter
