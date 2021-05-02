import React from 'react';
import { useFetch } from '../hooks/useFetch';

export const Congestions = () => {
	const { data, isLoading } = useFetch('congestions');
	if (isLoading) {
		return <h1>Loading</h1>;
	}
	return (
		<div>
			{!data.error ? (
				data.data.length > 0 ? (
					<>
						{data.data.map((congestion) => {
							console.log(congestion);
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
