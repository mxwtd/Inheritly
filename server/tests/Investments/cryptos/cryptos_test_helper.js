const { api } = require('../../global_test_helper')
const User = require('../../../models/User')

const initialCryptos = async () => {
  return [
    {
      name: 'Crypto 1',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Crypto',

      symbol: 'RPL',
      quantity: 100,
      purchasePrice: 100,
      purchaseDate: new Date(),
      additionalDetails: 'Good crypto',
      purchasedAt: 'Robinhood',
      walletAddress: '123456789',

      photo: '',
      files: null,

      accountNumber: '123456789',
      email: 'test@email.com',
      phone: '123456789',
      companyAddress: '123 Main St'
    },
    {
      name: 'Crypto 2',
      currency: 'GBP',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Crypto',

      symbol: 'ADA',
      quantity: 100,
      purchasePrice: 100,
      purchaseDate: new Date(),
      additionalDetails: 'Good crypto',
      purchasedAt: 'Robinhood',
      walletAddress: '123456789',

      photo: '',
      files: null,

      accountNumber: '123456789',
      email: 'test@email.com',
      phone: '123456789',
      companyAddress: '123 Main St'
    }
  ]
}

const getIdFromFirstCrypto = async (token) => {
  const response = await getAllCryptos(token)

  const id = response.body[0].id

  return {
    id
  }
}

const getAllCryptos = async (token) => {
  const user = await User.findOne({ username: 'root' })

  const response = await api
    .get('/api/cryptos')
    .set('Authorization', `bearer ${token}`)
    .send({ userId: user._id }) // Pass the user ID in the request body

  return {
    body: response.body
  }
}

module.exports = {
  initialCryptos,
  getIdFromFirstCrypto,
  getAllCryptos
}
