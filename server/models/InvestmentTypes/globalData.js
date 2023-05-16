const { Schema } = require('mongoose')

const defaultData = {
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
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
