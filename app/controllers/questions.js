// controllers/questions.js

const pg = require('pg');
const jwt = require('jsonwebtoken');
const config = require('../config');
const pool = new pg.Pool(config);
const question = require('../models/questions');
const answer = require('../models/answers');



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

		// res.send(result.rows).status(200).json({
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
			// client.query('SELECT * FROM questions WHERE id = $1', [id], (err, result) => {
				client.query('select questions.body, questions.useremail, answers.body, answers.poster, answers.dateposted from questions inner join answers on questions.id = $1', [id], (err, result) => {
				if(err){
				return console.error('error running query');
				}
				console.log(result.rows)

				if(result.rows.length < 1){
					res.status(200).json({
						message: 'Question:' + id + ' not available',
						question: result.rows
					  });
					}
		res.status(200).json({
			message: 'Question:' + id + ' displayed',
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
			question: result.rows,
			author: question.user
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
			message: 'Question:' + id + ' deleted',
			question: result.rows
		  });
			done();
		});
	});
}


exports.questions_post_answers_by_ID = (req, res, next) => {
	const questionId = req.params.questionId;

		const decoded = jwt.decode(req.token)

		answer.body = req.body.content;
		answer.poster = decoded.user.email;
		answer.questID = questionId;

		console.log(answer.body)
		console.log(answer.poster)
		console.log(questionId)


			pool.connect((err, client, done) => {
				if(err){
					return console.error('error fetching ....', err);
				}
			client.query('INSERT INTO answers (body, poster, questid) VALUES ($1, $2, $3)', [req.body.content, answer.poster, questionId], (err, result) => {
				if(err){
				return console.error('error running query');
				}
					console.log(result.rows)

			res.status(200).json({
				message: 'New answer posted',
				answer: result.rows,
				poster: answer.poster
			  });
				done();
			});
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


