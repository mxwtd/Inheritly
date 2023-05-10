const { api } = require('../global_test_helper')

const initialProperties = [
  {
    name: 'Investment 1',
    currency: 'USD',
    date: new Date(),
    value: 1000,
    TaxStatus: 'Taxable',
    type: 'Property',

    city: 'New York',
    country: 'USA',
    address: '123 Main St',
    zip: '12345'
  },
  {
    name: 'Investment 2',
    currency: 'USD',
    date: new Date(),
    value: 1000,
    TaxStatus: 'Taxable',
    type: 'Property',

    city: 'Medellin',
    country: 'Colombia',
    address: 'diagonal 75c',
    zip: '12345'
  }
]

const getAllContentFromProperties = async () => {
  const response = await api.get('/properties')
  const contents = response.body.map(r => r.content)
  return {
    response,
    contents
  }
}

module.exports = {
  initialProperties,
  getAllContentFromProperties
}
