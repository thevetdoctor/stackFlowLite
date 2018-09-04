// controllers/users.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require('../checkAuth/codes');



exports.user_signup = (req, res, next) => {
	const user = {
		email: req.body.email,
		password: req.body.password,
	}

// check validity of user name & password
	if(validUser(req.body)){

// encrypt the valid password with BCRYPT
		bcrypt.hash(req.body.password, 10)
		.then((hash) => {

		res.json({
			message: 'User created',
			user,
			hash
		});
		})

	} else {
		// send an error
		res.status(401).json({
			message: 'Signup Failed',
			reasons: 'Password must be not be less than six(6) characters'
		});
		// next(new Error('Signup Failed'))
	}

}


exports.user_login = (req, res) => {

	const user = {
		email: 'md@animalworld.com.ng',
		password: 123456
	}

	jwt.sign({user}, key.val, {expiresIn: '1hr'}, (err, token) => {
		if(err){
			res.status(400).json({
				message: 'authorization failed',
				token: 'Not authorized'
			})
		}
		// console.log(req.headers['authorization'])
		res.status(200).json({
			message: 'Token created',
			token
		})
	});
}


function validUser(user){
	const validEmail = typeof user.email == 'string'
						&& user.email.trim() != '';

	const validPassword = typeof user.password == 'string'
						&& user.password.trim().length >= 6;

	return validEmail && validPassword;
}