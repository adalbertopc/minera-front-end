import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HolaMundo } from '../components/HolaMundo';
import Nav from '../components/Nav';
import styled from 'styled-components';
import { CongestionsPage } from '../pages/CongestionsPage';
import { UsersPage } from '../pages/UsersPage';
import { MapPage } from '../pages/MapPage';
import { MapUserPage } from '../pages/MapUserPage';
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
					<Route exact path='/users' component={UsersPage} />
					<Route exact path='/congestions' component={CongestionsPage} />
					<Route exact path='/user-map' component={MapUserPage} />

					<Route exact path='/' component={MapPage} />
				</Switch>
			</Container>
		</>
	);
};
