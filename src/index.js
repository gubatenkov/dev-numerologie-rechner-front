import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

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

// graphql endpoint url
const GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql';

// creating client for graphQL connection
const client = new ApolloClient({
  link: createHttpLink({ uri: GRAPHQL_ENDPOINT }),
  cache: new InMemoryCache(),
});

// <PrivateRoute path="/analysisInput"
// isAuthenticated={isUserAuthenticated} loginPath='/login' component={AnalysisInput} />

ReactDOM.render(
  <ApolloProvider client={client}>
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
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
