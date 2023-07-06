const { model, Schema } = require('mongoose')
const defaultData = require('./globalData')

const jewelSchema = new Schema({
  ...defaultData,
  description: {
    type: String
  },
  history: {
    type: String
  },
  condition: {
    type: String
  }
}, { timestamps: true })

jewelSchema.path('name').validate(async function (value) {
  const jewel = await this.constructor.findOne({
    name: value,
    user: this.user
  })
  return !jewel // Returns true if the jewel is not found
}, 'Jewel name already exists')

jewelSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // Delete the _id and __v jewel
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Jewel = model('Jewel', jewelSchema)

module.exports = Jewel
