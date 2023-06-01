const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { server } = require('../../index')
const Property = require('../../models/InvestmentTypes/Property')
const User = require('../../models/User')
const { api } = require('../global_test_helper')

const {
  initialProperties,
  getIdFromFirstProperty,
  getAllProperties
} = require('./properties_test_helper')
const { createUser } = require('../Investments/investments_test_helper')

let counter = 0

const generateToken = async () => {
  const user = await User.findOne({ username: 'root' })

  const userForToken = {
    id: user._id,
    email: user.email
  }

  // login user
  const token = jwt.sign({
    UserInfo: userForToken
  }, process.env.ACCESS_TOKEN_KEY)

  return { token }
}

beforeAll(async () => {
  await User.deleteMany({})

  await createUser()
})

beforeEach(async () => {
  counter += 1
  console.log(`Test ${counter}`)

  await Property.deleteMany({})
  const properties = await initialProperties()

  const { token } = await generateToken()

  // sequential
  for (const property of properties) {
    const newProperty = property
    await api
      .post('/api/properties')
      .set('Authorization', `bearer ${token}`)
      .send(newProperty)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  }
})

describe('Get Properties', () => {
  test('get all Properties as a json', async () => {
    expect.assertions(0)
    const { token } = await generateToken()

    await api
      .get('/api/properties')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('valid the specific first property name with the id', async () => {
    const { id } = await getIdFromFirstProperty()
    const { token } = await generateToken()

    const response = await api
      .get(`/api/properties/${id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.name).toContain('Property 1')
  })

  test('invalid without authorization', async () => {
    const { id } = await getIdFromFirstProperty()

    await api
      .get(`/api/properties/${id}`)
      .expect(401)
  })

  test('not found id', async () => {
    const { token } = await generateToken()

    await api
      .get('/api/properties/123456789')
      .set('Authorization', `bearer ${token}`)
      .expect(404)
  })
})

describe('Create Properties', () => {
  test('valid new property', async () => {
    expect.assertions(1)
    const { token } = await generateToken()

    const newProperty = {
      name: 'Property 3',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Property',

      city: 'city',
      country: 'Kenya',
      address: '123 St',
      zip: '1567'
    }

    await api
      .post('/api/properties')
      .set('Authorization', `bearer ${token}`)
      .send(newProperty)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { body } = await getAllProperties()
    expect(body).toHaveLength((await initialProperties()).length + 1)
  })

  test('new property without obligatory fields', async () => {
    expect.assertions(1)
    const { token } = await generateToken()

    const newProperty = {
      name: 'Property 3',
      currency: 'USD',
      date: new Date(),
      value: 1000
    }

    await api
      .post('/api/properties')
      .set('Authorization', `bearer ${token}`)
      .send(newProperty)
      .expect(422)

    const { body } = await getAllProperties()
    expect(body).toHaveLength((await initialProperties()).length)
  })
})

describe('Update Properties', () => {
  test('valid update property', async () => {
    expect.assertions(1)
    const { token } = await generateToken()

    const { id } = await getIdFromFirstProperty()

    const newProperty = {
      name: 'Property 1 change',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Property',

      city: 'city',
      country: 'Kenya',
      address: '123 St',
      zip: '1567'
    }

    const response = await api
      .patch(`/api/properties/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newProperty)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.name).toContain('Property 1 change')
  })

  test('update property without obligatory fields', async () => {
    expect.assertions(0)
    const { token } = await generateToken()

    const { id } = await getIdFromFirstProperty()

    const newProperty = {
      name: 'Property 1 change',
      currency: 'USD',
      date: new Date(),
      value: 1000
    }

    await api
      .patch(`/api/properties/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newProperty)
      .expect(422)
  })

  test('update property without authorization', async () => {
    expect.assertions(0)
    const { id } = await getIdFromFirstProperty()

    const newProperty = {
      name: 'Property 1 change',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Property',

      city: 'city',
      country: 'Kenya',
      address: '123 St',
      zip: '1567'
    }

    await api
      .put(`/api/properties/${id}`)
      .send(newProperty)
      .expect(401)
  })

  test('update property not found id', async () => {
    expect.assertions(0)
    const { token } = await generateToken()

    const newProperty = {
      name: 'Property 1 change',
      currency: 'USD',
      date: new Date(),
      value: 1000,
      TaxStatus: 'Taxable',
      type: 'Property',

      city: 'city',
      country: 'Kenya',
      address: '123 St',
      zip: '1567'
    }

    await api
      .put('/api/properties/12345')
      .set('Authorization', `bearer ${token}`)
      .send(newProperty)
      .expect(404)
  })
})

describe('Delete Properties', () => {
  test('valid delete property', async () => {
    expect.assertions(1)
    const { token } = await generateToken()

    const { id } = await getIdFromFirstProperty()

    await api
      .delete(`/api/properties/${id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const { body } = await getAllProperties()
    expect(body).toHaveLength((await initialProperties()).length - 1)
  })

  test('delete property without authorization', async () => {
    expect.assertions(0)
    const { id } = await getIdFromFirstProperty()

    await api
      .delete(`/api/properties/${id}`)
      .expect(401)
  })

  test('delete property not found id', async () => {
    expect.assertions(0)
    const { token } = await generateToken()

    await api
      .delete('/api/properties/12345')
      .set('Authorization', `bearer ${token}`)
      .expect(404)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
