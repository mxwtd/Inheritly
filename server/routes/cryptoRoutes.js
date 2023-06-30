const express = require('express')
const cryptoRouter = express.Router()
const cryptosController = require('../controllers/cryptos')
const verifyJWT = require('../middleware/verifyJWT')

const { multer } = require('../middleware/googleCloud')

cryptoRouter.use(verifyJWT)

cryptoRouter.route('/api/cryptos')
  .get(cryptosController.getAllUserCryptos)
  .post(multer.fields([{ name: 'photo', maxCount: 1 }, { name: 'files', maxCount: 10 }]), cryptosController.createCrypto)

cryptoRouter.route('/api/cryptos/:id')
  .get(cryptosController.getCryptoById)
  .patch(multer.fields([{ name: 'photo', maxCount: 1 }, { name: 'files', maxCount: 10 }]), cryptosController.updateCrypto)
  .delete(cryptosController.deleteCrypto)

cryptoRouter.route('/api/cryptos/:id/:fileId')
  .delete(cryptosController.deleteFile)
  .patch(cryptosController.renameFile)

module.exports = cryptoRouter
