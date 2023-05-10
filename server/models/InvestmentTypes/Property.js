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
