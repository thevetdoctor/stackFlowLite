// controllers/users.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pg = require('pg');
const config = require('../config');
const pool = new pg.Pool(config);
const key = require('../checkAuth/codes');
const user = require('../models/users');

// install --save bcrypt-nodejs && npm uninstall --save bcrypt

const validUser = (user) => {

	const validEmail = /(.+)@(.+){2,}\.(.+){2,}/.test(user.email)
						&& user.email.trim() != '';
						// console.log(/(.+)@(.+){2,}\.(.+){2,}/.test(user.email))
						// console.log(user.email)
						// console.log('passed regexp')

	const validPassword = typeof user.password == 'string'
						&& user.password.trim() != ''
						&& user.password.trim().length >= 6;
						// console.log('password valid')
						// console.log(validEmail)
						// console.log(validPassword)
	return validEmail && validPassword;
}

// 	const checkDb = (user) => {

// 			// console.log(user)
// 	 			pool.connect((err, client, done) => {
// 					if(err){
// 						return console.error('error fetching ....', err);
// 					}
// 				client.query('SELECT email FROM users', (err, result) => {
// 					if(err){
// 					return console.error('error running query');
// 					}
// 					// console.log(result.rows)
// 					const emailArray = result.rows.map((val)=> {
// 						return val.email.trim()
// 					})
// 					console.log(emailArray)
// 					console.log(user.email)
// 					console.log(emailArray.includes(user.email))

// 					return emailArray.includes(user.email)
// 					done();
// 			});
// 		});
// }


exports.user_signup = (req, res, next) => {
	const user = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	}

// check validity of user name & password
		console.log('Email validating')

		if(validUser(req.body)){

		console.log('Email valid')

	// check if email already used

		pool.connect((err, client, done)=> {
			if(err){
				console.log(err);
			}
			client.query('SELECT email FROM users', (err, result)=>{
				if(err){
					console.log(err)
				}
				console.log(result.rows)
			let newArr = result.rows.map((val)=>{
				return val.email.trim()
			})
				console.log(newArr)

				if(newArr.includes(user.email)){

				  	res.status(401).json({
				  		message: 'Email already used'
				  	})

				} else {

					console.log('New email being registered')

				// encrypt the valid password with BCRYPT
					bcrypt.hash(req.body.password, 10)
					.then((hash) => {

				// connect to the db and save credentials
				pool.connect((err, client, done) => {
					if(err){
					return console.error('error fetching ....', err);
					}
				client.query('INSERT INTO users (name, email, password, hash) VALUES ($1, $2, $3, $4)', [req.body.name, req.body.email, req.body.password, hash ], (err, result) => {
			    		if(err){
						return console.error('error running query');
						}
						console.log(result.rows)
						console.log('New User created')
						res.status(200).json({
							message: 'New User created',
								user: result.rows,
								email: user.email
					  		});
						});
							done();
					});
				})
        	}
		done();
		})
	})

	}
	  else {
		// send an error
		res.status(401).json({
			message: 'Signup Failed',
			reasons: 'Invalid Email/Password must be minimum of 6 characters'
		});
	}

}


exports.user_login = (req, res, next) => {
		user.email = req.body.email;
		user.password = req.body.password;
		const userArray = [];
		let position = 0;

    if(user.email !== '' && user.password !== ''){

			pool.connect((err, client, done) => {
				if(err){
					console.log(err)
				}
				client.query('SELECT email, password, hash FROM users', (err, result) => {
						if(err){
							console.log(err)
						}
						// console.log(result.rows)

					let contain = result.rows.map((val)=>{
							return val.email
						}).map((val)=>{
							return val.trim()
						});
						// console.log(contain)

						if(contain.includes(user.email)){

				          position = contain.indexOf(user.email)
						}
						// console.log(position)

				  userArray.push(result.rows[position].email)
				  userArray.push(result.rows[position].password)
				  userArray.push(result.rows[position].hash)

				  	// console.log(userArray)
				  	console.log(result.rows[position].email)

				if(user.email == userArray[0].trim()){

					if(user.password == userArray[1].trim()){

						bcrypt.compare(user.password, userArray[2].trim())
							  .then((result)=>{
							  	if(result){


						jwt.sign({user}, key.val, {expiresIn: '1min'}, (err, token) => {
							if(err){
								res.status(400).json({
									message: 'authorization failed',
									token: 'Not authorized'
								})
							}

							// set cookie and store JWT
							res.cookie(token, {
								httpOnly: true,
								secure: true,
								// signed: true,
							});

							// console.log('cookie')
							// console.log(res.cookie)
							// console.log(window.sessionStorage.token)
							// console.log(window.sessionStorage.accessToken)

							// window.sessionStorage.token = token;

							// console.log(token)
							// res.status(200).redirect('../../questions').json({
							res.status(200).json({
								message: 'Login successful',
								token
							})

						  })
					     }

						});
						} else {
							res.status(400).json({
							message: 'Invalid password'
							})
						console.log('Invalid password')
						}

				  } else {
					res.status(400).json({
						message: 'Invalid email'
					})
					console.log('Invalid email')

				  }


				done();
				})
			})

  }
  else {

  	res.status(400).json({
  					message: 'Please enter your email & password'
  				})
  }

}

