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
  photo: {
    url: { type: String },
    folder: { type: String }
  },
  beneficiaryGroup: { type: Schema.Types.ObjectId, ref: 'BeneficiaryGroup' },
  files: [{
    url: { type: String },
    folder: { type: String }
  }],
  // Add contact info
  contactInformation: {
    accountNumber: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    companyAddress: { type: String, required: true }
  }
}

module.exports = defaultData
