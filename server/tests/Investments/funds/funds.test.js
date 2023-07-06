const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { server } = require('../../../index')
const Fund = require('../../../models/InvestmentTypes/Fund')
const User = require('../../../models/User')
const { api } = require('../../global_test_helper')
const {
  initialFunds,
  getIdFromFirstFund,
  getAllFunds
} = require('./funds_test_helper')
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
  await Fund.deleteMany({})
  const funds = await initialFunds()

  console.log('Funds to create: ', funds)

  // Create funds
  const fundPromises = funds.map((fund) =>
    api
      .post('/api/funds')
      .set('Authorization', `bearer ${token}`)
      .send(fund)
  )

  await Promise.all(fundPromises)
})

afterAll(async () => {
  await mongoose.connection.close()
  server.close()
})

describe('Get Funds', () => {
  test('get all Funds as a json', async () => {
    expect.assertions(0)

    await api
      .get('/api/funds')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('valid the specific first fund name with the id', async () => {
    const { id } = await getIdFromFirstFund(token)

    const response = await api
      .get(`/api/funds/${id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.name).toContain('Fund 1')
  })

  test('invalid without authorization', async () => {
    const { id } = await getIdFromFirstFund(token)

    await api
      .get(`/api/funds/${id}`)
      .expect(401)
  })

  test('not found id', async () => {
    await api
      .get('/api/funds/123456789')
      .set('Authorization', `bearer ${token}`)
      .expect(404)
  })
})

describe('Create Funds', () => {
  test('valid new fund', async () => {
    expect.assertions(1)

    const newFund = {
      name: 'Fund 3',
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
    }

    await api
      .post('/api/funds')
      .set('Authorization', `bearer ${token}`)
      .send(newFund)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { body } = await getAllFunds(token)
    expect(body).toHaveLength((await initialFunds()).length + 1)
  })

  test('new fund without obligatory fields', async () => {
    expect.assertions(1)

    const newFund = {
      name: 'Fund 3',
      currency: 'USD',
      date: new Date(),
      value: 1000
    }

    await api
      .post('/api/funds')
      .set('Authorization', `bearer ${token}`)
      .send(newFund)
      .expect(422)

    const { body } = await getAllFunds(token)
    expect(body).toHaveLength((await initialFunds()).length)
  })
})

describe('Update Funds', () => {
  test('valid update fund but just the name', async () => {
    expect.assertions(2)

    const { id } = await getIdFromFirstFund(token)

    const updates = {
      name: 'Fund 1 change'
    }

    const response = await api
      .patch(`/api/funds/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(updates)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.name).toContain('Fund 1 change')
    expect(response.body.currency).toContain('USD')
  })

  test('update fund with 4 field', async () => {
    expect.assertions(3)

    const { id } = await getIdFromFirstFund(token)

    const newFund = {
      name: 'Fund 1 change',
      currency: 'USD',
      date: new Date(),
      value: 2000
    }

    const response = await api
      .patch(`/api/funds/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newFund)
      .expect(200)

    expect(response.body.name).toContain('Fund 1 change')
    expect(response.body.currency).toContain('USD')
    expect(response.body.value).toBe(2000)
  })

  test('update fund with empty obligatory data', async () => {
    expect.assertions(0)

    const { id } = await getIdFromFirstFund(token)

    const newFund = {
      name: 'Fund 1 change',
      currency: 'USD',
      date: new Date(),
      value: ''
    }

    await api
      .patch(`/api/funds/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newFund)
      .expect(400)
  })

  test('update fund with invalid data', async () => {
    expect.assertions(0)

    const { id } = await getIdFromFirstFund(token)

    const newFund = {
      name: 'Fund 1 change',
      currency: 'USD',
      date: new Date(),
      value: '      '
    }

    await api
      .patch(`/api/funds/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newFund)
      .expect(400)
  })

  test('update fund without authorization', async () => {
    expect.assertions(0)
    const { id } = await getIdFromFirstFund(token)

    const newFund = {
      name: 'Fund 1 change',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Fund',

      city: 'city',
      country: 'Kenya',
      address: '123 St',
      zip: '1567'
    }

    await api
      .put(`/api/funds/${id}`)
      .send(newFund)
      .expect(401)
  })

  test('update fund not found id', async () => {
    expect.assertions(0)

    const newFund = {
      name: 'Fund 1 change',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Fund',

      city: 'city',
      country: 'Kenya',
      address: '123 St',
      zip: '1567'
    }

    await api
      .put('/api/funds/12345')
      .set('Authorization', `bearer ${token}`)
      .send(newFund)
      .expect(404)
  })
})

describe('Delete Funds', () => {
  test('valid delete fund', async () => {
    expect.assertions(1)

    const { id } = await getIdFromFirstFund(token)

    await api
      .delete(`/api/funds/${id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const { body } = await getAllFunds(token)
    expect(body).toHaveLength((await initialFunds()).length - 1)
  })

  test('delete fund without authorization', async () => {
    expect.assertions(0)
    const { id } = await getIdFromFirstFund(token)

    await api
      .delete(`/api/funds/${id}`)
      .expect(401)
  })

  test('delete fund not found id', async () => {
    expect.assertions(0)

    await api
      .delete('/api/funds/12345')
      .set('Authorization', `bearer ${token}`)
      .expect(404)
  })
})
