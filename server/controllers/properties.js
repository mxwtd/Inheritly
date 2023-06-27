/* eslint-disable dot-notation */
const Property = require('../models/InvestmentTypes/Property')
const User = require('../models/User')
const { uploadPhotoToGCS, uploadFilesToGCS, loadFileFromGCS, deleteFolderFromGCS, updateFileFromGCS, deleteFileFromGCS, moveGCSFile } = require('../middleware/googleCloud')

const createProperty = async (req, res, next) => {
  try {
    console.log('create property')
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
      zip,
      accountNumber,
      email,
      phone,
      companyAddress
    } = req.body

    let photoFile = null
    let propertyFiles = null

    if (req.files) {
      photoFile = req.files['photo'] ? req.files['photo'][0] : null
      propertyFiles = req.files['files'] ? req.files['files'] : null
    }

    let photo = null
    let files = null

    if (photoFile) {
      photo = {
        url: null,
        folder: await uploadPhotoToGCS(photoFile, userId, name, 'properties')
      }
    }

    if (propertyFiles) {
      // files = propertyFiles ? await uploadFilesToGCS(propertyFiles, userId, name) : null
      files = await Promise.all(propertyFiles.map(async (file) => {
        return {
          url: null,
          folder: await uploadFilesToGCS(file, userId, name, 'properties')
        }
      }))
    }

    console.log('photo ', photo)
    console.log('files ', files)

    const contactInformation = {
      accountNumber,
      email,
      phone,
      companyAddress
    }

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
      contactInformation,
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
  const { userId } = req

  try {
    // Find properties that belong to the user with the given ID
    const properties = await Property.find({ user: userId })

    // Create an array of promises for changing the photo URLs
    const changePhotoPromises = properties.map(async (property) => {
      if (property.photo.folder) {
        property.photo = {
          ...property.photo,
          url: await loadFileFromGCS(property.photo.folder)
        }
      } else {
        property.photo = {
          ...property.photo,
          url: 'https://res.cloudinary.com/djr22sgp3/image/upload/v1684185588/fomstock-4ojhpgKpS68-unsplash_ytmxew.jpg'
        }
      }

      if (property.files.folder) {
        property.files = await Promise.all(
          property.files.map(async (file) => {
            return {
              ...file,
              url: await loadFileFromGCS(file.folder)
            }
          })
        )
      }
    })

    // Wait for all the promises to complete
    await Promise.all(changePhotoPromises)

    // console.log('properties: ', properties)

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
      if (property.photo.folder) {
        property.photo = {
          ...property.photo,
          url: await loadFileFromGCS(property.photo.folder)
        }
      } else {
        property.photo = {
          ...property.photo,
          url: 'https://res.cloudinary.com/djr22sgp3/image/upload/v1684185588/fomstock-4ojhpgKpS68-unsplash_ytmxew.jpg'
        }
      }

      if (property.files) {
        console.log('Set files')
        property.files = await Promise.all(
          property.files.map(async (file) => {
            return {
              ...file,
              url: await loadFileFromGCS(file.folder)
            }
          })
        )
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
    const { userId } = req

    const { name } = propertyToUpdate
    let { files } = propertyToUpdate

    console.log('Files before: ', files)

    let photoFile = null
    let propertyFiles = null

    if (req.files) {
      photoFile = req.files['photo'] ? req.files['photo'][0] : null
      propertyFiles = req.files['files'] ? req.files['files'] : null
    }

    // console.log('photo file: ', photoFile)
    console.log('property files: ', propertyFiles)

    let photoPath = null

    if (photoFile) {
      // console.log('get photo file')
      photoPath = await updateFileFromGCS(photoFile, propertyToUpdate.photo.folder)
    }

    if (propertyFiles) {
      console.log('Set files')
      const newFiles = await Promise.all(propertyFiles.map(async (file) => {
        return {
          url: null,
          folder: await uploadFilesToGCS(file, userId, name, 'properties')
        }
      }))

      files = files.concat(newFiles)
    }

    // console.log('photo path folder', photoPath)
    // console.log('files path folder', files)

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
    if (photoPath) {
      updates.photo = {
        ...updates.photo,
        folder: photoPath
      }
    }

    // add files to updates if it exists
    if (files) {
      updates.files = files
    }

    // console.log('updates photo: ', updates.photo)

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
    const { userId } = req
    const user = await User.findById(userId)
    const propertyToDelete = await Property.findByIdAndDelete(id)

    if (propertyToDelete.photo || propertyToDelete.files) {
      const folderPath = `${userId}/properties/${propertyToDelete.name}/`
      await deleteFolderFromGCS(folderPath)
    }

    const updatedAssets = user.assets.filter(asset => asset.toString() !== id)
    user.assets = updatedAssets
    await user.save()

    res.status(204).end()
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }
}

const deleteFile = async (req, res, next) => {
  const { id, fileId } = req.params

  console.log('delete File')
  console.log('id: ', id)
  console.log('fileId: ', fileId)

  try {
    const property = await Property.findById(id)

    if (property && property.files) {
      const fileToDelete = property.files.find(file => file._id.toString() === fileId)

      if (fileToDelete) {
        await deleteFileFromGCS(fileToDelete.folder)

        const updatedFiles = property.files.filter(file => file._id.toString() !== fileId)
        property.files = updatedFiles

        await Property.findByIdAndUpdate(
          id,
          property,
          { new: true }
        ).exec()

        res.status(204).end()
      }
    }
  } catch (error) {
    next(error)
  }
}

const renameFile = async (req, res, next) => {
  const { id, fileId } = req.params

  console.log('rename File')
  console.log('id: ', id)
  console.log('fileId: ', fileId)

  try {
    const property = await Property.findById(id)

    if (property && property.files) {
      const fileToRename = property.files.find(file => file._id.toString() === fileId)

      if (fileToRename) {
        const { oldName, newName } = req.body

        console.log('Old name: ', oldName)
        console.log('New name: ', newName)

        const oldPath = fileToRename.folder
        const newPath = oldPath.replace(oldName, newName)

        console.log('oldPath: ', oldPath)
        console.log('newPath: ', newPath)

        await moveGCSFile(oldPath, newPath)

        fileToRename.folder = newPath

        // find the index of the file to rename in the properties and set the fileToRename to the new file
        const fileIndex = property.files.findIndex(file => file._id.toString() === fileId)
        property.files[fileIndex] = fileToRename

        await Property.findByIdAndUpdate(
          id,
          property,
          { new: true }
        ).exec()

        console.log('Property files: ', property.files)

        res.status(204).end()
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createProperty,
  getAllUserProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  deleteFile,
  renameFile
}
