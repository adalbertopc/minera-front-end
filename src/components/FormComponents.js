import styled from 'styled-components';

export const Form = styled.form`
	background: #dedede;
`;

export const FormGroup = styled.div`
	color: palevioletred;
	display: block;
	width: 300px;
	margin: 50px auto;
`;

export const Label = styled.label`
	margin-bottom: 0.5em;
	color: palevioletred;
	display: block;
`;

export const Input = styled.input`
	padding: 0.5em;
	color: palevioletred;
	background: papayawhip;
	border: none;
	border-radius: 3px;
	width: 100%;
	margin-bottom: 0.5em;
`;

export const Message = styled.label`
	margin-bottom: 0.5em;
	color: palevioletred;
	display: block;
`;

export const Button = styled.button`
	padding: 10px 20px;
	background: green;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	opacity: 0.8;
	transition: opacity 0.3s ease;
	&:hover {
		opacity: 1;
	}
`;
