const express = require('express')
const commodityRouter = express.Router()
const commoditiesController = require('../controllers/commodities')
const verifyJWT = require('../middleware/verifyJWT')

const { multer } = require('../middleware/googleCloud')

commodityRouter.use(verifyJWT)

commodityRouter.route('/api/commodities')
  .get(commoditiesController.getAllUserCommodities)
  .post(multer.fields([{ name: 'photo', maxCount: 1 }, { name: 'files', maxCount: 10 }]), commoditiesController.createCommodity)

commodityRouter.route('/api/commodities/:id')
  .get(commoditiesController.getCommodityById)
  .patch(multer.fields([{ name: 'photo', maxCount: 1 }, { name: 'files', maxCount: 10 }]), commoditiesController.updateCommodity)
  .delete(commoditiesController.deleteCommodity)

commodityRouter.route('/api/commodities/:id/:fileId')
  .delete(commoditiesController.deleteFile)
  .patch(commoditiesController.renameFile)

module.exports = commodityRouter
