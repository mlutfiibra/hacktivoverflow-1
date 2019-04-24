const mongoose = require('mongoose')
const Schema = mongoose.Schema

let AnswerSchema = new Schema({
  responder: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  description: {
    type: String,
    required: true
  },
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  created_at: {
    type: Date,
    default: new Date()
  }
})

AnswerSchema.pre('findOneAndUpdate', function (next) {
  if (!this.getUpdate().description) {
    next(new Error())
  } else {
    next()
  }
})

let Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer