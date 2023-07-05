const { model, Schema } = require('mongoose')
const defaultData = require('./globalData')

const commoditySchema = new Schema({
  ...defaultData,
  quantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  details: {
    type: String
  }
}, { timestamps: true })

commoditySchema.path('name').validate(async function (value) {
  const commodity = await this.constructor.findOne({
    name: value,
    user: this.user
  })
  return !commodity // Returns true if the commodity is not found
}, 'Commodity name already exists')

commoditySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // Delete the _id and __v commodity
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Commodity = model('Commodity', commoditySchema)

module.exports = Commodity
