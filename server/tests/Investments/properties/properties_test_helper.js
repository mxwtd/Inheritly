const { api } = require('../../global_test_helper')
const User = require('../../../models/User')
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
  const response = await getAllProperties()
  const id = response.body[0].id

  return {
    id
  }
}

const getAllProperties = async () => {
  const user = await User.findOne({ username: 'root' })

  // Log in user
  const token = jwt.sign(
    {
      UserInfo: {
        id: user._id,
        email: user.email
      }
    }, process.env.ACCESS_TOKEN_KEY)

  const response = await api
    .get('/api/properties')
    .set('Authorization', `bearer ${token}`)
    .send({ userId: user._id }) // Pass the user ID in the request body

  return {
    body: response.body
  }
}

module.exports = {
  initialProperties,
  getIdFromFirstProperty,
  getAllProperties
}
