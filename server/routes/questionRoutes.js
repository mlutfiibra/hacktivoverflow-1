const router = require('express').Router()
const QuestionController = require('../controllers/QuestionController')
const {authentication} = require('../middleware/auth')

router.get('/', QuestionController.getAll)
router.post('/', authentication, QuestionController.create)
router.get('/:id', QuestionController.getOne)
router.delete('/:id', authentication, QuestionController.deleteQuestion)
router.put('/:id', authentication, QuestionController.editQuestion)
router.put('/:id/upvotes', authentication, QuestionController.upvotes)
router.put('/:id/downvotes', authentication, QuestionController.downvotes)
router.post('/:id/answer', authentication, QuestionController.answer)

module.exports = router