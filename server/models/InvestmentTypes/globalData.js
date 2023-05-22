const { Schema } = require('mongoose')

const defaultData = {
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: { type: String, required: true, enum: ['Property', 'Vehicle'] },
  name: { type: String, required: true },
  currency: String,
  date: Date,
  value: Number,
  purchaseDate: Date,
  taxStatus: String,
  description: String,
  photo: String,
  beneficiaryGroup: { type: Schema.Types.ObjectId, ref: 'BeneficiaryGroup' }
}

module.exports = defaultData