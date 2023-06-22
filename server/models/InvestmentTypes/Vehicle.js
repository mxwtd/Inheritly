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

vehicleSchema.path('name').validate(async function (value) {
  const vehicle = await this.constructor.findOne({
    name: value,
    user: this.user
  })
  return !vehicle // Returns true if the vehicle is not found
}, 'Vehicle name already exists')

vehicleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // Delete the _id and __v vehicle
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Vehicle = model('Vehicle', vehicleSchema)

module.exports = Vehicle
