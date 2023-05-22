const { api } = require('../global_test_helper')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')

const initialProperties = async () => {
  return [
    {
      name: 'Property 1',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Property',

      city: 'New York',
      country: 'USA',
      address: '123 Main St',
      zip: '12345'
    },
    {
      name: 'Property 2',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Property',

      city: 'Medellin',
      country: 'Colombia',
      address: 'diagonal 75c',
      zip: '12345'
    }
  ]
}

const getIdFromFirstProperty = async () => {
  const response = await api.get('/api/properties')
  const id = response.body.map(r => r.id)[0]

  return {
    response,
    id
  }
}

const getAllProperties = async () => {
  const user = await User.findOne({ username: 'root' })

  const userForToken = {
    id: user._id,
    username: user.username
  }

  console.log('This is the user id:', user._id)

  // login user
  const token = jwt.sign(userForToken, process.env.SECRET_KEY)

  const response = await api
    .get('/api/properties')
    .set('Authorization', `bearer ${token}`)
    .query({ id: user._id })

  return {
    body: response.body
  }
}

module.exports = {
  initialProperties,
  getIdFromFirstProperty,
  getAllProperties
}
