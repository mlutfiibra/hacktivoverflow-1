const Question = require('../models/question')
const Answer = require('../models/answer')

module.exports = class QuestionController {
  static getAll(req, res) {
    console.log(req.query, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<, ini req queryan')
    if (req.query.q) {
      Question
        .find({
          title: { '$regex': req.query.q, $options: 'i'}
        })
        .populate('questioner')
        .populate({
          path: 'answers',
          populate: {
            path: 'responder'
          }
        })
        .then(data => {
          res.status(200).json(data)
        })
        .catch(err => {
          console.log(err)
          res.status(500).json(err)
        })
    } else {
      Question
        .find()
        .populate('questioner')
        .populate({
          path: 'answers',
          populate: {
            path: 'responder'
          }
        })
        .then(data => {
          res.status(200).json(data)
        })
        .catch(err => {
          console.log(err)
          res.status(500).json(err)
        })
    }
  }

  static getOne(req, res) {
    Question
      .findById(req.params.id)
      .populate('questioner')
      .populate({
        path: 'answers',
        populate: {
          path: 'responder'
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static create(req, res) {
    req.body.description = req.body.description.replace('ql-align-center', 'text-center')
    Question
      .create({
        questioner: req.authUser.id,
        title: req.body.title,
        description: req.body.description
      })
      .then(question => {
        res.status(201).json(question)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static upvotes(req, res) {
    Question
      .findById(req.params.id)
      .populate('questioner')
      .populate({
        path: 'answers',
        populate: {
          path: 'responder'
        }
      })
      .then(question => {
        let samePerson = question.questioner.email == req.authUser.email
        let isExistUp = question.upvotes.indexOf(req.authUser.id) < 0
        let isExistDown = question.downvotes.indexOf(req.authUser.id) < 0
        
        if (samePerson) {
          res.status(400).json({error: 'You cannot vote your question'})
        } else if (isExistUp && isExistDown) {
          question.upvotes.push(req.authUser.id)
          return question.save()
        } else if (!isExistDown) {
          question.downvotes = question.downvotes.filter(el => el != req.authUser.id)
          question.upvotes.push(req.authUser.id)
          return question.save()
        } else {
          question.upvotes = question.upvotes.filter(el => el != req.authUser.id)
          return question.save()
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  static downvotes(req, res) {
    Question
      .findById(req.params.id)
      .populate('questioner')
      .populate({
        path: 'answers',
        populate: {
          path: 'responder'
        }
      })
      .then(question => {
        let samePerson = question.questioner.email == req.authUser.email
        let isExistUp = question.upvotes.indexOf(req.authUser.id) < 0
        let isExistDown = question.downvotes.indexOf(req.authUser.id) < 0

        if (samePerson) {
          res.status(400).json({error: 'You cannot vote your question'})
        } else if (isExistUp && isExistDown) {
          question.downvotes.push(req.authUser.id)
          return question.save()
        } else if (!isExistUp){
          question.upvotes = question.upvotes.filter(el => el != req.authUser.id)
          question.downvotes.push(req.authUser.id)
          return question.save()
        } else {
          question.downvotes = question.downvotes.filter(el => el != req.authUser.id)
          return question.save()
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  static answer(req, res) {
    req.body.description = req.body.description.replace('ql-align-center', 'text-center')
    let instanceAnswer = null
    Answer
      .create({
        responder: req.authUser.id,
        description: req.body.description
      })
      .then(answer => {
        instanceAnswer = answer
        return Question
          .findById(req.params.id)
          .populate('answers')
      })
      .then(question => {
        question.answers.push(instanceAnswer._id)
        return question.save()
      })
      .then(() => {
        return Question
          .findById(req.params.id)
          .populate('questioner')
          .populate({
            path: 'answers',
            populate: {
              path: 'responder'
            }
          })
      })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static deleteQuestion(req, res) {
    Question
      .findByIdAndDelete(req.params.id)
      .then(question => {
        res.status(200).json(question)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static editQuestion(req, res) {
    Question
      .findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description
      })
      .then(question => {
        res.status(200).json(question)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  }
}