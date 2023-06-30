const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { server } = require('../../../index')
const Jewel = require('../../../models/InvestmentTypes/Jewel')
const User = require('../../../models/User')
const { api } = require('../../global_test_helper')
const {
  initialJewels,
  getIdFromFirstJewel,
  getAllJewels
} = require('./jewels_test_helper')
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
  await Jewel.deleteMany({})
  const jewels = await initialJewels()

  console.log('Jewels to create: ', jewels)

  // Create jewels
  const jewelPromises = jewels.map((jewel) =>
    api
      .post('/api/jewels')
      .set('Authorization', `bearer ${token}`)
      .send(jewel)
  )

  await Promise.all(jewelPromises)
})

afterAll(async () => {
  await mongoose.connection.close()
  server.close()
})

describe('Get Jewels', () => {
  test('get all Jewels as a json', async () => {
    expect.assertions(0)

    await api
      .get('/api/jewels')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('valid the specific first jewel name with the id', async () => {
    const { id } = await getIdFromFirstJewel(token)

    const response = await api
      .get(`/api/jewels/${id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.name).toContain('Jewel 1')
  })

  test('invalid without authorization', async () => {
    const { id } = await getIdFromFirstJewel(token)

    await api
      .get(`/api/jewels/${id}`)
      .expect(401)
  })

  test('not found id', async () => {
    await api
      .get('/api/jewels/123456789')
      .set('Authorization', `bearer ${token}`)
      .expect(404)
  })
})

describe('Create Jewels', () => {
  test('valid new jewel', async () => {
    expect.assertions(1)

    const newJewel = {
      name: 'Jewel 3',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Jewel',

      description: 'Necklace',
      history: 'Gold',
      condition: 'bad state',

      photo: '',
      files: null,

      accountNumber: '123456789',
      email: 'test@email.com',
      phone: '123456789',
      companyAddress: '123 Main St'
    }

    await api
      .post('/api/jewels')
      .set('Authorization', `bearer ${token}`)
      .send(newJewel)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { body } = await getAllJewels(token)
    expect(body).toHaveLength((await initialJewels()).length + 1)
  })

  test('new jewel without obligatory fields', async () => {
    expect.assertions(1)

    const newJewel = {
      name: 'Jewel 3',
      currency: 'USD',
      date: new Date(),
      value: 1000
    }

    await api
      .post('/api/jewels')
      .set('Authorization', `bearer ${token}`)
      .send(newJewel)
      .expect(422)

    const { body } = await getAllJewels(token)
    expect(body).toHaveLength((await initialJewels()).length)
  })
})

describe('Update Jewels', () => {
  test('valid update jewel but just the name', async () => {
    expect.assertions(2)

    const { id } = await getIdFromFirstJewel(token)

    const updates = {
      name: 'Jewel 1 change'
    }

    const response = await api
      .patch(`/api/jewels/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(updates)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.name).toContain('Jewel 1 change')
    expect(response.body.currency).toContain('USD')
  })

  test('update jewel with 4 field', async () => {
    expect.assertions(3)

    const { id } = await getIdFromFirstJewel(token)

    const newJewel = {
      name: 'Jewel 1 change',
      currency: 'USD',
      date: new Date(),
      value: 2000
    }

    const response = await api
      .patch(`/api/jewels/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newJewel)
      .expect(200)

    expect(response.body.name).toContain('Jewel 1 change')
    expect(response.body.currency).toContain('USD')
    expect(response.body.value).toBe(2000)
  })

  test('update jewel with empty obligatory data', async () => {
    expect.assertions(0)

    const { id } = await getIdFromFirstJewel(token)

    const newJewel = {
      name: 'Jewel 1 change',
      currency: 'USD',
      date: new Date(),
      value: ''
    }

    await api
      .patch(`/api/jewels/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newJewel)
      .expect(400)
  })

  test('update jewel with invalid data', async () => {
    expect.assertions(0)

    const { id } = await getIdFromFirstJewel(token)

    const newJewel = {
      name: 'Jewel 1 change',
      currency: 'USD',
      date: new Date(),
      value: '      '
    }

    await api
      .patch(`/api/jewels/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newJewel)
      .expect(400)
  })

  test('update jewel without authorization', async () => {
    expect.assertions(0)
    const { id } = await getIdFromFirstJewel(token)

    const newJewel = {
      name: 'Jewel 1 change',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Jewel',

      city: 'city',
      country: 'Kenya',
      address: '123 St',
      zip: '1567'
    }

    await api
      .put(`/api/jewels/${id}`)
      .send(newJewel)
      .expect(401)
  })

  test('update jewel not found id', async () => {
    expect.assertions(0)

    const newJewel = {
      name: 'Jewel 1 change',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Jewel',

      city: 'city',
      country: 'Kenya',
      address: '123 St',
      zip: '1567'
    }

    await api
      .put('/api/jewels/12345')
      .set('Authorization', `bearer ${token}`)
      .send(newJewel)
      .expect(404)
  })
})

describe('Delete Jewels', () => {
  test('valid delete jewel', async () => {
    expect.assertions(1)

    const { id } = await getIdFromFirstJewel(token)

    await api
      .delete(`/api/jewels/${id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const { body } = await getAllJewels(token)
    expect(body).toHaveLength((await initialJewels()).length - 1)
  })

  test('delete jewel without authorization', async () => {
    expect.assertions(0)
    const { id } = await getIdFromFirstJewel(token)

    await api
      .delete(`/api/jewels/${id}`)
      .expect(401)
  })

  test('delete jewel not found id', async () => {
    expect.assertions(0)

    await api
      .delete('/api/jewels/12345')
      .set('Authorization', `bearer ${token}`)
      .expect(404)
  })
})
