const { model, Schema } = require('mongoose')

const investmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  currency: String,
  date: Date,
  value: Number,
  purchaseDate: Date,
  TaxStatus: String,
  photo: String,
  type: {
    type: Schema.Types.ObjectId,
    ref: 'InvestmentType'
  }
})

investmentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // Delete the _id and __v properties
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Investment = model('Investment', investmentSchema)

module.exports = Investment
