// routes/answers.js

const express = require('express');
const router = express.Router();
const checkAuth = require('../checkAuth');


const answers = {
	ans1: {body: 'first answer'},
	ans2: {body: 'second answer'},
	ans3: {body: 'third answer'}
}

// router for users to GET answers to ALL QUESTIONS
router.get('/', checkAuth, (req, res) => {

	res.status(200).json({
		message: 'All answers displayed',
		answers
	});
})



// router for users to POST answers to ANY QUESTION
router.post('/:answerId', checkAuth, (req, res, next) => {
	const id = req.params.answerId;

	res.status(200).json({
		message: 'Answer with id:' + id + ' displayed',
		answers: answers['ans'+ id]
	});
})




















module.exports = router;
