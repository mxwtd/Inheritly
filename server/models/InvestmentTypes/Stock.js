const { model, Schema } = require('mongoose')
const defaultData = require('./globalData')

const stockSchema = new Schema({
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
  }
}, { timestamps: true })

stockSchema.path('name').validate(async function (value) {
  const stock = await this.constructor.findOne({
    name: value,
    user: this.user
  })
  return !stock // Returns true if the stock is not found
}, 'Stock name already exists')

stockSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // Delete the _id and __v stock
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Stock = model('Stock', stockSchema)

module.exports = Stock
