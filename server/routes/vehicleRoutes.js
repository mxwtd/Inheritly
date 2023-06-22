const express = require('express')
const vehicleRouter = express.Router()
const vehiclesController = require('../controllers/vehicles')
const verifyJWT = require('../middleware/verifyJWT')

const { multer } = require('../middleware/googleCloud')

vehicleRouter.use(verifyJWT)

vehicleRouter.route('/api/vehicles')
  .get(vehiclesController.getAllUserVehicles)
  .post(multer.fields([{ name: 'photo', maxCount: 1 }, { name: 'files', maxCount: 10 }]), vehiclesController.createVehicle)

vehicleRouter.route('/api/vehicles/:id')
  .get(vehiclesController.getVehicleById)
  .patch(vehiclesController.updateVehicle)
  .delete(vehiclesController.deleteVehicle)

module.exports = vehicleRouter
