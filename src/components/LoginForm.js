import React from 'react';
import { Container, FormGroup, Label, Input, Button, Title } from '../components/FormComponents';
export const LoginForm = () => {
	return (
		<Container>
			<FormGroup>
				<Title>Login</Title>
				<Input type="text" placeholder='username' />
				<Input type="password" placeholder='password' />
				<Button type='submit'>Sign in</Button>
			</FormGroup>
		</Container>
	);
};
