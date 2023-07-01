const express = require('express')
const bondRouter = express.Router()
const bondsController = require('../controllers/bonds')
const verifyJWT = require('../middleware/verifyJWT')

const { multer } = require('../middleware/googleCloud')

bondRouter.use(verifyJWT)

bondRouter.route('/api/bonds')
  .get(bondsController.getAllUserBonds)
  .post(multer.fields([{ name: 'photo', maxCount: 1 }, { name: 'files', maxCount: 10 }]), bondsController.createBond)

bondRouter.route('/api/bonds/:id')
  .get(bondsController.getBondById)
  .patch(multer.fields([{ name: 'photo', maxCount: 1 }, { name: 'files', maxCount: 10 }]), bondsController.updateBond)
  .delete(bondsController.deleteBond)

bondRouter.route('/api/bonds/:id/:fileId')
  .delete(bondsController.deleteFile)
  .patch(bondsController.renameFile)

module.exports = bondRouter
