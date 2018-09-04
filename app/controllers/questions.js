// controllers/questions.js

const question = {
		id: 'questionId',
		body: "EDUCATION: This is not just about going to school, it's about bringing out your God given potentials, by exposing the light of world class education to the citizens of this state, such that the whole world will look up to Osun state for manpower. You should be qualified to work anywhere in the world with the training you shall get from this state.",
		user: 'Obafemi'
	}

exports.questions_get_all = (req, res, next) => {

	res.status(200).json({
		message: 'Handling GET requests to /questions',
		question: question
	});
}


exports.questions_get_by_ID = (req, res, next) => {
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
}


exports.questions_post_question = (req, res, next) => {

	res.status(200).json({
		message: 'Handling POST requests to /questions',
		question: question
	});
}


exports.questions_delete_by_ID = (req, res, next) => {
	const id = req.params.questionId;

	res.status(200).json({
			message: 'You deleted question ' + id,
			id: id
		});
}


exports.questions_post_answers_by_ID = (req, res, next) => {
	const questionId = req.params.questionId;

	res.status(200).json({
		message: 'POST answers to question ' + questionId,
		question: question
	});
}


exports.questions_update_answers_by_ID = (req, res, next) => {
	const questionId = req.params.questionId;
	const answerId   = req.params.answerId;

	res.status(200).json({
			message: 'You updated/accepted answer ' + answerId + ' for question ' + questionId,
			questionId,
			answerId
		});
}


