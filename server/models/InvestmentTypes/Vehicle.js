const { model, Schema } = require('mongoose')
const defaultProperties = require('./globalProperties')

const vehicleSchema = new Schema({
  ...defaultProperties,
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  }
})

const Vehicle = model('Vehicle', vehicleSchema)

module.exports = Vehicle
