const defaultData = {
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

module.exports = defaultData
