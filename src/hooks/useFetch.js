import axios from 'axios';
import { useReducer, useEffect } from 'react';
import { types } from '../constants/types';
import { getAuthCookie } from '../helpers/getCookie';

const dataFetchReducer = (state, action) => {
	switch (action.type) {
		case types.FETCH_GET:
			return { ...state, isLoading: true, isError: false };
		case types.FETCH_SUCCESS:
			return {
				...state,
				data: action.payload,
				isLoading: false,
				isError: false,
			};
		case types.FETCH_ERROR:
			return {
				state: [],
				isLoading: false,
				isError: true,
			};
		default:
			return state;
	}
};

export const useFetch = (endpoint) => {
	const [state, dispatch] = useReducer(dataFetchReducer, {
		isLoading: true,
		isError: false,
		data: [],
	});

	const url = `${process.env.REACT_APP_SERVER_URL}api/${endpoint}`;

	useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: types.FETCH_GET });
			try {
				const response = await axios.get(url, {
					headers: {
						'auth-token': getAuthCookie(),
					},
				});
				dispatch({
					type: types.FETCH_SUCCESS,
					payload: response.data,
				});
			} catch (e) {
				dispatch({ type: types.FETCH_ERROR });
			}
		};
		fetchData();
	}, [url]);

	return state;
};
