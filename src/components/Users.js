import React from 'react';
import { useFetch } from '../hooks/useFetch';

export const Users = () => {
	const { data, isLoading } = useFetch('user');
	if (isLoading) {
		return <h1>Loading</h1>;
	}
	return (
		<div>
			{!data.error ? (
				data.data.length > 0 ? (
					<>
						{data.data.map((user) => {
							console.log(user);
						})}
					</>
				) : (
					<h1>No data</h1>
				)
			) : (
				<h1>Oops Something went wrong</h1>
			)}
		</div>
	);
};
