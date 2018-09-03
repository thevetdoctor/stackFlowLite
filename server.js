// server.js

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const pg = require('pg');
const MongoClient = require('mongodb').MongoClient;
const db = require('./config/db');
const morgan = require('morgan');


const app = express();

const port = 8000;

app.listen(port, () => {
  console.log('animalworld server port: ' + port);

  });


const questions = require('./app/routes/questions');
const users = require('./app/routes/users');
const answers = require('./app/routes/answers');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use((req, res, next) => {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
// 	if(req.method === "OPTIONS"){
// 		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, POST");
// 		return res.status(200).json({});
// 	}
// });

app.use(morgan('dev'));

app.use('/questions', questions);
app.use('/users', users);
app.use('/answers', answers);


app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500)
	.json({
		error: {
			message: error.message
		}
	})
})

module.exports = app;

// DB connection string
const connect = "postgres://animalworld:animalworld@localhost/notable";

const config = {
	user: 'postgres',
	database: 'animalworld',
	password: 'animalworld',
	port: 5432
}

app.get('/pool', (req, res) => {

	// const pool = new pg.Pool(config);

	// pool.connect((err, client, done) => {
	// 	if(err){
	// 		return console.error('error fetching ....', err);
	// 	}
	// 	client.query('SELECT * FROM CURRENT_DATABASE()', (err, result) => {
	// 		if(err){
	// 			return console.error('error running query');
	// 		}
	// 		res.render('index', {recipe: result.rows});
	// 		done();
	// 	});
	// });

	res.send('THIS IS NOT MY INDEX');
});


// Listen to the server




app.get('/note/index', (req, res) => {

// MongoClient.connect(db.url, (err, database) => {
  	// require('./app/routes/notes')(app, database);

	console.log(db.url + 'h')
//   if (err) {
// 	console.log(db)
//  return console.log(err);

// 	console.log(db.url + 'w')
// }

// });
res.send('THIS IS MY INDEX');

});








// if not using expressframework for server deployment, use this approach


// const fs = require('fs');

// const data = fs.readFileSync('response.txt');

// const data1 = fs.readFileSync('response.txt').toString();
// // console.log(data1, 'line 21')

// console.log(data.toString(), 'line 23')
// console.log('Program ended in a I/O blocking fashion')


// fs.readFile('response.txt', (err, data) => {
// 	if(err) return 'Error in display';
// 	console.log(data.toString(), 'line 29')
// });
// console.log('Program ended asynchronously');

// const http = require('http');
// const host = '127.0.0.1';
// const server = http.createServer((req, res) => {
// 	res.statusCode = 200;
// 	res.setHeader('Content-Type', 'text/html');
// 	res.end('Welcome to animalworldng')
// });
// server.listen(port, host, () => {
// 	console.log(`Server started at http://${host}:${port}`);
// })

////////////////////////////////////////////////////////////////////////