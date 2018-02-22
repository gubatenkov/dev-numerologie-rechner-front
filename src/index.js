import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AnalysisInput from './components/AnalysisInput';
import Login from './components/Login';
import AnalysisResultPersonal from './components/AnalysisResultPersonal';
import UserHome from './components/UserHome';
import PrivateRoute from './utils/PrivateRoute';

import registerServiceWorker from './utils/registerServiceWorker';
import isUserAuthenticated from './utils/AuthUtils';

import './styles/bootstrap-extend.css';
import './styles/bootstrap.css';
import './styles/brand-icons/brand-icons.min.css';
import './styles/web-icons/web-icons.min.css';
import './styles/font-awesome/font-awesome.min.css';
import './styles/theme.css';

// <PrivateRoute path="/analysisInput"
// isAuthenticated={isUserAuthenticated} loginPath='/login' component={AnalysisInput} />

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route
        path="/resultPersonal/:firstNames/:lastName/:dateOfBirth"
        component={AnalysisResultPersonal}
      />
      <Route path="/analysisInput" component={AnalysisInput} />
      <PrivateRoute
        path="/userHome"
        isAuthenticated={isUserAuthenticated}
        loginPath="/login"
        component={UserHome}
      />
      <Route path="/" component={AnalysisInput} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);
registerServiceWorker();
