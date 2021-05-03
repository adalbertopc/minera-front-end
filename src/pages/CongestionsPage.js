import React from 'react';
import { Congestions } from '../components/Congestions';
import styled from 'styled-components';

const Title = styled.h1`
	color: #fff;
	margin: 50px;
`

export const CongestionsPage = () => {
	return (
		<div>
			<Title>Congestions</Title>
			<Congestions />
		</div>
	);
};
