const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { server } = require('../../index')
const Vehicle = require('../../models/InvestmentTypes/Vehicle')
const User = require('../../models/User')
const { api } = require('../global_test_helper')
const {
  initialVehicles,
  getIdFromFirstVehicle,
  getAllVehicles
} = require('./vehicles_test_helper')
const { createUser } = require('../Investments/investments_test_helper')

let token

const generateToken = async () => {
  const user = await User.findOne({ username: 'root' })

  const userForToken = {
    id: user._id,
    email: user.email
  }

  return jwt.sign({ UserInfo: userForToken }, process.env.ACCESS_TOKEN_KEY)
}

beforeAll(async () => {
  await User.deleteMany({})
  await createUser()
  token = await generateToken()
}, 100000)

beforeEach(async () => {
  await Vehicle.deleteMany({})
  const vehicles = await initialVehicles()

  // Create vehicles
  const vehiclePromises = vehicles.map((vehicle) =>
    api
      .post('/api/vehicles')
      .set('Authorization', `bearer ${token}`)
      .send(vehicle)
  )
  await Promise.all(vehiclePromises)
})

afterAll(async () => {
  await mongoose.connection.close()
  server.close()
})

describe('Get Vehicles', () => {
  test('get all Vehicles as a json', async () => {
    expect.assertions(0)

    await api
      .get('/api/vehicles')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('valid the specific first vehicle name with the id', async () => {
    const { id } = await getIdFromFirstVehicle()

    const response = await api
      .get(`/api/vehicles/${id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.name).toContain('Vehicle 1')
  })

  test('invalid without authorization', async () => {
    const { id } = await getIdFromFirstVehicle()

    await api
      .get(`/api/vehicles/${id}`)
      .expect(401)
  })

  test('not found id', async () => {
    await api
      .get('/api/vehicles/123456789')
      .set('Authorization', `bearer ${token}`)
      .expect(404)
  })
})

describe('Create Vehicles', () => {
  test('valid new vehicle', async () => {
    expect.assertions(1)

    const newVehicle = {
      name: 'Vehicle 3',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Vehicle',

      city: 'city',
      country: 'Kenya',
      address: '123 St',
      zip: '1567'
    }

    await api
      .post('/api/vehicles')
      .set('Authorization', `bearer ${token}`)
      .send(newVehicle)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { body } = await getAllVehicles()
    expect(body).toHaveLength((await initialVehicles()).length + 1)
  })

  test('new vehicle without obligatory fields', async () => {
    expect.assertions(1)

    const newVehicle = {
      name: 'Vehicle 3',
      currency: 'USD',
      date: new Date(),
      value: 1000
    }

    await api
      .post('/api/vehicles')
      .set('Authorization', `bearer ${token}`)
      .send(newVehicle)
      .expect(422)

    const { body } = await getAllVehicles()
    expect(body).toHaveLength((await initialVehicles()).length)
  })
})

describe('Update Vehicles', () => {
  test('valid update vehicle but just the name', async () => {
    expect.assertions(2)

    const { id } = await getIdFromFirstVehicle()

    const updates = {
      name: 'Vehicle 1 change'
    }

    const response = await api
      .patch(`/api/vehicles/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(updates)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.name).toContain('Vehicle 1 change')
    expect(response.body.currency).toContain('USD')
  })

  test('update vehicle with 4 field', async () => {
    expect.assertions(3)

    const { id } = await getIdFromFirstVehicle()

    const newVehicle = {
      name: 'Vehicle 1 change',
      currency: 'USD',
      date: new Date(),
      value: 2000
    }

    const response = await api
      .patch(`/api/vehicles/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newVehicle)
      .expect(200)

    expect(response.body.name).toContain('Vehicle 1 change')
    expect(response.body.currency).toContain('USD')
    expect(response.body.value).toBe(2000)
  })

  test('update vehicle with empty obligatory data', async () => {
    expect.assertions(0)

    const { id } = await getIdFromFirstVehicle()

    const newVehicle = {
      name: 'Vehicle 1 change',
      currency: 'USD',
      date: new Date(),
      value: ''
    }

    await api
      .patch(`/api/vehicles/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newVehicle)
      .expect(400)
  })

  test('update vehicle with invalid data', async () => {
    expect.assertions(0)

    const { id } = await getIdFromFirstVehicle()

    const newVehicle = {
      name: 'Vehicle 1 change',
      currency: 'USD',
      date: new Date(),
      value: '      '
    }

    await api
      .patch(`/api/vehicles/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newVehicle)
      .expect(400)
  })

  test('update vehicle without authorization', async () => {
    expect.assertions(0)
    const { id } = await getIdFromFirstVehicle()

    const newVehicle = {
      name: 'Vehicle 1 change',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Vehicle',

      city: 'city',
      country: 'Kenya',
      address: '123 St',
      zip: '1567'
    }

    await api
      .put(`/api/vehicles/${id}`)
      .send(newVehicle)
      .expect(401)
  })

  test('update vehicle not found id', async () => {
    expect.assertions(0)

    const newVehicle = {
      name: 'Vehicle 1 change',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Vehicle',

      city: 'city',
      country: 'Kenya',
      address: '123 St',
      zip: '1567'
    }

    await api
      .put('/api/vehicles/12345')
      .set('Authorization', `bearer ${token}`)
      .send(newVehicle)
      .expect(404)
  })
})

describe('Delete Vehicles', () => {
  test('valid delete vehicle', async () => {
    expect.assertions(1)

    const { id } = await getIdFromFirstVehicle()

    await api
      .delete(`/api/vehicles/${id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const { body } = await getAllVehicles()
    expect(body).toHaveLength((await initialVehicles()).length - 1)
  })

  test('delete vehicle without authorization', async () => {
    expect.assertions(0)
    const { id } = await getIdFromFirstVehicle()

    await api
      .delete(`/api/vehicles/${id}`)
      .expect(401)
  })

  test('delete vehicle not found id', async () => {
    expect.assertions(0)

    await api
      .delete('/api/vehicles/12345')
      .set('Authorization', `bearer ${token}`)
      .expect(404)
  })
})
