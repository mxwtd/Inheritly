const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { server } = require('../../../index')
const Stock = require('../../../models/InvestmentTypes/Stock')
const User = require('../../../models/User')
const { api } = require('../../global_test_helper')
const {
  initialStocks,
  getIdFromFirstStock,
  getAllStocks
} = require('./stocks_test_helper')
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
  await Stock.deleteMany({})
  const stocks = await initialStocks()

  console.log('Stocks to create: ', stocks)

  // Create stocks
  const stockPromises = stocks.map((stock) =>
    api
      .post('/api/stocks')
      .set('Authorization', `bearer ${token}`)
      .send(stock)
  )

  await Promise.all(stockPromises)
})

afterAll(async () => {
  await mongoose.connection.close()
  server.close()
})

describe('Get Stocks', () => {
  test('get all Stocks as a json', async () => {
    expect.assertions(0)

    await api
      .get('/api/stocks')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('valid the specific first stock name with the id', async () => {
    const { id } = await getIdFromFirstStock(token)

    const response = await api
      .get(`/api/stocks/${id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.name).toContain('Stock 1')
  })

  test('invalid without authorization', async () => {
    const { id } = await getIdFromFirstStock(token)

    await api
      .get(`/api/stocks/${id}`)
      .expect(401)
  })

  test('not found id', async () => {
    await api
      .get('/api/stocks/123456789')
      .set('Authorization', `bearer ${token}`)
      .expect(404)
  })
})

describe('Create Stocks', () => {
  test('valid new stock', async () => {
    expect.assertions(1)

    const newStock = {
      name: 'Stock 3',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Stock',

      symbol: 'AAPL',
      quantity: 100,
      purchasePrice: 100,
      purchaseDate: new Date(),
      additionalDetails: 'Good stock',
      purchasedAt: 'Robinhood',

      photo: '',
      files: null,

      accountNumber: '123456789',
      email: 'test@email.com',
      phone: '123456789',
      companyAddress: '123 Main St'
    }

    await api
      .post('/api/stocks')
      .set('Authorization', `bearer ${token}`)
      .send(newStock)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { body } = await getAllStocks(token)
    expect(body).toHaveLength((await initialStocks()).length + 1)
  })

  test('new stock without obligatory fields', async () => {
    expect.assertions(1)

    const newStock = {
      name: 'Stock 3',
      currency: 'USD',
      date: new Date(),
      value: 1000
    }

    await api
      .post('/api/stocks')
      .set('Authorization', `bearer ${token}`)
      .send(newStock)
      .expect(422)

    const { body } = await getAllStocks(token)
    expect(body).toHaveLength((await initialStocks()).length)
  })
})

describe('Update Stocks', () => {
  test('valid update stock but just the name', async () => {
    expect.assertions(2)

    const { id } = await getIdFromFirstStock(token)

    const updates = {
      name: 'Stock 1 change'
    }

    const response = await api
      .patch(`/api/stocks/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(updates)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    console.log('Response: ', response.body)

    expect(response.body.name).toContain('Stock 1 change')
    expect(response.body.currency).toContain('USD')
  })

  test('update stock with 4 field', async () => {
    expect.assertions(3)

    const { id } = await getIdFromFirstStock(token)

    const newStock = {
      name: 'Stock 1 change',
      currency: 'USD',
      date: new Date(),
      value: 2000
    }

    const response = await api
      .patch(`/api/stocks/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newStock)
      .expect(200)

    expect(response.body.name).toContain('Stock 1 change')
    expect(response.body.currency).toContain('USD')
    expect(response.body.value).toBe(2000)
  })

  test('update stock with empty obligatory data', async () => {
    expect.assertions(0)

    const { id } = await getIdFromFirstStock(token)

    const newStock = {
      name: 'Stock 1 change',
      currency: 'USD',
      date: new Date(),
      value: ''
    }

    await api
      .patch(`/api/stocks/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newStock)
      .expect(400)
  })

  test('update stock with invalid data', async () => {
    expect.assertions(0)

    const { id } = await getIdFromFirstStock(token)

    const newStock = {
      name: 'Stock 1 change',
      currency: 'USD',
      date: new Date(),
      value: '      '
    }

    await api
      .patch(`/api/stocks/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newStock)
      .expect(400)
  })

  test('update stock without authorization', async () => {
    expect.assertions(0)
    const { id } = await getIdFromFirstStock(token)

    const newStock = {
      name: 'Stock 1 change',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Stock',

      city: 'city',
      country: 'Kenya',
      address: '123 St',
      zip: '1567'
    }

    await api
      .put(`/api/stocks/${id}`)
      .send(newStock)
      .expect(401)
  })

  test('update stock not found id', async () => {
    expect.assertions(0)

    const newStock = {
      name: 'Stock 1 change',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Stock',

      city: 'city',
      country: 'Kenya',
      address: '123 St',
      zip: '1567'
    }

    await api
      .put('/api/stocks/12345')
      .set('Authorization', `bearer ${token}`)
      .send(newStock)
      .expect(404)
  })
})

describe('Delete Stocks', () => {
  test('valid delete stock', async () => {
    expect.assertions(1)

    const { id } = await getIdFromFirstStock(token)

    await api
      .delete(`/api/stocks/${id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const { body } = await getAllStocks(token)
    expect(body).toHaveLength((await initialStocks()).length - 1)
  })

  test('delete stock without authorization', async () => {
    expect.assertions(0)
    const { id } = await getIdFromFirstStock(token)

    await api
      .delete(`/api/stocks/${id}`)
      .expect(401)
  })

  test('delete stock not found id', async () => {
    expect.assertions(0)

    await api
      .delete('/api/stocks/12345')
      .set('Authorization', `bearer ${token}`)
      .expect(404)
  })
})
