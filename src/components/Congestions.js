import React from 'react';
import { useFetch } from '../hooks/useFetch';
import Congestion from './Congestion';
import { Container } from '../components/TableComponents';
import styled from 'styled-components';
import { CreatePdf } from './CreatePdf';

const ButtonPdf = styled.button`
	font: bold 16px poppins;
	margin: 55px 30px 0 30px;
	background: ${({ theme }) => theme.colors.primary};
	border: none;
	color: white;
	border-radius: 10px;
	transition: background 0.3s ease, opacity 0.3s ease;
	cursor: pointer;

	display: flex;
	align-items: center;
	justify-content: center;

	opacity: 0.5;

	&:hover {
		background: ${({ theme }) => theme.hov.primary};
		opacity: 1;
	}

	span {
		font-size: 20px;
		margin-right: 5px;
	}
`;

export const Congestions = () => {
	const { data, isLoading } = useFetch('congestions');
	if (isLoading) {
		return <h1>Loading</h1>;
	}
	return (
		<div>
			<CreatePdf data={data.data} endpoint='congestions' documentPrefix='congestion' />
			{!data.error ? (
				data.data.length > 0 ? (
					<Container>
						{data.data.map((congestion) => (
							<Congestion key={congestion.id} congestion={congestion} />
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
