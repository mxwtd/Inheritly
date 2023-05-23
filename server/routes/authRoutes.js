const express = require('express')
const authController = require('../controllers/authorizations')
const authRouter = express.Router()

authRouter.post('/api/auth/login', authController.loginUser)

// router.route('/api/auth/refresh', authController.refresh)

module.exports = authRouter
