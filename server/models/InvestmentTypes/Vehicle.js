const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: false,
  },
  year: {
    type: String,
    required: false,
  },
})

module.exports = vehicleSchema
