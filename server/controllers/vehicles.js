const Vehicle = require('../models/InvestmentTypes/Vehicle')
const User = require('../models/User')
const { uploadPhotoToGCS, uploadFilesToGCS, loadFileFromGCS, deleteFolderFromGCS, updateFileFromGCS } = require('../middleware/googleCloud')

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
    let propertyFiles = null

    if (req.files) {
      photoFile = req.files.photo ? req.files.photo[0] : null
      propertyFiles = req.files.files ? req.files.files : null
    }

    let photo = null
    let files = null

    if (photoFile) {
      photo = await uploadPhotoToGCS(photoFile, userId, name, 'vehicles')
    }

    if (propertyFiles) {
      // files = propertyFiles ? await uploadFilesToGCS(propertyFiles, userId, name) : null
      files = await Promise.all(propertyFiles.map(async (file) => {
        return await uploadFilesToGCS(file, userId, name)
      }))
    }

    console.log('photo path folder', photo)
    console.log('files path folder', files)

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
      if (vehicle.photo) {
        vehicle.photo = await loadFileFromGCS(vehicle.photo)
      } else {
        vehicle.photo = 'https://i.pinimg.com/564x/91/ed/eb/91edebb64768d1f00ca34807a6b74d73.jpg'
      }

      if (vehicle.files) {
        vehicle.files = await Promise.all(vehicle.files.map(async (file) => {
          return await loadFileFromGCS(file)
        }))
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

    const changePhotoPromise = async () => {
      if (vehicle.photo) {
        vehicle.photo = await loadFileFromGCS(vehicle.photo)
      } else {
        vehicle.photo = 'https://i.pinimg.com/564x/91/ed/eb/91edebb64768d1f00ca34807a6b74d73.jpg'
      }

      if (vehicle.files) {
        vehicle.files = await Promise.all(vehicle.files.map(async (file) => {
          return await loadFileFromGCS(file)
        }))
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

  try {
    const vehicleToUpdate = await Vehicle.findById(id)

    const photo = req.file ? await updateFileFromGCS(req.file, vehicleToUpdate.photo) : null

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

    if (photo) {
      updates.photo = photo
    }

    // Confirm note exists to update
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    ).exec()

    // const updatedVehicle = await vehicle.save()

    res.json(updatedVehicle)
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }
}

const deleteVehicle = async (req, res, next) => {
  const { id } = req.params

  try {
    const { userId } = req
    const user = await User.findById(userId)
    const vehicleToDelete = await Vehicle.findByIdAndDelete(id)

    if (vehicleToDelete.photo) {
      const folderPath = `${userId}/vehicles/${vehicleToDelete.name}/`
      await deleteFolderFromGCS(folderPath)
    }

    console.log('assets before: ', user.assets)

    console.log('property id: ', id)
    console.log('property id type: ', typeof id)

    const updatedAssets = user.assets.filter(asset => asset.toString() !== id)
    user.assets = updatedAssets
    await user.save()

    console.log('assets after: ', user.assets)

    res.status(204).end()
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }
}

module.exports = {
  createVehicle,
  getAllUserVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle
}
