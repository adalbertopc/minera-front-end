import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { validateTokenCookie } from '../auth/tokenCookie';
import { LoginForm } from '../components/LoginForm';
import Dashboard from '../components/dashboard';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
	const { auth, setAuthData } = useContext(AuthContext);
	useEffect(() => {
		validateTokenCookie().then((userData) => {
			if (userData) {
				setAuthData({
					logged: true,
					token: userData.token,
					username: userData.username,
					firstName: userData.firstName,
				});
			}
		});
	}, []);
	console.log(auth);
	return (
		<Router>
			<div>
				<Switch>
					<Route path='/login'>
						<LoginForm />
					</Route>
					<PrivateRoute isAuth={auth.data.logged} component={Dashboard} />
				</Switch>
			</div>
		</Router>
	);
};
