const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
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

const Property = mongoose.model('Property', propertySchema)

module.exports = Property
