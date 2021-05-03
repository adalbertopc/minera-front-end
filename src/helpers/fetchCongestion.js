import axios from 'axios';
import { getAuthCookie } from './getCookie';

export const agregarZona = (objZona) => {
	axios.post(`${process.env.REACT_APP_SERVER_URL}api/congestions`, objZona, {
		headers: {
			'auth-token': getAuthCookie(),
		},
	})
		.then((response) => {
			console.log(response.data);
		})
		.catch((error) => {
			console.log(error.response);
		});
};
