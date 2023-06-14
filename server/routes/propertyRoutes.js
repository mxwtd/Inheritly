const express = require('express')
const propertyRouter = express.Router()
const propertiesController = require('../controllers/properties')
const verifyJWT = require('../middleware/verifyJWT')
const Multer = require('multer')

propertyRouter.use(verifyJWT)

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
})

propertyRouter.route('/api/properties')
  .get(propertiesController.getAllUserProperties)
  .post(multer.single('photo'), propertiesController.createProperty)

propertyRouter.route('/api/properties/:id')
  .get(propertiesController.getPropertyById)
  .patch(propertiesController.updateProperty)
  .delete(propertiesController.deleteProperty)

module.exports = propertyRouter
