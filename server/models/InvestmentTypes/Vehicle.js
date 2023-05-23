const { model, Schema } = require('mongoose')
const defaultData = require('./globalData')

const vehicleSchema = new Schema({
  ...defaultData,
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
}, { timestamps: true })

vehicleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // Delete the _id and __v properties
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Vehicle = model('Vehicle', vehicleSchema)

module.exports = Vehicle
