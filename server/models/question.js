const mongoose = require('mongoose')
const Schema = mongoose.Schema

let QuestionSchema = new Schema({
  questioner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
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
    ref: 'User'
  }],
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }],
  created_at: {
    type: Date,
    default: new Date()
  }
})

let Question = mongoose.model('Question', QuestionSchema)

module.exports = Question