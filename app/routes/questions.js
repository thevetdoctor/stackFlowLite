// routes/question/js

const express = require('express');
const router = express.Router();
const checkAuth = require('../checkAuth');

const QuestionsController = require('../controllers/questions');



// router for users to GET ALL questions
// router.get('/', checkAuth, QuestionsController.questions_get_all);
router.get('/', QuestionsController.questions_get_all);



// router for users to GET questions by ID
// router.get('/:questionId', checkAuth, QuestionsController.questions_get_by_ID);
router.get('/:questionId', QuestionsController.questions_get_by_ID);


// router for users to POST questions
router.post('/', checkAuth, QuestionsController.questions_post_question);


// router for users to DELETE questions by ID
router.delete('/:questionId', checkAuth, QuestionsController.questions_delete_by_ID);


// router for users to POST answers to question by ID
router.post('/:questionId/answers', checkAuth, QuestionsController.questions_post_answers_by_ID);


// router for users to UPDATE answers to questions by ID
router.put('/:questionId/answers/:answerId', checkAuth, QuestionsController.questions_update_answers_by_ID);




module.exports = router;

