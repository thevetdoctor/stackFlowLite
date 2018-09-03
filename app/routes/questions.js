// routes/question/js

const express = require('express');
const router = express.Router();
const checkAuth = require('../checkAuth');


	const question = {
		id: 'questionId',
		body: "EDUCATION: This is not just about going to school, it's about bringing out your God given potentials, by exposing the light of world class education to the citizens of this state, such that the whole world will look up to Osun state for manpower. You should be qualified to work anywhere in the world with the training you shall get from this state.",
		user: 'Obafemi'
	}


// router for users to POST questions
router.post('/', checkAuth, (req, res, next) => {

	res.status(200).json({
		message: 'Handling POST requests to /questions',
		question: question
	});
});



// router for users to GET ALL questions
router.get('/', checkAuth, (req, res, next) => {

	res.status(200).json({
		message: 'Handling GET requests to /questions',
		question: question
	});
});



// router for users to GET questions by ID
router.get('/:questionId', checkAuth, (req, res, next) => {
	const id = req.params.questionId;

	if(id === 'special'){
		res.status(200).json({
			message: 'You discovered the special ID',
			id: id
		})
	} else {
		res.status(200).json({
			message: 'You passed an ID',
			id: id
		})
	}
});


// router for users to UPDATE questions by ID
router.patch('/:questionId', checkAuth, (req, res, next) => {
	const id = req.params.questionId;

	res.status(200).json({
			message: 'You updated question ' + id,
			id: id
		});
});


// router for users to DELETE questions by ID
router.delete('/:questionId', checkAuth, (req, res, next) => {
	const id = req.params.questionId;

	res.status(200).json({
			message: 'You deleted question ' + id,
			id: id
		});
});


module.exports = router;
