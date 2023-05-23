const { model, Schema } = require('mongoose')

const beneficiaryGroupSchema = new Schema({
  securityQuestion: { type: String, required: true },
  assets: [{ type: Schema.Types.ObjectId, ref: 'Asset' }],
  beneficiaries: [{ type: Schema.Types.ObjectId, ref: 'Beneficiary' }]
})

beneficiaryGroupSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // Delete the _id and __v properties
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const BeneficiaryGroup = model('BeneficiaryGroup', beneficiaryGroupSchema)

module.exports = BeneficiaryGroup
