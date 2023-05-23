const { model, Schema } = require('mongoose')

const beneficiarySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  group: { type: Schema.Types.ObjectId, ref: 'BeneficiaryGroup', required: true },
  role: { type: String, enum: ['admin', 'member', 'lawyer'], required: true }
})

beneficiarySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // Delete the _id and __v properties
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Beneficiary = model('Beneficiary', beneficiarySchema)

module.exports = Beneficiary
