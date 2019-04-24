const mongoose = require('mongoose')
const Schema = mongoose.Schema

const {encrypt} = require('../helpers/bcrypt')

let UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: [
      {
        validator: function(v) {
          return /\S+@\S+\.\S+/.test(v)
        },
        message: props => `Email is not valid`
      },
      {
        validator: async function(v) {
          let member = await mongoose.model('User', UserSchema).findOne({email: v})
          return member ? false : true
        },
        message: props => `Email is already used`
      }
    ]
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.pre('save', function(next) {
  this.password = encrypt(this.password)
  next()
})

let User = mongoose.model('User', UserSchema)

module.exports = User