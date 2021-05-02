import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { HolaMundo } from '../components/HolaMundo';
import { AdiosMundo } from '../components/AdiosMundo';
import Nav from '../components/Nav';
import styled from 'styled-components';

const Container = styled.div`
	height: 100vh;

	display: grid;
	grid-template-columns: 300px 1fr;
`;

export const DashboardRoutes = () => {
	return (
		<>
			<Container>
				<Nav />
				<Switch>
					<Route exact path='/hola' component={HolaMundo} />
					<Route exact path='/adios' component={AdiosMundo} />
					<Route exact path='/' component={AdiosMundo} />
				</Switch>
			</Container>
		</>
	);
};
