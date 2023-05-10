const { model, Schema } = require('mongoose')
const defaultProperties = require('./globalProperties')

const propertySchema = new Schema({
  ...defaultProperties,
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  }
})

const Property = model('Property', propertySchema)

module.exports = Property
