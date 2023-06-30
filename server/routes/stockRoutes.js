const express = require('express')
const stockRouter = express.Router()
const stocksController = require('../controllers/stocks')
const verifyJWT = require('../middleware/verifyJWT')

const { multer } = require('../middleware/googleCloud')

stockRouter.use(verifyJWT)

stockRouter.route('/api/stocks')
  .get(stocksController.getAllUserStocks)
  .post(multer.fields([{ name: 'photo', maxCount: 1 }, { name: 'files', maxCount: 10 }]), stocksController.createStock)

stockRouter.route('/api/stocks/:id')
  .get(stocksController.getStockById)
  .patch(multer.fields([{ name: 'photo', maxCount: 1 }, { name: 'files', maxCount: 10 }]), stocksController.updateStock)
  .delete(stocksController.deleteStock)

stockRouter.route('/api/stocks/:id/:fileId')
  .delete(stocksController.deleteFile)
  .patch(stocksController.renameFile)

module.exports = stockRouter
