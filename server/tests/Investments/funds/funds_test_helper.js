const { api } = require('../../global_test_helper')
const User = require('../../../models/User')

const initialFunds = async () => {
  return [
    {
      name: 'Fund 1',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Fund',

      description: 'Description',

      photo: '',
      files: null,

      accountNumber: '123456789',
      email: 'test@email.com',
      phone: '123456789',
      companyAddress: '123 Main St'
    },
    {
      name: 'Fund 2',
      currency: 'GBP',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Fund',

      description: 'Description',

      photo: '',
      files: null,

      accountNumber: '123456789',
      email: 'test@email.com',
      phone: '123456789',
      companyAddress: '123 Main St'
    }
  ]
}

const getIdFromFirstFund = async (token) => {
  const response = await getAllFunds(token)

  const id = response.body[0].id

  return {
    id
  }
}

const getAllFunds = async (token) => {
  const user = await User.findOne({ username: 'root' })

  const response = await api
    .get('/api/funds')
    .set('Authorization', `bearer ${token}`)
    .send({ userId: user._id }) // Pass the user ID in the request body

  return {
    body: response.body
  }
}

module.exports = {
  initialFunds,
  getIdFromFirstFund,
  getAllFunds
}
