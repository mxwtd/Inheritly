const { api } = require('../../global_test_helper')
const User = require('../../../models/User')

const initialJewels = async () => {
  return [
    {
      name: 'Jewel 1',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Jewel',

      description: 'Necklace',
      history: 'Gold',
      condition: 'good state',

      photo: '',
      files: null,

      accountNumber: '123456789',
      email: 'test@email.com',
      phone: '123456789',
      companyAddress: '123 Main St'
    },
    {
      name: 'Jewel 2',
      currency: 'GBP',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Jewel',

      description: 'Ring',
      history: 'Silver',
      condition: 'good state',

      photo: '',
      files: null,

      accountNumber: '123456789',
      email: 'test@email.com',
      phone: '123456789',
      companyAddress: '123 Main St'
    }
  ]
}

const getIdFromFirstJewel = async (token) => {
  const response = await getAllJewels(token)

  const id = response.body[0].id

  return {
    id
  }
}

const getAllJewels = async (token) => {
  const user = await User.findOne({ username: 'root' })

  const response = await api
    .get('/api/jewels')
    .set('Authorization', `bearer ${token}`)
    .send({ userId: user._id }) // Pass the user ID in the request body

  return {
    body: response.body
  }
}

module.exports = {
  initialJewels,
  getIdFromFirstJewel,
  getAllJewels
}
