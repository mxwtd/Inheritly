const express = require('express')
const authController = require('../controllers/authorizations')
const authRouter = express.Router()

authRouter.post('/api/auth/login', authController.login)

authRouter.get('/api/auth/refresh', authController.refresh)

authRouter.post('/api/auth/logout', authController.logout)

module.exports = authRouter
