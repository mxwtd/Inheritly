const mongoose = require('mongoose')
const { server } = require('../../index')
const Property = require('../../models/InvestmentTypes/Property')
const User = require('../../models/User')
const { api } = require('../global_test_helper')
const {
  initialProperties,
  getAllContentFromProperties
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

    console.log('investmentObject: ', propertyObject)

    await propertyObject.save()
  }
})

describe('Get Properties', () => {
  // test return the reviews as json
  test.only('get all Properties as a json', async () => {
    await api
      .get('/properties')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  // test return all the reviews
  test('all Properties are returned', async () => {
    const { response } = await getAllContentFromProperties()
    expect(response.body).toHaveLength(initialProperties.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
