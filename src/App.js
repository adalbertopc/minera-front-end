import { LoginForm } from './components/LoginForm';
import Dashboard from './components/dashboard'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route path='/dashboard'>
						<Dashboard />
					</Route>
					<Route path='/'>
						<LoginForm />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
