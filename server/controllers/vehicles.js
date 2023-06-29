/* eslint-disable dot-notation */
const Vehicle = require('../models/InvestmentTypes/Vehicle')
const User = require('../models/User')
const { uploadPhotoToGCS, uploadFilesToGCS, loadFileFromGCS, deleteFolderFromGCS, updateFileFromGCS, deleteFileFromGCS, moveGCSFile } = require('../middleware/googleCloud')

const createVehicle = async (req, res, next) => {
  try {
    const { userId } = req
    const user = await User.findById(userId)

    const {
      name,
      currency,
      date,
      value,
      taxStatus,
      type,
      brand,
      model,
      year,
      accountNumber,
      email,
      phone,
      companyAddress
    } = req.body

    let photoFile = null
    let vehicleFiles = null

    if (req.files) {
      photoFile = req.files['photo'] ? req.files['photo'][0] : null
      vehicleFiles = req.files['files'] ? req.files['files'] : null
    }

    let photo = null
    let files = null

    if (photoFile) {
      photo = {
        url: null,
        folder: await uploadPhotoToGCS(photoFile, userId, name, 'vehicles')
      }
    }

    if (vehicleFiles) {
      files = await Promise.all(vehicleFiles.map(async (file) => {
        return {
          url: null,
          folder: await uploadFilesToGCS(file, userId, name, 'vehicles')
        }
      }))
    }

    const contactInformation = {
      accountNumber,
      email,
      phone,
      companyAddress
    }

    const vehicle = {
      name,
      currency,
      date,
      value,
      taxStatus,
      type,
      brand,
      model,
      year,
      contactInformation,
      photo,
      files
    }

    console.log('Vehicle to save: ', vehicle)

    const newVehicle = new Vehicle({
      ...vehicle,
      user: user._id
    })

    const savedVehicle = await newVehicle.save()

    user.assets.push(savedVehicle._id)
    await user.save()

    res.status(201).json(savedVehicle)
  } catch (error) {
    next(error)
  }
}

const getAllUserVehicles = async (req, res, next) => {
  const { userId } = req

  try {
    // Find vehicles that belong to the user with the given ID
    const vehicles = await Vehicle.find({ user: userId })

    const changePhotoPromises = vehicles.map(async (vehicle) => {
      if (vehicle.photo.folder) {
        vehicle.photo = {
          ...vehicle.photo,
          url: await loadFileFromGCS(vehicle.photo.folder)
        }
      } else {
        vehicle.photo = {
          ...vehicle.photo,
          url: 'https://i.pinimg.com/564x/91/ed/eb/91edebb64768d1f00ca34807a6b74d73.jpg'
        }
      }

      if (vehicle.files) {
        console.log('Set files')
        console.log('vehicles files folder: ', vehicle.files.folder)
        vehicle.files = await Promise.all(
          vehicle.files.map(async (file) => {
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

    res.json(vehicles)
  } catch (error) {
    next(error)
  }
}

const getVehicleById = async (req, res, next) => {
  const { id } = req.params

  try {
    const vehicle = await Vehicle.findById(id)
    // }
    const changePhotoPromise = async () => {
      if (vehicle.photo.folder) {
        vehicle.photo = {
          ...vehicle.photo,
          url: await loadFileFromGCS(vehicle.photo.folder)
        }
      } else {
        vehicle.photo = {
          ...vehicle.photo,
          url: 'https://i.pinimg.com/564x/91/ed/eb/91edebb64768d1f00ca34807a6b74d73.jpg'
        }
      }

      if (vehicle.files) {
        console.log('Set files')
        vehicle.files = await Promise.all(
          vehicle.files.map(async (file) => {
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

    res.json(vehicle)
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }
}

const updateVehicle = async (req, res, next) => {
  const { id } = req.params
  const updates = req.body

  const contactInformation = {
    accountNumber: updates.accountNumber || '',
    email: updates.email || '',
    phone: updates.phone || '',
    companyAddress: updates.companyAddress || ''
  }

  updates.contactInformation = contactInformation

  try {
    const vehicleToUpdate = await Vehicle.findById(id)
    const { userId } = req

    const { name } = vehicleToUpdate
    let { files } = vehicleToUpdate

    console.log('Files before: ', files)

    let photoFile = null
    let vehicleFiles = null

    if (req.files) {
      photoFile = req.files['photo'] ? req.files['photo'][0] : null
      vehicleFiles = req.files['files'] ? req.files['files'] : null
    }

    console.log('vehicle files: ', vehicleFiles)

    let photoPath = null

    if (photoFile) {
      // console.log('get photo file')
      photoPath = await updateFileFromGCS(photoFile, vehicleToUpdate.photo.folder)
    }

    if (vehicleFiles) {
      console.log('Set files')
      const newFiles = await Promise.all(vehicleFiles.map(async (file) => {
        return {
          url: null,
          folder: await uploadFilesToGCS(file, userId, name, 'vehicles')
        }
      }))

      files = files.concat(newFiles)
    }

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
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    ).exec()

    res.json(updatedVehicle)
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }
}

const deleteVehicle = async (req, res, next) => {
  console.log('delete property')
  const { id } = req.params

  console.log('id to delete', id)

  try {
    const { userId } = req
    const user = await User.findById(userId)
    const vehicleToDelete = await Vehicle.findByIdAndDelete(id)

    console.log('vehicle to delete: ', vehicleToDelete)

    if (vehicleToDelete.photo) {
      const folderPath = `${userId}/vehicles/${vehicleToDelete.name}/`
      console.log('path to delete: ', folderPath)
      await deleteFolderFromGCS(folderPath)
    }

    const updatedAssets = user.assets.filter(asset => asset.toString() !== id)
    user.assets = updatedAssets
    await user.save()

    console.log('assets after: ', user.assets)

    res.status(204).end()
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }
}

const deleteFile = async (req, res, next) => {
  const { id, fileId } = req.params

  try {
    const vehicle = await Vehicle.findById(id)

    if (vehicle && vehicle.files) {
      const fileToDelete = vehicle.files.find(file => file._id.toString() === fileId)

      if (fileToDelete) {
        await deleteFileFromGCS(fileToDelete.folder)

        const updatedFiles = vehicle.files.filter(file => file._id.toString() !== fileId)
        vehicle.files = updatedFiles

        await Vehicle.findByIdAndUpdate(
          id,
          vehicle,
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

  try {
    const vehicle = await Vehicle.findById(id)

    if (vehicle && vehicle.files) {
      const fileToRename = vehicle.files.find(file => file._id.toString() === fileId)

      if (fileToRename) {
        const { oldName, newName } = req.body

        const oldPath = fileToRename.folder
        const newPath = oldPath.replace(oldName, newName)

        await moveGCSFile(oldPath, newPath)

        fileToRename.folder = newPath

        const fileIndex = vehicle.files.findIndex(file => file._id.toString() === fileId)
        vehicle.files[fileIndex] = fileToRename

        await Vehicle.findByIdAndUpdate(
          id,
          vehicle,
          { new: true }
        ).exec()

        console.log('Vehicle files: ', vehicle.files)

        res.status(204).end()
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createVehicle,
  getAllUserVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  deleteFile,
  renameFile
}
