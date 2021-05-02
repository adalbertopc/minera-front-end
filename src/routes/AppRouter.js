import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { LoginForm } from '../components/LoginForm';
import { PrivateRoute } from './PrivateRoute';
import { DashboardRoutes } from './DashboardRoutes';

export const AppRouter = () => {
	const { auth, setAuthData } = useContext(AuthContext);
	return (
		<Router>
			<div>
				<Switch>
					<Route path='/login'>
						<LoginForm />
					</Route>
					<PrivateRoute isAuth={auth.logged} component={DashboardRoutes} />
				</Switch>
			</div>
		</Router>
	);
};
