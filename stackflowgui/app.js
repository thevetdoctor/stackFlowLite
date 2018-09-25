// const swApp = () => {

// if('serviceWorker' in navigator){
// 	console.log('SW registered');
// 	navigator.serviceWorker.register('./sw.js')
// 	.then((res) => {
// 	console.log('SW registered', res);

// 	})
// 	.catch((err)=> {
// 		console.log('SW not registered')
// 	})
// 	}
// }

// swApp();

// module.exports = swApp;

function sw(){
  if(navigator.serviceWorker){
    console.log('Browser supports service worker');

    navigator.serviceWorker.register('./sw.js').then((response) => {
      console.log('Scope:', response.scope, 'State:', response.active.state);
    })
    .catch((err) => {
      console.log('Error: serviceWorker not registered', err);
    });
  }
}
sw();