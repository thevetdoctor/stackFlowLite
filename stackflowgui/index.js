const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'view')))
app.set('/view', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
app.use(cors({
	credentials : true
}))

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

app.get('/', (req,res)=> {
	res.render('/view/index');
})

app.listen(port, ()=> {
	console.log(`Front End Server running @ ${port}`);
})