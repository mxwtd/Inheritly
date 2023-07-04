const express = require('express')
const fundRouter = express.Router()
const fundsController = require('../controllers/funds')
const verifyJWT = require('../middleware/verifyJWT')

const { multer } = require('../middleware/googleCloud')

fundRouter.use(verifyJWT)

fundRouter.route('/api/funds')
  .get(fundsController.getAllUserFunds)
  .post(multer.fields([{ name: 'photo', maxCount: 1 }, { name: 'files', maxCount: 10 }]), fundsController.createFund)

fundRouter.route('/api/funds/:id')
  .get(fundsController.getFundById)
  .patch(multer.fields([{ name: 'photo', maxCount: 1 }, { name: 'files', maxCount: 10 }]), fundsController.updateFund)
  .delete(fundsController.deleteFund)

fundRouter.route('/api/funds/:id/:fileId')
  .delete(fundsController.deleteFile)
  .patch(fundsController.renameFile)

module.exports = fundRouter
