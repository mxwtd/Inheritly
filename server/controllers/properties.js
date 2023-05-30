const Property = require('../models/InvestmentTypes/Property')
const User = require('../models/User')

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

  const newProperty = new Property({
    ...property,
    user: user._id
  })

  try {
    const savedProperty = await newProperty.save()

    user.assets.push(savedProperty._id)
    await user.save()

    res.status(201).json(savedProperty)
  } catch (error) {
    next(error)
  }
}

const getAllUserProperties = async (req, res, next) => {
  // Get the user ID from the request body
  console.log('req', req)

  const { userId } = req

  try {
    // Find properties that belong to the user with the given ID
    const properties = await Property.find({ user: userId })
    res.json(properties)
  } catch (error) {
    next(error)
  }
}

const getPropertyById = async (req, res, next) => {
  const { id } = req.params

  try {
    const property = await Property.findById(id)
    res.json(property)
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }
}

const updateProperty = async (req, res, next) => {
  const { id } = req.params
  const { name, currency, date, value, taxStatus, type, city, country, address, zip } = req.body

  try {
    // Confirm note exists to update
    const property = await Property.findById(id).exec()

    property.name = name
    property.currency = currency
    property.date = date
    property.value = value
    property.taxStatus = taxStatus
    property.type = type
    property.city = city
    property.country = country
    property.address = address
    property.zip = zip

    const updatedProperty = await property.save()

    res.json(updatedProperty)
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }
}

const deleteProperty = async (req, res, next) => {
  const { id } = req.params

  try {
    await Property.findByIdAndDelete(id)

    const { userId } = req
    const user = await User.findById(userId)

    const updatedAssets = user.assets.filter(asset => asset.toString() !== id)
    user.assets = updatedAssets
    await user.save()

    res.status(204).end()
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }

  // try {
  //   await Property.findByIdAndDelete(id)

  //   res.status(204).end()
  // } catch (error) {
  //   (isNaN(id)) ? next(error) : res.status(404).end()
  // }
}

module.exports = {
  createProperty,
  getAllUserProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
}
