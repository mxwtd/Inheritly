/* eslint-disable dot-notation */
const Property = require('../models/InvestmentTypes/Property')
const User = require('../models/User')
const { uploadPhotoToGCS, uploadFilesToGCS, loadFileFromGCS, deleteFileFromGCS, updateFileFromGCS } = require('../middleware/googleCloud')

const createProperty = async (req, res, next) => {
  try {
    console.log('create property')
    // console.log('req file is: ', req.files)

    // console.log('req photo is: ', req.files['photo'])

    const { userId } = req
    const user = await User.findById(userId)

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

    const photoFile = req.files['photo'][0]
    const propertyFiles = req.files['files']

    console.log('photo file is: ', photoFile)
    console.log('property files are: ', propertyFiles)

    const photo = photoFile ? await uploadPhotoToGCS(photoFile, userId, name) : null
    let files = null

    if (propertyFiles) {
      // files = propertyFiles ? await uploadFilesToGCS(propertyFiles, userId, name) : null
      files = await Promise.all(propertyFiles.map(async (file) => {
        return await uploadFilesToGCS(file, userId, name)
      }))
    }

    console.log('photo path folder', photo)
    console.log('files path folder', files)

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
      photo,
      files
    }

    const newProperty = new Property({
      ...property,
      user: user._id
    })

    console.log('new property: ', newProperty)

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

    // Create an array of promises for changing the photo URLs
    const changePhotoPromises = properties.map(async (property) => {
      if (property.photo) {
        property.photo = await loadFileFromGCS(property.photo)
      } else {
        property.photo = 'https://res.cloudinary.com/djr22sgp3/image/upload/v1684185588/fomstock-4ojhpgKpS68-unsplash_ytmxew.jpg'
      }
    })

    // Wait for all the promises to complete
    await Promise.all(changePhotoPromises)

    res.json(properties)
  } catch (error) {
    next(error)
  }
}

const getPropertyById = async (req, res, next) => {
  const { id } = req.params

  try {
    const property = await Property.findById(id)

    // Create a promises for changing the photo URL
    const changePhotoPromise = async () => {
      if (property.photo) {
        property.photo = await loadFileFromGCS(property.photo)
      } else {
        property.photo = 'https://res.cloudinary.com/djr22sgp3/image/upload/v1684185588/fomstock-4ojhpgKpS68-unsplash_ytmxew.jpg'
      }
    }

    // Wait for the promise to complete
    await changePhotoPromise()

    res.json(property)
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }
}

const updateProperty = async (req, res, next) => {
  const { id } = req.params
  const updates = req.body

  try {
    const propertyToUpdate = await Property.findById(id)

    const photo = req.file ? await updateFileFromGCS(req.file, propertyToUpdate.photo) : null

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

    // add photo to updates if it exists
    if (photo) {
      updates.photo = photo
    }

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
    const propertyToDelete = await Property.findByIdAndDelete(id)

    if (propertyToDelete.photo) {
      await deleteFileFromGCS(propertyToDelete.photo)
    }

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
