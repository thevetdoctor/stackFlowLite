// server.js

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const pg = require('pg');
const MongoClient = require('mongodb').MongoClient;
const db = require('./config/db');
const morgan = require('morgan');
const cors  = require('cors');
const cookieParser = require('cookie-parser');




const app = express();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('animalworld server port: ' + port);

  });


// Set public folder as root
app.use(express.static('public'));

//Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));



const questions = require('./app/routes/questions');
const users = require('./app/routes/users');
// const answers = require('./app/routes/answers');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(cors)
app.use(cors({
	credentials : true
}))

app.use(cookieParser('cookieSecret'));
const corsMiddleware = (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	if(req.method === "OPTIONS"){
		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, POST");
		return res.status(200).json({});
	}
	next();
};


app.use(corsMiddleware)
app.use(morgan('dev'));

app.use('/questions', questions);
app.use('/users', users);
// app.use('/answers', answers);

app.use('/', (req, res)=>{
	// res.render(/index)
	// next()
	// res.end("<h1>Welcome to StackFLowlite</h1> <p><i>by animalworldng(thevetdoctor@gmail.com)</p><p></p><p> - A platform where everyone can ask questions, get answers and also provide responses to other's questions!</p>");
	res.sendFile('/public');
})



app.use((req, res, next) => {
	const error = new Error('Page Not found');
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




