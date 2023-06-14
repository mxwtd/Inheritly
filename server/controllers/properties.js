const { format } = require('util')
const Property = require('../models/InvestmentTypes/Property')
const User = require('../models/User')
const { Storage } = require('@google-cloud/storage')

const storage = new Storage()

const bucketName = process.env.BUCKET_NAME

const bucket = storage.bucket(bucketName)

const createProperty = async (req, res, next) => {
  console.log('req.body is: ', req.body)

  let photoUrl = null
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
    zip,
    photo
  } = req.body

  console.log('req file ', req.file)

  console.log('photo is: ', photo)

  console.log('photo type of ', typeof photo)

  console.log('photo name is ', photo.name)
  console.log('photo name is ', photo[name])

  if (photo) {
    console.log('photo found')

    const blob = bucket.file(photo.name)
    console.log('blob is ', blob)
    const blobStream = blob.createWriteStream()

    blobStream.on('error', (err) => {
      console.log('error is: ', err)
      next(err)
    })

    blobStream.on('finish', () => {
      photoUrl = format(
        `https://storage.googleapis.com/${bucketName}/${blob.name}`
      )
      console.log('photoUrl is: ', photoUrl)
      console.log('blobStream finished')
    })

    blobStream.end(photo.buffer)
  }

  // Get user ID from token
  const { userId } = req
  const user = await User.findById(userId)

  const property = { name, currency, date, value, taxStatus, type, city, country, address, zip, photoUrl }

  console.log('Property to create: ', property)

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
