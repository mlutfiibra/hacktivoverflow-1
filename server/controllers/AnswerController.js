const Answer = require('../models/answer')

module.exports = class AnswerController {

  static getOne(req, res) {
    Answer
      .findById(req.params.id)
      .populate('responder')
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static upvotes(req, res) {
    Answer
      .findById(req.params.id)
      .populate('responder')
      .then(answer => {
        let samePerson = answer.responder.email == req.authUser.email
        let isExistUp = answer.upvotes.indexOf(req.authUser.id) < 0
        let isExistDown = answer.downvotes.indexOf(req.authUser.id) < 0
        
        if (samePerson) {
          res.status(400).json({error: 'You cannot vote your answer'})
        } else if (isExistUp && isExistDown) {
          answer.upvotes.push(req.authUser.id)
          return answer.save()
        } else if (!isExistDown) {
          answer.downvotes = answer.downvotes.filter(el => el != req.authUser.id)
          answer.upvotes.push(req.authUser.id)
          return answer.save()
        } else {
          answer.upvotes = answer.upvotes.filter(el => el != req.authUser.id)
          return answer.save()
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static downvotes(req, res) {
    Answer
      .findById(req.params.id)
      .populate('responder')
      .then(answer => {
        let samePerson = answer.responder.email == req.authUser.email
        let isExistUp = answer.upvotes.indexOf(req.authUser.id) < 0
        let isExistDown = answer.downvotes.indexOf(req.authUser.id) < 0

        if (samePerson) {
          res.status(400).json({error: 'You cannot vote your answer'})
        } else if (isExistUp && isExistDown) {
          answer.downvotes.push(req.authUser.id)
          return answer.save()
        } else if (!isExistUp){
          answer.upvotes = answer.upvotes.filter(el => el != req.authUser.id)
          answer.downvotes.push(req.authUser.id)
          return answer.save()
        } else {
          answer.downvotes = answer.downvotes.filter(el => el != req.authUser.id)
          return answer.save()
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static remove(req, res) {
    Answer
      .findByIdAndDelete(req.params.id)
      .then(answer => {
        res.status(200).json(answer)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  
  static editAnswer(req, res) {
    Answer
      .findByIdAndUpdate(req.params.id, {
        description: req.body.description
      })
      .then(answer => {
        res.status(200).json(answer)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  }
} 