const { model, Schema } = require('mongoose')
const defaultData = require('./globalData')

const fundSchema = new Schema({
  ...defaultData,
  description: {
    type: String
  }
}, { timestamps: true })

fundSchema.path('name').validate(async function (value) {
  const fund = await this.constructor.findOne({
    name: value,
    user: this.user
  })
  return !fund // Returns true if the fund is not found
}, 'Fund name already exists')

fundSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // Delete the _id and __v fund
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Fund = model('Fund', fundSchema)

module.exports = Fund
