const { api } = require('../../global_test_helper')
const User = require('../../../models/User')

const initialCommodities = async () => {
  return [
    {
      name: 'Commodity 1',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Commodity',

      quantity: 1000,
      unit: 'Unit',
      location: 'Location',
      additionalDetails: 'Additional details',

      photo: '',
      files: null,

      accountNumber: '123456789',
      email: 'test@email.com',
      phone: '123456789',
      companyAddress: '123 Main St'
    },
    {
      name: 'Commodity 2',
      currency: 'GBP',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Commodity',

      quantity: 1000,
      unit: 'Unit',
      location: 'Location',
      additionalDetails: 'Additional details',

      photo: '',
      files: null,

      accountNumber: '123456789',
      email: 'test@email.com',
      phone: '123456789',
      companyAddress: '123 Main St'
    }
  ]
}

const getIdFromFirstCommodity = async (token) => {
  const response = await getAllCommodities(token)

  const id = response.body[0].id

  return {
    id
  }
}

const getAllCommodities = async (token) => {
  const user = await User.findOne({ username: 'root' })

  const response = await api
    .get('/api/commodities')
    .set('Authorization', `bearer ${token}`)
    .send({ userId: user._id }) // Pass the user ID in the request body

  return {
    body: response.body
  }
}

module.exports = {
  initialCommodities,
  getIdFromFirstCommodity,
  getAllCommodities
}
