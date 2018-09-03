// routes/users.js


const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkAuth = require('../checkAuth');
const key = require('../checkAuth/codes');
const fs = require('fs');



// sample User
	const newUser = {
		id: 'userId',
		username: 'Obafemi',
		email: 'md@animalworld.com.ng'
	}



function validUser(user){
	const validEmail = typeof user.email == 'string'
						&& user.email.trim() != '';

	const validPassword = typeof user.password == 'string'
						&& user.password.trim().length >= 6;

	return validEmail && validPassword;
}


// router to SIGNUP a new User
router.post('/signup', (req, res, next) => {
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
		next(new Error('Invalid User login'))
	}

});



// router to LOGIN a user
router.post('/login', (req, res) => {

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
});



module.exports = router;
