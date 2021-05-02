import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Container, FormGroup, Input, Button, Title } from '../components/FormComponents';
import { AuthContext } from '../auth/AuthContext';
import { useForm } from '../hooks/useForm';

export const LoginForm = () => {
	const { setAuthData } = useContext(AuthContext);
	const [values, handleInputChanges] = useForm({});
	const [error, setError] = useState({ error: false, message: '' });

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post('http://localhost:3000/api/user/auth', values);
			const data = res.data;
			if (!data.error && data !== null) {
				setAuthData({ logged: true, ...data.data });
				document.cookie = `token=${data.data.token}`;
			}
		} catch (e) {
			const { error, message } = e.response.data;
			setError({ error, message });
		}
	};

	return (
		<Container>
			<FormGroup onSubmit={handleSubmit}>
				<Title>Login</Title>
				<Input
					type='text'
					placeholder='username'
					name='username'
					onChange={handleInputChanges}
				/>
				<Input
					type='password'
					placeholder='password'
					name='password'
					onChange={handleInputChanges}
				/>
				<Button type='submit'>Sign in</Button>
			</FormGroup>
		</Container>
	);
};
