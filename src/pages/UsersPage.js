import React from 'react';
import { Users } from '../components/Users';
import styled from 'styled-components';

const Title = styled.h1`
	color: #fff;
	margin: 50px;
`

export const UsersPage = () => {
	return (
		<div>
			<Title>Users</Title>
			<Users />
		</div>
	);
};
