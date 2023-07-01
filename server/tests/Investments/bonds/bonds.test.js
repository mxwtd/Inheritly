const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { server } = require('../../../index')
const Bond = require('../../../models/InvestmentTypes/Bond')
const User = require('../../../models/User')
const { api } = require('../../global_test_helper')
const {
  initialBonds,
  getIdFromFirstBond,
  getAllBonds
} = require('./bonds_test_helper')
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
  await Bond.deleteMany({})
  const bonds = await initialBonds()

  console.log('Bonds to create: ', bonds)

  // Create bonds
  const bondPromises = bonds.map((bond) =>
    api
      .post('/api/bonds')
      .set('Authorization', `bearer ${token}`)
      .send(bond)
  )

  await Promise.all(bondPromises)
})

afterAll(async () => {
  await mongoose.connection.close()
  server.close()
})

describe('Get Bonds', () => {
  test('get all Bonds as a json', async () => {
    expect.assertions(0)

    await api
      .get('/api/bonds')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('valid the specific first bond name with the id', async () => {
    const { id } = await getIdFromFirstBond(token)

    const response = await api
      .get(`/api/bonds/${id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.name).toContain('Bond 1')
  })

  test('invalid without authorization', async () => {
    const { id } = await getIdFromFirstBond(token)

    await api
      .get(`/api/bonds/${id}`)
      .expect(401)
  })

  test('not found id', async () => {
    await api
      .get('/api/bonds/123456789')
      .set('Authorization', `bearer ${token}`)
      .expect(404)
  })
})

describe('Create Bonds', () => {
  test('valid new bond', async () => {
    expect.assertions(1)

    const newBond = {
      name: 'Bond 3',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Bond',

      issuer: 'Issuer 3',
      purchasePrice: 1000,
      purchaseDate: new Date(),
      additionalDetails: 'Additional details',
      purchasedAt: 'Purchased at',
      couponRate: 1000,

      photo: '',
      files: null,

      accountNumber: '123456789',
      email: 'test@email.com',
      phone: '123456789',
      companyAddress: '123 Main St'
    }

    await api
      .post('/api/bonds')
      .set('Authorization', `bearer ${token}`)
      .send(newBond)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { body } = await getAllBonds(token)
    expect(body).toHaveLength((await initialBonds()).length + 1)
  })

  test('new bond without obligatory fields', async () => {
    expect.assertions(1)

    const newBond = {
      name: 'Bond 3',
      currency: 'USD',
      date: new Date(),
      value: 1000
    }

    await api
      .post('/api/bonds')
      .set('Authorization', `bearer ${token}`)
      .send(newBond)
      .expect(422)

    const { body } = await getAllBonds(token)
    expect(body).toHaveLength((await initialBonds()).length)
  })
})

describe('Update Bonds', () => {
  test('valid update bond but just the name', async () => {
    expect.assertions(2)

    const { id } = await getIdFromFirstBond(token)

    const updates = {
      name: 'Bond 1 change'
    }

    const response = await api
      .patch(`/api/bonds/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(updates)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.name).toContain('Bond 1 change')
    expect(response.body.currency).toContain('USD')
  })

  test('update bond with 4 field', async () => {
    expect.assertions(3)

    const { id } = await getIdFromFirstBond(token)

    const newBond = {
      name: 'Bond 1 change',
      currency: 'USD',
      date: new Date(),
      value: 2000
    }

    const response = await api
      .patch(`/api/bonds/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newBond)
      .expect(200)

    expect(response.body.name).toContain('Bond 1 change')
    expect(response.body.currency).toContain('USD')
    expect(response.body.value).toBe(2000)
  })

  test('update bond with empty obligatory data', async () => {
    expect.assertions(0)

    const { id } = await getIdFromFirstBond(token)

    const newBond = {
      name: 'Bond 1 change',
      currency: 'USD',
      date: new Date(),
      value: ''
    }

    await api
      .patch(`/api/bonds/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newBond)
      .expect(400)
  })

  test('update bond with invalid data', async () => {
    expect.assertions(0)

    const { id } = await getIdFromFirstBond(token)

    const newBond = {
      name: 'Bond 1 change',
      currency: 'USD',
      date: new Date(),
      value: '      '
    }

    await api
      .patch(`/api/bonds/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newBond)
      .expect(400)
  })

  test('update bond without authorization', async () => {
    expect.assertions(0)
    const { id } = await getIdFromFirstBond(token)

    const newBond = {
      name: 'Bond 1 change',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Bond',

      city: 'city',
      country: 'Kenya',
      address: '123 St',
      zip: '1567'
    }

    await api
      .put(`/api/bonds/${id}`)
      .send(newBond)
      .expect(401)
  })

  test('update bond not found id', async () => {
    expect.assertions(0)

    const newBond = {
      name: 'Bond 1 change',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Bond',

      city: 'city',
      country: 'Kenya',
      address: '123 St',
      zip: '1567'
    }

    await api
      .put('/api/bonds/12345')
      .set('Authorization', `bearer ${token}`)
      .send(newBond)
      .expect(404)
  })
})

describe('Delete Bonds', () => {
  test('valid delete bond', async () => {
    expect.assertions(1)

    const { id } = await getIdFromFirstBond(token)

    await api
      .delete(`/api/bonds/${id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const { body } = await getAllBonds(token)
    expect(body).toHaveLength((await initialBonds()).length - 1)
  })

  test('delete bond without authorization', async () => {
    expect.assertions(0)
    const { id } = await getIdFromFirstBond(token)

    await api
      .delete(`/api/bonds/${id}`)
      .expect(401)
  })

  test('delete bond not found id', async () => {
    expect.assertions(0)

    await api
      .delete('/api/bonds/12345')
      .set('Authorization', `bearer ${token}`)
      .expect(404)
  })
})
