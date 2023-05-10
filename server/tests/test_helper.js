const supertest = require('supertest')
const { app } = require('../index')
const User = require('../models/User')

const api = supertest(app)

const initialInvestments = [
  {
    name: 'Investment 1',
    currency: 'USD',
    date: new Date(),
    value: 1000,
    TaxStatus: 'Taxable',
    type: 'Property',
    details: {
      city: 'New York',
      country: 'USA',
      address: '123 Main St',
      zip: '12345'
    }
  },
  {
    name: 'Investment 2',
    currency: 'USD',
    date: new Date(),
    value: 2000,
    TaxStatus: 'Taxable',
    type: 'Vehicle',
    details: {
      brand: 'Tesla',
      model: 'Model 3',
      year: 2020
    }
  }
]

const getAllContentFromInvestments = async () => {
  const response = await api.get('/investments')
  const contents = response.body.map(r => r.content)
  return {
    response,
    contents
  }
}

const getUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map(user => user.toJSON())
}

module.exports = {
  api,
  initialInvestments,
  getAllContentFromInvestments,
  getUsers
}
