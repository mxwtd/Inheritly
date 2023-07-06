const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { server } = require('../../../index')
const Crypto = require('../../../models/InvestmentTypes/Crypto')
const User = require('../../../models/User')
const { api } = require('../../global_test_helper')
const {
  initialCryptos,
  getIdFromFirstCrypto,
  getAllCryptos
} = require('./cryptos_test_helper')
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
  await Crypto.deleteMany({})
  const cryptos = await initialCryptos()

  console.log('Cryptos to create: ', cryptos)

  // Create cryptos
  const cryptoPromises = cryptos.map((crypto) =>
    api
      .post('/api/cryptos')
      .set('Authorization', `bearer ${token}`)
      .send(crypto)
  )

  await Promise.all(cryptoPromises)
})

afterAll(async () => {
  await mongoose.connection.close()
  server.close()
})

describe('Get Cryptos', () => {
  test('get all Cryptos as a json', async () => {
    expect.assertions(0)

    await api
      .get('/api/cryptos')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('valid the specific first crypto name with the id', async () => {
    const { id } = await getIdFromFirstCrypto(token)

    const response = await api
      .get(`/api/cryptos/${id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.name).toContain('Crypto 1')
  })

  test('invalid without authorization', async () => {
    const { id } = await getIdFromFirstCrypto(token)

    await api
      .get(`/api/cryptos/${id}`)
      .expect(401)
  })

  test('not found id', async () => {
    await api
      .get('/api/cryptos/123456789')
      .set('Authorization', `bearer ${token}`)
      .expect(404)
  })
})

describe('Create Cryptos', () => {
  test('valid new crypto', async () => {
    expect.assertions(1)

    const newCrypto = {
      name: 'Crypto 3',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Crypto',

      symbol: 'XPR',
      quantity: 100,
      purchasePrice: 100,
      detail: 'Good crypto',
      purchasedAt: 'Robinhood',
      walletAddress: '123456789',

      photo: '',
      files: null,

      accountNumber: '123456789',
      email: 'test@email.com',
      phone: '123456789',
      companyAddress: '123 Main St'
    }

    await api
      .post('/api/cryptos')
      .set('Authorization', `bearer ${token}`)
      .send(newCrypto)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { body } = await getAllCryptos(token)
    expect(body).toHaveLength((await initialCryptos()).length + 1)
  })

  test('new crypto without obligatory fields', async () => {
    expect.assertions(1)

    const newCrypto = {
      name: 'Crypto 3',
      currency: 'USD',
      date: new Date(),
      value: 1000
    }

    await api
      .post('/api/cryptos')
      .set('Authorization', `bearer ${token}`)
      .send(newCrypto)
      .expect(422)

    const { body } = await getAllCryptos(token)
    expect(body).toHaveLength((await initialCryptos()).length)
  })
})

describe('Update Cryptos', () => {
  test('valid update crypto but just the name', async () => {
    expect.assertions(2)

    const { id } = await getIdFromFirstCrypto(token)

    const updates = {
      name: 'Crypto 1 change'
    }

    const response = await api
      .patch(`/api/cryptos/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(updates)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.name).toContain('Crypto 1 change')
    expect(response.body.currency).toContain('USD')
  })

  test('update crypto with 4 field', async () => {
    expect.assertions(3)

    const { id } = await getIdFromFirstCrypto(token)

    const newCrypto = {
      name: 'Crypto 1 change',
      currency: 'USD',
      date: new Date(),
      value: 2000
    }

    const response = await api
      .patch(`/api/cryptos/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newCrypto)
      .expect(200)

    expect(response.body.name).toContain('Crypto 1 change')
    expect(response.body.currency).toContain('USD')
    expect(response.body.value).toBe(2000)
  })

  test('update crypto with empty obligatory data', async () => {
    expect.assertions(0)

    const { id } = await getIdFromFirstCrypto(token)

    const newCrypto = {
      name: 'Crypto 1 change',
      currency: 'USD',
      date: new Date(),
      value: ''
    }

    await api
      .patch(`/api/cryptos/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newCrypto)
      .expect(400)
  })

  test('update crypto with invalid data', async () => {
    expect.assertions(0)

    const { id } = await getIdFromFirstCrypto(token)

    const newCrypto = {
      name: 'Crypto 1 change',
      currency: 'USD',
      date: new Date(),
      value: '      '
    }

    await api
      .patch(`/api/cryptos/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newCrypto)
      .expect(400)
  })

  test('update crypto without authorization', async () => {
    expect.assertions(0)
    const { id } = await getIdFromFirstCrypto(token)

    const newCrypto = {
      name: 'Crypto 1 change',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Crypto',

      city: 'city',
      country: 'Kenya',
      address: '123 St',
      zip: '1567'
    }

    await api
      .put(`/api/cryptos/${id}`)
      .send(newCrypto)
      .expect(401)
  })

  test('update crypto not found id', async () => {
    expect.assertions(0)

    const newCrypto = {
      name: 'Crypto 1 change',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Crypto',

      city: 'city',
      country: 'Kenya',
      address: '123 St',
      zip: '1567'
    }

    await api
      .put('/api/cryptos/12345')
      .set('Authorization', `bearer ${token}`)
      .send(newCrypto)
      .expect(404)
  })
})

describe('Delete Cryptos', () => {
  test('valid delete crypto', async () => {
    expect.assertions(1)

    const { id } = await getIdFromFirstCrypto(token)

    await api
      .delete(`/api/cryptos/${id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const { body } = await getAllCryptos(token)
    expect(body).toHaveLength((await initialCryptos()).length - 1)
  })

  test('delete crypto without authorization', async () => {
    expect.assertions(0)
    const { id } = await getIdFromFirstCrypto(token)

    await api
      .delete(`/api/cryptos/${id}`)
      .expect(401)
  })

  test('delete crypto not found id', async () => {
    expect.assertions(0)

    await api
      .delete('/api/cryptos/12345')
      .set('Authorization', `bearer ${token}`)
      .expect(404)
  })
})
