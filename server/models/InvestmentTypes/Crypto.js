const { model, Schema } = require('mongoose')
const defaultData = require('./globalData')

const cryptoSchema = new Schema({
  ...defaultData,
  symbol: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  purchasePrice: {
    type: Number,
    required: true
  },
  detail: {
    type: String
  },
  purchasedAt: {
    type: String
  },
  walletAddress: {
    type: String
  }
}, { timestamps: true })

cryptoSchema.path('name').validate(async function (value) {
  const crypto = await this.constructor.findOne({
    name: value,
    user: this.user
  })
  return !crypto // Returns true if the crypto is not found
}, 'Crypto name already exists')

cryptoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // Delete the _id and __v crypto
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Crypto = model('Crypto', cryptoSchema)

module.exports = Crypto
