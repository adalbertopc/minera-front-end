import React from 'react';
import { useFetch } from '../hooks/useFetch';
import {Container} from '../components/TableComponents';
import User from '../components/User'

export const Users = () => {
	const { data, isLoading } = useFetch('user');
	if (isLoading) {
		return <h1>Loading</h1>;
	}
	return (
		<div>
			{!data.error ? (
				data.data.length > 0 ? (
					<Container>
						{data.data.map((user) => (
							<User 
								key={user.username}
								user={user}
							/>
						))}
					</Container>
				) : (
					<h1>No data</h1>
				)
			) : (
				<h1>Oops Something went wrong</h1>
			)}
		</div>
	);
};
