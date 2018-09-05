// controllers/questions.js

const Question = require('../models/questions');
const fs = require('fs');

// const question = {
// 		id: 'questionId',
// 		body: "EDUCATION: This is not just about going to school, it's about bringing out your God given potentials, by exposing the light of world class education to the citizens of this state, such that the whole world will look up to Osun state for manpower. You should be qualified to work anywhere in the world with the training you shall get from this state.",
// 		user: 'Obafemi',
// 		createdDate: new Date()
// 	}


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
	const question = {
		id : 1,
		body : req.body.content,
		createdDate : new Date()
	}


	fs.readFile('././response.json', 'utf-8', (err, data) => {
		if(err) console.log(err)
			// console.log(data)
		data = JSON.parse(data)
			// console.log(data)
		console.log(Object.keys(data))

		let newData = data['question'];
			   // console.log(newData)
		    newData.push(question);
			   console.log(newData)

	fs.writeFile('././response.json', JSON.stringify(newData), 'utf-8', (err, data)=>{
		if(err){
			console.log(err)
			res.status(401).json({
				message: 'Question not saved'
			});
		}
	  });

	});

	res.status(200).json({
		message: 'New question posted',
		question
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


