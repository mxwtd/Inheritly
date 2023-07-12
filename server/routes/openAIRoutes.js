const express = require('express')
const openAIController = require('../controllers/openAI')
const verifyJWT = require('../middleware/verifyJWT')

const openAIRouter = express.Router()

openAIRouter.use(verifyJWT)

openAIRouter.route('/api/wills')
  .post(openAIController.generateWill)

openAIRouter.route('/api/calculator')
  .post(openAIController.calculatePension)

module.exports = openAIRouter
