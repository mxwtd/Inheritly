const { api } = require('../../global_test_helper')
const User = require('../../../models/User')

const initialStocks = async () => {
  return [
    {
      name: 'Stock 1',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Stock',

      symbol: 'AAPL',
      quantity: 100,
      purchasePrice: 100,
      purchaseDate: new Date(),
      additionalDetails: 'Good stock',
      purchasedAt: 'Robinhood',

      photo: '',
      files: null,

      accountNumber: '123456789',
      email: 'test@email.com',
      phone: '123456789',
      companyAddress: '123 Main St'
    },
    {
      name: 'Stock 2',
      currency: 'GBP',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Stock',

      symbol: 'GOOG',
      quantity: 100,
      purchasePrice: 100,
      purchaseDate: new Date(),
      additionalDetails: 'Good stock',
      purchasedAt: 'Robinhood',

      photo: '',
      files: null,

      accountNumber: '123456789',
      email: 'test@email.com',
      phone: '123456789',
      companyAddress: '123 Main St'
    }
  ]
}

const getIdFromFirstStock = async (token) => {
  const response = await getAllStocks(token)

  const id = response.body[0].id

  return {
    id
  }
}

const getAllStocks = async (token) => {
  const user = await User.findOne({ username: 'root' })

  const response = await api
    .get('/api/stocks')
    .set('Authorization', `bearer ${token}`)
    .send({ userId: user._id }) // Pass the user ID in the request body

  return {
    body: response.body
  }
}

module.exports = {
  initialStocks,
  getIdFromFirstStock,
  getAllStocks
}
