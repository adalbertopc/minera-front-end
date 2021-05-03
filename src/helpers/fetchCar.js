import axios from 'axios';

export const mostrarCarros = () => {
	axios.get('https://984b11671680.ngrok.io/api/congestions/')
		.then((response) => {
			console.log(response.data);
		})
		.catch((error) => {
			console.log(error);
		});
};

export const agregarCarro = (objCarro) => {
	axios.post('https://984b11671680.ngrok.io/api/congestions/', objCarro)
		.then((response) => {
			console.log(response.data);
		})
		.catch((error) => {
			console.log(error);
		});
};
