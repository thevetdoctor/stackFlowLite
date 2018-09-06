// controllers/questions.js

const pg = require('pg');
const jwt = require('jsonwebtoken');
const config = require('../config');
const pool = new pg.Pool(config);
const question = require('../models/questions');



exports.questions_get_all = (req, res, next) => {
 question.body = req.body.content;


 			pool.connect((err, client, done) => {
				if(err){
					return console.error('error fetching ....', err);
				}
			client.query('SELECT * FROM questions', (err, result) => {
				if(err){
				return console.error('error running query');
				}

		res.status(200).json({
			message: 'All questions displayed',
			questions: result.rows
		  });
			done();
		});
	});
}


exports.questions_get_by_ID = (req, res, next) => {
	const id = req.params.questionId;


	pool.connect((err, client, done) => {
				if(err){
					return console.error('error fetching ....', err);
				}
			client.query('SELECT * FROM questions WHERE id = $1', [id], (err, result) => {
				if(err){
				return console.error('error running query');
				}
				console.log(result.rows)
		res.status(200).json({
			message: 'All questions displayed',
			question: result.rows
		  });
			done();
		});
	});
}


exports.questions_post_question = (req, res, next) => {

	const decoded = jwt.decode(req.token)

		question.body = req.body.content;
		question.user = decoded.user.email;
		console.log(question.user)
		console.log(decoded)

			pool.connect((err, client, done) => {
				if(err){
					return console.error('error fetching ....', err);
				}
			client.query('INSERT INTO questions (body, useremail) VALUES ($1, $2)', [question.body, question.user], (err, result) => {
				if(err){
				return console.error('error running query');
				}

		res.status(200).json({
			message: 'New question posted',
			question: result.rows
		  });
			done();
		});
	});
}



exports.questions_delete_by_ID = (req, res, next) => {
	const id = req.params.questionId;


	pool.connect((err, client, done) => {
				if(err){
					return console.error('error fetching ....', err);
				}
			client.query('DELETE FROM questions WHERE id = $1', [id], (err, result) => {
				if(err){
				return console.error('error running query');
				}
				console.log(result.rows)
		res.status(200).json({
			message: 'All questions displayed',
			question: result.rows
		  });
			done();
		});
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


