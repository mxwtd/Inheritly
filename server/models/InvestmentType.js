const mongoose = require('mongoose')

const investmentTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }
})

investmentTypeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // Delete the _id and __v properties
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const InvestmentType = mongoose.model('InvestmentType', investmentTypeSchema)

module.exports = InvestmentType
