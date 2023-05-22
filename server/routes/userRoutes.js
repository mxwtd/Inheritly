const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/users')

userRouter.route('/api/users')
  .get(userController.getAllUsers)
  .post(userController.createUser)

userRouter.route('/api/users/:id')
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser)

module.exports = userRouter
