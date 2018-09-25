const signUp = document.getElementById('signup');
const logIn = document.getElementById('login');

const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');

const signupBtn = document.getElementById('signupBtn');
const loginBtn = document.getElementById('loginBtn');

const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');

const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');

const signupUrl = `${apiUrl}users/auth/signup`;
const loginUrl = `${apiUrl}users/auth/login`;

const questions = document.getElementById('questions');
const display = document.getElementById('display');
const landing = document.getElementById('landing');

const questNav = document.querySelector('.questionsNav');
const heading = document.querySelector('.heading');


const questBtn = document.querySelector('.questBtn');

// showQuestions = showQuestions();


const viewQuestion = () => {

	if(display.innerText !== 'undefined'){

	let questDiv = questBtn.parentNode();
		console.log(questDiv)
	} else {

	return;
	}
}

// questBtn.forEach((btn) => {
// })

// const showQuestions = () => {
// 	let questUrl = `${apiUrl}questions`;
// 	let token = window.sessionStorage.token;


// 	fetch(questUrl, {
// 		method: 'GET',
// 		headers: {
// 			authorization: `Bearer ${token}`
// 		}
// 	})
// 		.then((response) => {
// 			return response.json();
// 		})
// 		.then((result) => {
// 			console.log(result);
// 			landing.style.display = 'none';
// 			heading.innerText = 'Questions';
// 			display.innerHTML = '<h3>' + result.message + '</h3>';
// 					console.log(result);
// 		result.questions.forEach((x)=>{
// 			display.innerHTML += `<div class='questDiv'><p>${x.id} : ${x.body}</p>
// 								<p class='questAuthor'>posted by: ${x.useremail}</p>
// 								<p><input class='questBtn' type='button' value='More...'></p></div>`;
// 			})
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 			landing.style.display = 'block';
// 			return;
// 		})
// }

questNav.addEventListener('click', showQuestions);
// questBtn.addEventListener('click', viewQuestion);

// console.log(loginEmail.value)

	signupForm.style.display = 'none';
	loginForm.style.display = 'none';


const showSignupForm = () => {
	loginForm.style.display = 'none';
	signupForm.style.display = 'block';
}


const showLoginForm = () => {
	signupForm.style.display = 'none';
	questions.style.display = 'none';
	loginForm.style.display = 'block';
}


signUp.addEventListener('click', showSignupForm)
logIn.addEventListener('click', showLoginForm)



const login = (e, url, user) => {
	e.preventDefault();


	 user = { email: loginEmail.value,
			  password: loginPassword.value
			}

	console.log(user)

		// signup.style.display = 'none';
		login.innerText  = 'Logout';

	fetch(loginUrl, {
		method: 'POST',
		// mode: 'no-cors',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json'
			}
		}).then(res => res.json())
	.then((response) => {
		console.log(response)
		display.innerHTML = response.message;
		window.localStorage.token = response.token;
		window.sessionStorage.token = response.token;
	})
	.catch(error => { console.log(error)})
		loginForm.style.display = 'none';
}



const signup = (e, url, user) => {
	e.preventDefault();

		console.log('Welcome to Stack!');
	    user = {
		name: signupName.value,
		email: signupEmail.value,
		password: signupPassword.value
	}

		console.log(user);

	fetch(signupUrl, {
		method: 'POST',
		// mode: 'no-cors',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json'
			}
		})
	.then(res => res.json())
	.then((response) => {
		console.log(response)
		display.innerHTML = response.message;
	})
	.catch(error => console.log(error));
		signupForm.style.display = 'none';

}

signupBtn.addEventListener('click', signup);
loginBtn.addEventListener('click', login);
















// const login = (e) => {
// e.preventDefault()

// 	questions.style.display = 'block';

// 		const xhttp = new XMLHttpRequest();

// 	    xhttp.open("POST", loginUrl, true);
// 	    xhttp.setRequestHeader("Content-Type", "application/json");
// 	    // xhttp.withCredentials = true;
// 		xhttp.onreadystatechange = function() {
// 			if(this.readyState === 4 && this.status === 200){

// 				loginForm.style.display = 'none';

// 				let result = this.responseText;
// 					result = JSON.parse(result);
// 		questions.innerHTML = '<h3>' + result.message + '</h3>';
// 					console.log(result);
// 		result.questions.forEach((x)=>{
// 			questions.innerHTML += `<div class='questDiv'><p>${x.id} : ${x.body}</p>
// 								<p class='questAuthor'>posted by: ${x.useremail}</p>
// 								<p><input class='questBtn' type='button' value='More...'></p></div>`;
// 		})

// 			}
// 		}

// 		let data = JSON.stringify({
// 	email:'thevetdoctor@gmail.com',
// 	password: 'obafemi'
// });

// 		console.log(user);
// 		// console.log(loginUrl);
// 		// console.log(data);;
// 		// console.log(xhttp);

// 		xhttp.send(data);
// 	// window.location = apiUrl + 'questions';
// }



// const login = (e) => {
// 	e.preventDefault();

// 	console.log('Welcome to Login');
// 	console.log(email);
// 	console.log(password);
// 	console.log(user);

// }
// const loginUrl = `${apiUrl}users/auth/login`;

// $(()=>{

// 	const $errMsg = $('#error');
// 	$errMsg.text('error.response.JSON.message');


// 	$('form').submit((e)=>{
// 		e.preventDefault();

// let myObj = {
//         email: 'obasam@yahoo.com',
//         password: 'samuel'
//         // email: $('#email').val(),
//         // password: $('#password').val()
// };

// // let order = JSON.stringify(myObj);

// // $.ajax({
// //     type: 'POST',
// //     url: loginUrl,
// //     data: order,
// //     contentType: "application/json",
// //     dataType: "json",
// //     success: function(data) {
// //      console.log("Data added!", data);
// // 		console.log('jquery');
// //     }
// //   });
// login(myObj)
// .then((result)=>{
// 	console.log(result)
// }).catch(error => {
// 	console.log(error)
// 	const errMsg = document.querySelector('#error');
// 	errMsg.innerText = error.response.JSON.message;
// 	errMsg.style.display = 'block';
// })

// 	})
// })
// function login(user){

// return $.post(loginUrl, user)
// }
