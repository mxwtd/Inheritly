const express = require('express')
const propertyRouter = express.Router()
const propertiesController = require('../controllers/properties')
// const userExtractor = require('../middleware/userExtractor')
const verifyJWT = require('../middleware/verifyJWT')

propertyRouter.use(verifyJWT)

propertyRouter.route('/api/properties')
  .get(propertiesController.getAllUserProperties)
  .post(propertiesController.createProperty)

propertyRouter.route('/api/properties/:id')
  .get(propertiesController.getPropertyById)
  .put(propertiesController.updateProperty)
  .delete(propertiesController.deleteProperty)

module.exports = propertyRouter
