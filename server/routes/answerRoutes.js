const router = require('express').Router()
const AnswerController = require('../controllers/AnswerController')
const {authentication, authorizationAnswer} = require('../middleware/auth')

router.get('/:id', AnswerController.getOne)
router.put('/:id', authentication, authorizationAnswer, AnswerController.editAnswer)
router.put('/:id/upvotes', authentication, AnswerController.upvotes)
router.put('/:id/downvotes', authentication, AnswerController.downvotes)
router.delete('/:id', authentication, authorizationAnswer, AnswerController.remove)

module.exports = router