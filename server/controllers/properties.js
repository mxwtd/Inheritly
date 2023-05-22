const propertyRouter = require('express').Router()
// const User = require('../models/User')
const Property = require('../models/InvestmentTypes/Property')
const User = require('../models/User')
// const userExtractor = require('../middleware/userExtractor')

const getAllProperties = async (req, res, next) => {
  // Get all properties that has the user ID in the request
  const { userId } = req

  try {
    const properties = await Property.find({ user: userId })
    res.json(properties)
  } catch (error) {
    next(error)
  }
}

const createProperty = async (req, res, next) => {
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
  } = req.body

  const property = { name, currency, date, value, taxStatus, type, city, country, address, zip }

  // Get user ID from token
  const { userId } = req
  const user = await User.findById(userId)

  console.log('User found: ', user)

  const newProperty = new Property({
    ...property,
    user: user._id
  })

  console.log('New Property: ', newProperty)

  try {
    const savedProperty = await newProperty.save()

    user.assets.push(savedProperty._id)
    await user.save()

    res.status(201).json(savedProperty)
  } catch (error) {
    next(error)
  }
}

propertyRouter.get('/:id', async (request, response, next) => {
  const { id } = request.params

  try {
    const property = await Property.findById(id)
    response.json(property)
  } catch (error) {
    (isNaN(id)) ? next(error) : response.status(404).end()
  }
})

// propertyRouter.post('/', async (request, response, next) => {
//   const {
//     name,
//     currency,
//     date,
//     value,
//     taxStatus,
//     type,
//     city,
//     country,
//     address,
//     zip
//   } = request.body

//   const property = { name, currency, date, value, taxStatus, type, city, country, address, zip }

//   const newProperty = new Property(property)

//   try {
//     const savedProperty = await newProperty.save()
//     response.json(savedProperty)
//   } catch (error) {
//     (isNaN(newProperty)) ? response.status(422).end() : next(error)
//   }
// })

module.exports = {
  getAllProperties,
  createProperty
}
