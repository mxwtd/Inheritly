const express = require('express')
const propertyRouter = express.Router()
const propertiesController = require('../controllers/properties')
const userExtractor = require('../middleware/userExtractor')

propertyRouter.route('/api/properties', userExtractor)
  .get(propertiesController.getAllUserProperties)
  .post(userExtractor, propertiesController.createProperty)

// propertyRouter.get('/api/properties/:id', propertiesController.getPropertyById)

// propertyRouter.put('/api/properties/:id', propertiesController.updateProperty)

// propertyRouter.delete('/api/properties/:id', propertiesController.deleteProperty)

module.exports = propertyRouter
