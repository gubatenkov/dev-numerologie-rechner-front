import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import 'react-notifications/lib/notifications.css';

import introspectionQueryResultData from './utils/FragmentTypes.json';

import AnalysisInput from './components/AnalysisInput';
import Login from './components/Login';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import SetPassword from './components/SetPassword';
import AnalysisResultPersonal from './components/AnalysisResultPersonal';
import UserHome from './components/UserHome';
import PrivateRoute from './utils/PrivateRoute';

import registerServiceWorker from './utils/registerServiceWorker';
import { isUserAuthenticated, getUserAuthData } from './utils/AuthUtils';

import './styles/bootstrap-extend.css';
import './styles/bootstrap.css';
import './styles/brand-icons/brand-icons.min.css';
import './styles/web-icons/web-icons.min.css';
import './styles/font-awesome/font-awesome.min.css';
import './styles/theme.css';

// graphql endpoint url
const GRAPHQL_HOST = 'http://localhost:4000';
// const GRAPHQL_HOST = 'https://dev-numerologie-rechner.herokuapp.com';
const GRAPHQL_ENDPOINT = `${GRAPHQL_HOST}/graphql`;

// creating fragment matcher
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

// adding auth header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const { token } = getUserAuthData();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// creating http link
const httpLink = createHttpLink({ uri: GRAPHQL_ENDPOINT });

// creating client for graphQL connection
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ fragmentMatcher }),
});

// <PrivateRoute path="/analysisInput"
// isAuthenticated={isUserAuthenticated} loginPath='/login' component={AnalysisInput} />

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/reset" component={ResetPassword} />
        <Route path="/input-set-password/:token?" component={SetPassword} />
        <Route
          path="/resultPersonal/:firstNames/:lastName/:dateOfBirth"
          component={AnalysisResultPersonal}
        />
        <Route path="/analysisInput" component={AnalysisInput} />
        <PrivateRoute
          path="/userHome/:userAction?/:firstNames?/:lastName?/:dateOfBirth?"
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
