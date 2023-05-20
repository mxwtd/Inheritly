const express = require('express')
const propertyRouter = express.Router()
const propertiesController = require('../controllers/properties')
const userExtractor = require('../middleware/userExtractor')

propertyRouter.post('/api/properties', userExtractor, propertiesController.createProperty)

propertyRouter.get('/api/properties', propertiesController.getAllProperties)

// propertyRouter.get('/api/properties/:id', propertiesController.getPropertyById)

// propertyRouter.put('/api/properties/:id', propertiesController.updateProperty)

// propertyRouter.delete('/api/properties/:id', propertiesController.deleteProperty)

module.exports = propertyRouter
