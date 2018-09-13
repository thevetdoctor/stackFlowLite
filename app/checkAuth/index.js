// checkAuth/index.js

const jwt = require('jsonwebtoken');
const key = require('../checkAuth/codes');


module.exports = (req, res, next) => {

	let cookies = req.cookies;

	// console.log(cookies);
	// console.log('cookies undefined');
	console.log(req.headers['authorization']);

	try {
		const bearerHeader = req.headers['authorization'];

		if(typeof bearerHeader !== 'undefined'){
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		req.token = bearerToken;

		const decoded = jwt.verify(req.token, key.val )

			if(decoded){
				next();
			}

		} else {

			// console.log(cookies);
			// res.clearCookie(token, {
			// 					httpOnly: true,
			// 					secure: true,
			// 				// 	// signed: true,
			// 				// });
			// 			})

			res.status(401).json({
				message: 'Authentication failed'
				// cookies
			})
		}
	}
		catch(error) {
			return res.status(401).json({
			message: 'Please Login'
		});
	}
}


// // checkAuth/index.js

// const jwt = require('jsonwebtoken');
// const key = require('../checkAuth/codes');


// module.exports = (req, res, next) => {
// 	try {
// 		const bearerHeader = req.headers['authorization'];

// 		if(typeof bearerHeader !== 'undefined'){
// 		const bearer = bearerHeader.split(' ');
// 		const bearerToken = bearer[1];
// 		req.token = bearerToken;

// 		const decoded = jwt.verify(req.token, key.val )
// 		next();
// 		} else {
// 			res.status(401).json({
// 				message: 'No Authorization'
// 			})
// 		}
// 	}
// 		catch(error) {
// 			return res.status(401).json({
// 			message: 'Authentication failed'
// 		});
// 	}
// }