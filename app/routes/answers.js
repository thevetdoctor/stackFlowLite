// routes/answers.js

const express = require('express');
const router = express.Router();
const pg = require('pg');
const checkAuth = require('../checkAuth');

// / DB connection string

// const config = {
// 	host: 'localhost',
// 	user: 'postgres',
// 	database: 'stackflow',
// 	password: 'animalworld',
// 	port: 5433
// }

// const answers = {
// 	ans1: {body: 'first answer'},
// 	ans2: {body: 'second answer'},
// 	ans3: {body: 'third answer'}
// }

// router for users to GET answers to ALL QUESTIONS
router.get('/', checkAuth, (req, res) => {

	res.status(200).json({
		message: 'All answers displayed',
		answers
	});
})


// router for users to GET answers by ID
router.get('/:answerId', checkAuth, (req, res, next) => {
	const id = req.params.answerId;

	const pool = new pg.Pool(config);

			pool.connect((err, client, done) => {
				if(err){
					return console.error('error fetching ....', err);
				}
			client.query('SELECT * FROM users WHERE id = $1', [id] ,(err, result) => {
				if(err){
				return console.error('error running query');
				}

		res.status(200).json({
			message: 'User with id:' + id + ' displayed',
			result: result.rows
		  });
			done();
		});
	});
});




// client.query("INSERT INTO users( name, email, password, hash) VALUES('Mary','maria@yahoo.com', 'password123', 'hash')", (err, result) => {
module.exports = router;


