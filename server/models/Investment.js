const { model, Schema } = require('mongoose')

const INVESTMENT_TYPES = {
  Property: require('./InvestmentTypes/Property').schema,
  Vehicle: require('./InvestmentTypes/Vehicle').schema
}

const investmentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  currency: String,
  date: Date,
  value: Number,
  purchaseDate: Date,
  TaxStatus: String,
  description: String,
  photo: String,
  type: {
    type: String,
    required: true,
    enum: ['Property', 'Vehicle']
  },
  details: {
    type: Schema.Types.Mixed
  }
})

investmentSchema.pre('validate', function (next) {
  const schemaFunc = INVESTMENT_TYPES[this.type]
  if (schemaFunc) {
    this.details = schemaFunc(this.details)
  } else {
    throw new Error('Invalid investment type')
  }
  next()
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
