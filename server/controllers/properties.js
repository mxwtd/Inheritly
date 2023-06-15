const Property = require('../models/InvestmentTypes/Property')
const User = require('../models/User')
const { uploadToGCS } = require('../middleware/fileUpload')

const createProperty = async (req, res, next) => {
  try {
    console.log('create property')
    console.log('req file is: ', req.file)

    const { userId } = req
    const user = await User.findById(userId)

    const photoUrl = req.file ? await uploadToGCS(req.file, userId) : null

    console.log('photo URL', photoUrl)

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

    const property = {
      name,
      currency,
      date,
      value,
      taxStatus,
      type,
      city,
      country,
      address,
      zip,
      photoUrl
    }

    console.log('Property to create: ', property)

    const newProperty = new Property({
      ...property,
      user: user._id
    })

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
  const updates = req.body

  // Check for empty values in updates
  const hasEmptyValues = Object.values(updates).some((value) => {
    if (typeof value === 'string') {
      return value.trim() === ''
    }
    return false
  })

  if (hasEmptyValues) {
    return res.status(400).json({ error: 'Empty values are not allowed' })
  }

  try {
    // Confirm note exists to update
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    ).exec()

    // const updatedProperty = await property.save()

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
}

module.exports = {
  createProperty,
  getAllUserProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
}
