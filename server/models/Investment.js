const { model, Schema } = require('mongoose')

// Define property and vehicle schemas
const propertySchema = new Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  address: { type: String, required: true },
  zip: { type: String, required: true }
})

const vehicleSchema = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  vin: { type: String, required: true }
})

// Define investment schema
const investmentSchema = new Schema({
  type: { type: String, required: true, enum: ['Property', 'Vehicle'] },
  name: { type: String, required: true },
  currency: String,
  date: Date,
  value: Number,
  purchaseDate: Date,
  taxStatus: String,
  description: String,
  photo: String,
  details: { type: Schema.Types.Mixed }
})

// Apply the appropriate schema to the details field depending on the investment type
investmentSchema.pre('validate', function (next) {
  if (this.type === 'Property') {
    this.details = model('Property', propertySchema)(this.details)
  } else if (this.type === 'Vehicle') {
    this.details = model('Vehicle', vehicleSchema)(this.details)
  } else {
    throw new Error('Invalid investment type')
  }
  next()
})

// Define Investment model
const Investment = model('Investment', investmentSchema)

module.exports = Investment
