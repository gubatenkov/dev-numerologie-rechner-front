import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AnalysisInput from './components/AnalysisInput';
import Login from './components/Login';
import AnalysisResultPersonal from './components/AnalysisResultPersonal';
import PrivateRoute from './utils/PrivateRoute';

import registerServiceWorker from './utils/registerServiceWorker';
import isUserAuthenticated from './utils/AuthUtils';

import './styles/theme.css';
import './styles/bootstrap-extend.css';
import './styles/bootstrap.css';
import './styles/brand-icons/brand-icons.min.css';
import './styles/web-icons/web-icons.min.css';
import './styles/font-awesome/font-awesome.min.css';

ReactDOM.render(	
	<BrowserRouter>
		<Switch>
			<Route path='/login' component={Login}/>
			<Route path='/resultPersonal' component={AnalysisResultPersonal}/>
			<PrivateRoute path="/analysisInput" isAuthenticated={isUserAuthenticated} loginPath='/login' component={AnalysisInput} />
		</Switch>
	</BrowserRouter>,
	document.getElementById('root')
);
registerServiceWorker();
