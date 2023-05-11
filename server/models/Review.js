const { model, Schema } = require('mongoose')

// Define a schema
const reviewSchema = new Schema({
  title: String,
  content: String,
  date: Date,
  important: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

// Transform the object returned by Mongoose
reviewSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // Delete the _id and __v properties
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Define a model to create reviews
const Review = model('Review', reviewSchema)

module.exports = Review
