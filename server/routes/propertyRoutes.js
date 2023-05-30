const express = require('express')
const propertyRouter = express.Router()
const propertiesController = require('../controllers/properties')
// const userExtractor = require('../middleware/userExtractor')
const verifyJWT = require('../middleware/verifyJWT')

propertyRouter.use(verifyJWT)

propertyRouter.route('/api/properties')
  .get(propertiesController.getAllUserProperties)
  .post(propertiesController.createProperty)
  .delete(propertiesController.deleteProperty)

propertyRouter.route('/api/properties/:id')
  .get(propertiesController.getPropertyById)
  .patch(propertiesController.updateProperty)
  .delete(propertiesController.deleteProperty)

module.exports = propertyRouter
