const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/users')

// Create a new user
userRouter.post('/api/users', userController.createUser)

// Get all users
userRouter.get('/api/users', userController.getAllUsers)

// Get a specific user by ID
userRouter.get('/api/users/:id', userController.getUserById)

// Update a user
userRouter.put('/api/users/:id', userController.updateUser)

// Delete a user
userRouter.delete('/api/users/:id', userController.deleteUser)

module.exports = userRouter
