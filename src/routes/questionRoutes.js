const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const { handleNotFound, handleErrors } = require('../middleware/errorMiddleware');

router.post('/', questionController.createQuestion)

router.get('/', questionController.getAllQuestions)

router.get('/:id', questionController.getQuestionById)

router.put('/:id', questionController.updateQuestionById)

router.delete('/:id', questionController.deleteQuestionById)

router.use(handleNotFound)
router.use(handleErrors)


module.exports = router