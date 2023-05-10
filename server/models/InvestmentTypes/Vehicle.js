const { model, Schema } = require('mongoose')

const defaultProperties = {
  type: { type: String, required: true, enum: ['Property', 'Vehicle'] },
  name: { type: String, required: true },
  currency: String,
  date: Date,
  value: Number,
  purchaseDate: Date,
  taxStatus: String,
  description: String,
  photo: String
}

const vehicleSchema = new Schema({
  defaultProperties,
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
