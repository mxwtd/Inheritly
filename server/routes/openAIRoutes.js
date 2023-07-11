const express = require('express')
const openAIController = require('../controllers/openAI')
const verifyJWT = require('../middleware/verifyJWT')

const willRouter = express.Router()

willRouter.use(verifyJWT)

willRouter.route('/api/wills')
  .post(openAIController.generateWill)

module.exports = willRouter
