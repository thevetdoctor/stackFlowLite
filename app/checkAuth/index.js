// checkAuth/index.js

const jwt = require('jsonwebtoken');
const key = require('../checkAuth/codes');


module.exports = (req, res, next) => {
	try {
		const bearerHeader = req.headers['authorization'];

		if(typeof bearerHeader !== 'undefined'){
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		req.token = bearerToken;

		const decoded = jwt.verify(req.token, key.val )
		next();
		} else {
			res.status(401).json({
				message: 'No Authorization'
			})
		}
	}
		catch(error) {
			return res.status(401).json({
			message: 'Authentication failed'
		});
	}
}