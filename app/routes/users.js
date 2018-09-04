// routes/users.js


const express = require('express');
const router = express.Router();
const checkAuth = require('../checkAuth');

const UsersController = require('../controllers/users');




// router to SIGNUP a new User
router.post('/auth/signup', UsersController.user_signup);



// router to LOGIN a user
router.post('/auth/login', UsersController.user_login);



module.exports = router;




// sample User
	// const newUser = {
	// 	id: 'userId',
	// 	username: 'Obafemi',
	// 	email: 'md@animalworld.com.ng'
	// }
