const mongoose = require('mongoose')
const { server } = require('../index')
const Investment = require('../models/Investment')
const User = require('../models/User')
const {
  api,
  initialInvestments,
  getAllContentFromInvestments
} = require('./test_helper')

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
  await Investment.deleteMany({})

  // sequential
  for (const investment of initialInvestments) {
    const investmentObject = new Investment(investment)

    console.log('investmentObject: ', investmentObject)

    await investmentObject.save()
  }
})

describe('Get Investments', () => {
  // test return the reviews as json
  test.only('get all investments as a json', async () => {
    await api
      .get('/investments')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  // test return all the reviews
  test('all investments are returned', async () => {
    const { response } = await getAllContentFromInvestments()
    expect(response.body).toHaveLength(initialInvestments.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
