const propertyRouter = require('express').Router()
// const User = require('../models/User')
const Property = require('../models/InvestmentTypes/Property')
// const userExtractor = require('../middleware/userExtractor')

propertyRouter.get('/', async (request, response) => {
  const properties = await Property.find({})
  response.json(properties)
})

propertyRouter.get('/:id', async (request, response, next) => {
  const { id } = request.params

  try {
    const property = await Property.findById(id)
    response.json(property)
  } catch (error) {
    (isNaN(id)) ? next(error) : response.status(404).end()
  }
})

propertyRouter.post('/', async (request, response, next) => {
  const {
    name,
    currency,
    date,
    value,
    taxStatus,
    type,
    city,
    country,
    address,
    zip
  } = request.body

  const property = { name, currency, date, value, taxStatus, type, city, country, address, zip }

  const newProperty = new Property(property)

  try {
    const savedProperty = await newProperty.save()
    response.json(savedProperty)
  } catch (error) {
    next(error)
  }
})

module.exports = propertyRouter
