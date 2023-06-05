const { api } = require('../../global_test_helper')
const User = require('../../../models/User')

const initialVehicles = async () => {
  return [
    {
      name: 'Vehicle 1',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Vehicle',

      brand: 'Toyota',
      model: 'Corolla',
      year: '2010'
    },
    {
      name: 'Vehicle 2',
      currency: 'GBP',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Vehicle',

      brand: 'Mercedes',
      model: 'Benz',
      year: '2020'
    }
  ]
}

const getIdFromFirstVehicle = async (token) => {
  const response = await getAllVehicles(token)

  const id = response.body[0].id

  return {
    id
  }
}

const getAllVehicles = async (token) => {
  const user = await User.findOne({ username: 'root' })

  const response = await api
    .get('/api/vehicles')
    .set('Authorization', `bearer ${token}`)
    .send({ userId: user._id }) // Pass the user ID in the request body

  return {
    body: response.body
  }
}

module.exports = {
  initialVehicles,
  getIdFromFirstVehicle,
  getAllVehicles
}
