const { model, Schema } = require('mongoose')
const defaultData = require('./globalData')

const bondSchema = new Schema({
  ...defaultData,
  issuer: {
    type: String,
    required: true
  },
  purchasePrice: {
    type: Number,
    required: true
  },
  purchaseDate: {
    type: Date,
    required: true
  },
  additionalDetails: {
    type: String
  },
  purchasedAt: {
    type: String,
    required: true
  },
  couponRate: {
    type: Number,
    required: true
  }
}, { timestamps: true })

bondSchema.path('name').validate(async function (value) {
  const bond = await this.constructor.findOne({
    name: value,
    user: this.user
  })
  return !bond // Returns true if the bond is not found
}, 'Bond name already exists')

bondSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // Delete the _id and __v bond
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Bond = model('Bond', bondSchema)

module.exports = Bond
