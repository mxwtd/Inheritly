const express = require('express')
const propertyRouter = express.Router()
const propertiesController = require('../controllers/properties')
const verifyJWT = require('../middleware/verifyJWT')

const { multer } = require('../middleware/googleCloud')

propertyRouter.use(verifyJWT)

propertyRouter.route('/api/properties')
  .get(propertiesController.getAllUserProperties)
  .post(multer.fields([{ name: 'photo', maxCount: 1 }, { name: 'files', maxCount: 10 }]), propertiesController.createProperty)

propertyRouter.route('/api/properties/:id')
  .get(propertiesController.getPropertyById)
  .patch(multer.fields([{ name: 'photo', maxCount: 1 }, { name: 'files', maxCount: 10 }]), propertiesController.updateProperty)
  .delete(propertiesController.deleteProperty)

module.exports = propertyRouter
