const Property = require('../models/InvestmentTypes/Property')
const User = require('../models/User')

const createProperty = async (req, res, next) => {
  console.log('createProperty')

  // console.log('request: ', req)
  console.log('req.body', req.body)
  res.status(201).json({ message: 'Property created' })

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

  console.log('photo data type', typeof photo)
  console.log('photo type', photo.type)

  // const {
  //   name,
  //   currency,
  //   date,
  //   value,
  //   taxStatus,
  //   type,
  //   city,
  //   country,
  //   address,
  //   zip,
  //   photo
  // } = req.body

  // // Get user ID from token
  // const { userId } = req
  // const user = await User.findById(userId)

  // // Check if photo is empty
  // if (photo) {
  //   // Initialize storage
  //   const storage = new Storage({
  //     keyFilename: '../config/inheritlytest-55b611cf095a.json'
  //   })
  //   const bucketName = process.env.BUCKET_NAME
  //   console.log('bucketName', bucketName)

  //   const bucket = storage.bucket(bucketName)

  //   // Sending the upload request
  //   bucket.upload(
  //     photo,
  //     {
  //       destination: `${user._id}/${name}.png`
  //     },
  //     function (err, file) {
  //       if (err) {
  //         next(err)
  //         console.error(`Error uploading image image_to_upload.jpeg: ${err}`)
  //       } else {
  //         console.log(`Image image_to_upload.jpeg uploaded to ${bucketName}.`)
  //       }
  //     }
  //   )
  // }

  // const property = { name, currency, date, value, taxStatus, type, city, country, address, zip }

  // const newProperty = new Property({
  //   ...property,
  //   user: user._id
  // })

  // try {
  //   const savedProperty = await newProperty.save()

  //   user.assets.push(savedProperty._id)
  //   await user.save()

  //   res.status(201).json(savedProperty)
  // } catch (error) {
  //   next(error)
  // }
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
