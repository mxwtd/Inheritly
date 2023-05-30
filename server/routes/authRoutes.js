const express = require('express')
const authController = require('../controllers/authorizations')
const authRouter = express.Router()
const loginLimiter = require('../middleware/loginLimiter')

authRouter.route('/api/auth/login')
  .post(loginLimiter, authController.login)

authRouter.route('/api/auth/refresh')
  .get(authController.refresh)

authRouter.route('/api/auth/logout')
  .post(authController.logout)

module.exports = authRouter
