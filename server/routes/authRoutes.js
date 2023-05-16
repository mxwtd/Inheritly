const express = require('express')
const authController = require('../controllers/authController')
const router = express.Router()

router.route('/')
  .post()

router.route('/refresh')
  .get()

router.route('/logout')
  .post()

module.exports = router
