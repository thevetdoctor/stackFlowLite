const showQuestions = () => {
	let questUrl = `${apiUrl}questions`;
	let token = window.sessionStorage.token;


	fetch(questUrl, {
		method: 'GET',
		headers: {
			authorization: `Bearer ${token}`
		}
	})
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			console.log(result);
			landing.style.display = 'none';
			// heading.innerText = 'Questions';
			display.innerHTML = '<h3>' + result.message + '</h3>';
		result.questions.forEach((x)=>{
			display.innerHTML += `<div class='questDiv'><p>${x.id} : ${x.body}</p>
								<p class='questAuthor'>posted by: ${x.useremail}</p>
								<p><button class='questBtn' value='More...'></button</p></div>`;
			})
		})
		.catch((error) => {
			console.log(error);
			landing.style.display = 'block';
			return;
		})
}