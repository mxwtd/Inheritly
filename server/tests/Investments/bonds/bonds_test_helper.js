const { api } = require('../../global_test_helper')
const User = require('../../../models/User')

const initialBonds = async () => {
  return [
    {
      name: 'Bond 1',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Bond',

      issuer: 'Issuer 1',
      purchasePrice: 1000,
      purchaseDate: new Date(),
      additionalDetails: 'Additional details',
      purchasedAt: 'Purchased at',
      couponRate: 1000,

      photo: '',
      files: null,

      accountNumber: '123456789',
      email: 'test@email.com',
      phone: '123456789',
      companyAddress: '123 Main St'
    },
    {
      name: 'Bond 2',
      currency: 'GBP',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Bond',

      issuer: 'Issuer 2',
      purchasePrice: 1000,
      purchaseDate: new Date(),
      additionalDetails: 'Additional details',
      purchasedAt: 'Purchased at',
      couponRate: 1000,

      photo: '',
      files: null,

      accountNumber: '123456789',
      email: 'test@email.com',
      phone: '123456789',
      companyAddress: '123 Main St'
    }
  ]
}

const getIdFromFirstBond = async (token) => {
  const response = await getAllBonds(token)

  const id = response.body[0].id

  return {
    id
  }
}

const getAllBonds = async (token) => {
  const user = await User.findOne({ username: 'root' })

  const response = await api
    .get('/api/bonds')
    .set('Authorization', `bearer ${token}`)
    .send({ userId: user._id }) // Pass the user ID in the request body

  return {
    body: response.body
  }
}

module.exports = {
  initialBonds,
  getIdFromFirstBond,
  getAllBonds
}
