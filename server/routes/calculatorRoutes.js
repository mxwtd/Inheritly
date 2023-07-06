const express = require('express')
const { calculatePension } = require('../controllers/calculatorController')
const verifyJWT = require('../middleware/verifyJWT')

const calculatorRouter = express.Router()

calculatorRouter.use(verifyJWT)

calculatorRouter.route('/api/calculator')
  .post(calculatePension)

module.exports = calculatorRouter
