const uniqueValidator = require('mongoose-unique-validator')
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastNames: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String
  },
  assets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Property'
    },
    {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle'
    }
  ],
  groups: [
    {
      group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
      }
    }
  ]
}, { timestamps: true })

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // Delete the _id and __v properties
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

module.exports = User
