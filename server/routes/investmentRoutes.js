const express = require('express')
const investmentRouter = express.Router()
const investmentsController = require('../controllers/investments')
const verifyJWT = require('../middleware/verifyJWT')

investmentRouter.use(verifyJWT)

investmentRouter.route('/api/investments')
  .get(investmentsController.getAllBalances)

investmentRouter.route('/api/assets')
  .get(investmentsController.getAllAssets)

module.exports = investmentRouter
