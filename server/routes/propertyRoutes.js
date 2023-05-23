const express = require('express')
const propertyRouter = express.Router()
const propertiesController = require('../controllers/properties')
const userExtractor = require('../middleware/userExtractor')

propertyRouter.route('/api/properties')
  .get(userExtractor, propertiesController.getAllUserProperties)
  .post(userExtractor, propertiesController.createProperty)

propertyRouter.route('/api/properties/:id')
  .get(userExtractor, propertiesController.getPropertyById)
  .put(userExtractor, propertiesController.updateProperty)
  .delete(userExtractor, propertiesController.deleteProperty)

// propertyRouter.put('/api/properties/:id', propertiesController.updateProperty)

// propertyRouter.delete('/api/properties/:id', propertiesController.deleteProperty)

module.exports = propertyRouter
