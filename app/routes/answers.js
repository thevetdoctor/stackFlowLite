// routes/answers.js

const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const db = require('../../config/db');
const pg = require('pg');
const mongoose = require('mongoose');
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
// router.post('/:answerId', checkAuth, (req, res, next) => {
// 	const id = req.params.answerId;

// 	res.status(200).json({
// 		message: 'Answer with id:' + id + ' displayed',
// 		answers: answers['ans'+ id]
// 	});
// })


router.get('/note', (req, res) => {

mongoose.connect(db.url);

mongoose.connection.once('open', () => {
	console.log('Connected to database');
})

res.status(200).json({
	message: 'Connected'
})
// MongoClient.connect(db.url, (err, database) => {
//   	// require('./app/routes/notes')
//   	// (app, database);
//   	database.collection('notes').find((err, item)=>{

// 	console.log(db.url + '-h')
//  		 if (err) {
// 	console.log(db.url + 'a')
// 	 return console.log(err);

// 	console.log(db.url + '-w')
// }
// 	res.send('THIS IS MY INDEX');
//   	});

// 	});

});


// / DB connection string
// const connect = "postgres://postgres:notable1@localhost/notable";

const config = {
	host: 'localhost',
	user: 'postgres',
	database: 'postgres',
	password: 'animalworld',
	port: 5432
}



router.post('/pool', checkAuth, (req, res) => {

	const pool = new pg.Pool(config);

	pool.connect((err, client, done) => {

	// pg.connect(connect, (err, client, done) => {

		if(err){
			return console.error('error fetching ....', err);
		}
		// client.query("INSERT INTO students( name, roll number) VALUES(1, 'Mary', 123)", (err, result) => {
		client.query('SELECT * FROM students', (err, result) => {
			if(err){
				return console.error('error running **** query');
			}
			done();
			res.status(201).json({
				message: result.rows,
				err
			});
			// res.status(200).json({recipe: result.rows});
		});

	});

	// res.send('THIS IS NOT MY INDEX');
});


module.exports = router;
