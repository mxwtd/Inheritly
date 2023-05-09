const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  zip: {
    type: String,
    required: false,
  }
})

module.exports = propertySchema
