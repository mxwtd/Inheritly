const express = require('express')
const jewelRouter = express.Router()
const jewelsController = require('../controllers/jewels')
const verifyJWT = require('../middleware/verifyJWT')

const { multer } = require('../middleware/googleCloud')

jewelRouter.use(verifyJWT)

jewelRouter.route('/api/jewels')
  .get(jewelsController.getAllUserVehicles)
  .post(multer.fields([{ name: 'photo', maxCount: 1 }, { name: 'files', maxCount: 10 }]), jewelsController.createVehicle)

jewelRouter.route('/api/jewels/:id')
  .get(jewelsController.getVehicleById)
  .patch(multer.fields([{ name: 'photo', maxCount: 1 }, { name: 'files', maxCount: 10 }]), jewelsController.updateVehicle)
  .delete(jewelsController.deleteVehicle)

jewelRouter.route('/api/jewels/:id/:fileId')
  .delete(jewelsController.deleteFile)
  .patch(jewelsController.renameFile)

module.exports = jewelRouter
