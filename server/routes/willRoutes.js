const express = require('express')
const { generateWill } = require('../controllers/willController')
const verifyJWT = require('../middleware/verifyJWT')

const willRouter = express.Router()

willRouter.use(verifyJWT)

willRouter.route('/api/wills')
  .post(generateWill)

module.exports = willRouter
