const UserModel = require('../models/user')
const {decrypt} = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')

module.exports = class UserController {
  static create(req, res) {
    UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).json(err)
      } else {
        res.status(500).json(err)
      }
    })
  }

  static login(req, res) {
    UserModel.findOne({
      email: req.body.email
    })
    .then(user => {
      if (!user) {
        res.status(400).json({error: 'Username / Password wrong'})
      } else {
        if (!decrypt(req.body.password, user.password)) {
          res.status(400).json({error: 'Username / Password wrong'})
        } else {
          let accessToken = jwt.sign({
            id: user._id,
            email: user.email,
            role: user.role
          }, process.env.SECRET_KEY)
          res.status(200).json({accessToken, user})
        }
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static getOneUser(req, res) {
    UserModel
      .findById(req.authenticatedUser.id)
      .populate('carts')
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static clearCart(req, res) {
    UserModel
      .findByIdAndUpdate(req.authenticatedUser.id, {
        carts: []
      })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}