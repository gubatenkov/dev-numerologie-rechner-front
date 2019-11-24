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
import dotenv from 'dotenv';

import withTracker from './utils/tracking/withTracker';

import introspectionQueryResultData from './utils/FragmentTypes.json';

import AnalysisInput from './components/AnalysisInput';
import Login from './components/Login';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import SetPassword from './components/SetPassword';
import AnalysisResultPersonal from './components/AnalysisResultPersonal';
import UserHome from './components/UserHome';
import PrivateRoute from './utils/routing/PrivateRoute';

import registerServiceWorker from './utils/registerServiceWorker';
import { isUserAuthenticated, getUserAuthData } from './utils/AuthUtils';

import './styles/bootstrap-extend.css';
import './styles/bootstrap.css';
import './styles/brand-icons/brand-icons.min.css';
import './styles/web-icons/web-icons.min.css';
import './styles/font-awesome/font-awesome.min.css';
import './styles/theme.css';

import { ThemeProvider } from 'styled-components';

import { GRAPHQL_ENDPOINT } from './utils/Configuration';

// defining UI themes
const lightTheme = {
  primary: '#01b2d4',
  white: '#FFFFFF',
  primaryLight: '#f3f9fa',
  darkGrey: '#323232',
  lightGrey: '#eaeaea',
  lighterGrey: '#a8a8a8',
  fontFamily: 'Roboto',
};

// configuring dotenv
dotenv.config();

// creating fragment matcher
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

// adding auth header to all requests
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
  cache: new InMemoryCache({
    fragmentMatcher,
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={withTracker(Login)} />
          <Route path="/register" component={withTracker(Register)} />
          <Route path="/reset" component={withTracker(ResetPassword)} />
          <Route
            path="/input-set-password/:token?"
            component={withTracker(SetPassword)}
          />
          <Route
            exact
            path="/resultPersonal/:analysisId/:resultConfigurationId?"
            component={withTracker(AnalysisResultPersonal)}
          />
          <Route
            exact
            path="/resultPersonal/:firstNames/:lastNames/:dateOfBirth/:resultConfigurationId?"
            component={withTracker(AnalysisResultPersonal)}
          />
          <Route path="/analysisInput" component={withTracker(AnalysisInput)} />
          <PrivateRoute
            path="/userHome/:userAction?/:firstNames?/:lastNames?/:dateOfBirth?/"
            isAuthenticated={isUserAuthenticated}
            loginPath="/login"
            component={withTracker(UserHome)}
          />
          <Route path="/" component={withTracker(AnalysisInput)} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
