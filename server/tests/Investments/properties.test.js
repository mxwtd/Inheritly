const mongoose = require('mongoose')
const { server } = require('../../index')
const Property = require('../../models/InvestmentTypes/Property')
const User = require('../../models/User')
const { api } = require('../global_test_helper')
const {
  initialProperties,
  getIdFromFirstProperty,
  getAllProperties
} = require('./properties_test_helper')

beforeAll(async () => {
  await User.deleteMany({})

  // create a user
  const user = new User({
    username: 'test',
    name: 'test',
    password: 'test'
  })

  await user.save()
})

beforeEach(async () => {
  await Property.deleteMany({})

  // sequential
  for (const property of initialProperties) {
    const propertyObject = new Property(property)
    await propertyObject.save()
  }
})

describe('Get Properties', () => {
  test('get all Properties as a json', async () => {
    await api
      .get('/api/properties')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all Properties are returned', async () => {
    const { body } = await getAllProperties()
    expect(body).toHaveLength(initialProperties.length)
  })

  test('the specific first property name with the id', async () => {
    const { id } = await getIdFromFirstProperty()

    const response = await api
      .get(`/api/properties/${id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.name).toContain('Property 1')
  })

  test('not found id', async () => {
    await api
      .get('/api/properties/123456789')
      .expect(404)
  })
})

describe('Create Properties', () => {
  test('a new property', async () => {
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
      .send(newProperty)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const { body } = await getAllProperties()
    expect(body).toHaveLength(initialProperties.length + 1)
  })

  test('new property without obligatory fields', async () => {
    const newProperty = {
      name: 'Property 3',
      currency: 'USD',
      date: new Date(),
      value: 1000
    }

    await api
      .post('/api/properties')
      .send(newProperty)
      .expect(422)

    const { body } = await getAllProperties()
    expect(body).toHaveLength(initialProperties.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
