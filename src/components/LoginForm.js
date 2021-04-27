import React from 'react';
import { Form, FormGroup, Label, Input, Message, Button } from '../components/FormComponents';
export const LoginForm = () => {
	return (
		<Form>
			<FormGroup>
				<Label>Hola</Label>
				<Input id='Hola' placeholder='user' />
				<Button type='submit'>Login</Button>
			</FormGroup>
		</Form>
	);
};
