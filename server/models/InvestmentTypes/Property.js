const { model, Schema } = require('mongoose')
const defaultData = require('./globalData')

const propertySchema = new Schema({
  ...defaultData,
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
}, { timestamps: true })

propertySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // Delete the _id and __v properties
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Property = model('Property', propertySchema)

module.exports = Property
