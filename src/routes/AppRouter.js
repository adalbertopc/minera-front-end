import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { LoginForm } from '../components/LoginForm';
import Dashboard from '../components/dashboard';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
	const { auth, setAuthData } = useContext(AuthContext);
	return (
		<Router>
			<div>
				<Switch>
					<Route path='/login'>
						<LoginForm />
					</Route>
					<PrivateRoute isAuth={auth.logged} component={Dashboard} />
				</Switch>
			</div>
		</Router>
	);
};
