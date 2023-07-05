const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { server } = require('../../../index')
const Commodity = require('../../../models/InvestmentTypes/Commodity')
const User = require('../../../models/User')
const { api } = require('../../global_test_helper')
const {
  initialCommodities,
  getIdFromFirstCommodity,
  getAllCommodities
} = require('./commodities_test_helper')
const { createUser } = require('../../Investments/investments_test_helper')

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
  await Commodity.deleteMany({})
  const commodities = await initialCommodities()

  console.log('Commodities to create: ', commodities)

  // Create commodities
  const commodityPromises = commodities.map((commodity) =>
    api
      .post('/api/commodities')
      .set('Authorization', `bearer ${token}`)
      .send(commodity)
  )

  await Promise.all(commodityPromises)
})

afterAll(async () => {
  await mongoose.connection.close()
  server.close()
})

describe('Get Commodities', () => {
  test('get all Commodities as a json', async () => {
    expect.assertions(0)

    await api
      .get('/api/commodities')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('valid the specific first commodity name with the id', async () => {
    const { id } = await getIdFromFirstCommodity(token)

    const response = await api
      .get(`/api/commodities/${id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.name).toContain('Commodity 1')
  })

  test('invalid without authorization', async () => {
    const { id } = await getIdFromFirstCommodity(token)

    await api
      .get(`/api/commodities/${id}`)
      .expect(401)
  })

  test('not found id', async () => {
    await api
      .get('/api/commodities/123456789')
      .set('Authorization', `bearer ${token}`)
      .expect(404)
  })
})

describe('Create Commodities', () => {
  test('valid new commodity', async () => {
    expect.assertions(1)

    const newCommodity = {
      name: 'Commodity 3',
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
    }

    await api
      .post('/api/commodities')
      .set('Authorization', `bearer ${token}`)
      .send(newCommodity)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { body } = await getAllCommodities(token)
    expect(body).toHaveLength((await initialCommodities()).length + 1)
  })

  test('new commodity without obligatory fields', async () => {
    expect.assertions(1)

    const newCommodity = {
      name: 'Commodity 3',
      currency: 'USD',
      date: new Date(),
      value: 1000
    }

    await api
      .post('/api/commodities')
      .set('Authorization', `bearer ${token}`)
      .send(newCommodity)
      .expect(422)

    const { body } = await getAllCommodities(token)
    expect(body).toHaveLength((await initialCommodities()).length)
  })
})

describe('Update Commodities', () => {
  test('valid update commodity but just the name', async () => {
    expect.assertions(2)

    const { id } = await getIdFromFirstCommodity(token)

    const updates = {
      name: 'Commodity 1 change'
    }

    const response = await api
      .patch(`/api/commodities/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(updates)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.name).toContain('Commodity 1 change')
    expect(response.body.currency).toContain('USD')
  })

  test('update commodity with 4 field', async () => {
    expect.assertions(3)

    const { id } = await getIdFromFirstCommodity(token)

    const newCommodity = {
      name: 'Commodity 1 change',
      currency: 'USD',
      date: new Date(),
      value: 2000
    }

    const response = await api
      .patch(`/api/commodities/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newCommodity)
      .expect(200)

    expect(response.body.name).toContain('Commodity 1 change')
    expect(response.body.currency).toContain('USD')
    expect(response.body.value).toBe(2000)
  })

  test('update commodity with empty obligatory data', async () => {
    expect.assertions(0)

    const { id } = await getIdFromFirstCommodity(token)

    const newCommodity = {
      name: 'Commodity 1 change',
      currency: 'USD',
      date: new Date(),
      value: ''
    }

    await api
      .patch(`/api/commodities/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newCommodity)
      .expect(400)
  })

  test('update commodity with invalid data', async () => {
    expect.assertions(0)

    const { id } = await getIdFromFirstCommodity(token)

    const newCommodity = {
      name: 'Commodity 1 change',
      currency: 'USD',
      date: new Date(),
      value: '      '
    }

    await api
      .patch(`/api/commodities/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newCommodity)
      .expect(400)
  })

  test('update commodity without authorization', async () => {
    expect.assertions(0)
    const { id } = await getIdFromFirstCommodity(token)

    const newCommodity = {
      name: 'Commodity 1 change',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Commodity',

      city: 'city',
      country: 'Kenya',
      address: '123 St',
      zip: '1567'
    }

    await api
      .put(`/api/commodities/${id}`)
      .send(newCommodity)
      .expect(401)
  })

  test('update commodity not found id', async () => {
    expect.assertions(0)

    const newCommodity = {
      name: 'Commodity 1 change',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Commodity',

      city: 'city',
      country: 'Kenya',
      address: '123 St',
      zip: '1567'
    }

    await api
      .put('/api/commodities/12345')
      .set('Authorization', `bearer ${token}`)
      .send(newCommodity)
      .expect(404)
  })
})

describe('Delete Commodities', () => {
  test('valid delete commodity', async () => {
    expect.assertions(1)

    const { id } = await getIdFromFirstCommodity(token)

    await api
      .delete(`/api/commodities/${id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const { body } = await getAllCommodities(token)
    expect(body).toHaveLength((await initialCommodities()).length - 1)
  })

  test('delete commodity without authorization', async () => {
    expect.assertions(0)
    const { id } = await getIdFromFirstCommodity(token)

    await api
      .delete(`/api/commodities/${id}`)
      .expect(401)
  })

  test('delete commodity not found id', async () => {
    expect.assertions(0)

    await api
      .delete('/api/commodities/12345')
      .set('Authorization', `bearer ${token}`)
      .expect(404)
  })
})
