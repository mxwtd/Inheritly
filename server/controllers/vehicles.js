const Vehicle = require('../models/InvestmentTypes/Vehicle')
const User = require('../models/User')

const createVehicle = async (req, res, next) => {
  const {
    name,
    currency,
    date,
    value,
    taxStatus,
    type,
    brand,
    model,
    year
  } = req.body

  const vehicle = { name, currency, date, value, taxStatus, type, brand, model, year }

  // Get user ID from token
  const { userId } = req
  const user = await User.findById(userId)

  const newVehicle = new Vehicle({
    ...vehicle,
    user: user._id
  })

  try {
    const savedVehicle = await newVehicle.save()

    user.assets.push(savedVehicle._id)
    await user.save()

    res.status(201).json(savedVehicle)
  } catch (error) {
    next(error)
  }
}

const getAllUserVehicles = async (req, res, next) => {
  // Get the user ID from the request body

  const { userId } = req

  try {
    // Find vehicles that belong to the user with the given ID
    const vehicles = await Vehicle.find({ user: userId })
    res.json(vehicles)
  } catch (error) {
    next(error)
  }
}

const getVehicleById = async (req, res, next) => {
  const { id } = req.params

  try {
    const vehicle = await Vehicle.findById(id)
    res.json(vehicle)
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }
}

const updateVehicle = async (req, res, next) => {
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
    await Vehicle.findByIdAndDelete(id)

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
  createVehicle,
  getAllUserVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle
}
