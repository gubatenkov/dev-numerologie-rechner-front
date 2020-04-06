import "typeface-roboto";

import "bootstrap/dist/css/bootstrap.css";

// TODO: legacy - remove after UI refactoring (still needed for remaining components)
import "./styles/bootstrap-extend.css";
// TODO: legacy - remove after UI refactoring (still needed for remaining components)
import "./styles/theme.css";

// global style definitions
import "./styles/global.scss";

import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";

import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import dotenv from "dotenv";

import { ThemeProvider } from "styled-components";
import withTracker from "./utils/tracking/withTracker";

import introspectionQueryResultData from "./utils/FragmentTypes.json";

import AnalysisInput from "./components/AnalysisInput";
import Login from "./components/Login";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import SetPassword from "./components/SetPassword";
import AnalysisResultPersonal from "./components/AnalysisResultPersonal";
import UserHome from "./components/UserHome";
import PrivateRoute from "./utils/routing/PrivateRoute";

import registerServiceWorker from "./utils/registerServiceWorker";
import {
  isUserAuthenticated,
  getUserAuthData,
  deleteUserAuthData
} from "./utils/AuthUtils";

import { GRAPHQL_ENDPOINT } from "./utils/Configuration";
import UserProfile from "./components/UserProfile";
import { BuyModalProvider } from "./contexts/BuyModalContext";

// defining UI themes
const lightTheme = {
  primary: "#01b2d4",
  black: "black",
  white: "#FFFFFF",
  yellow: "#FBC02D",
  primaryLight: "#f3f9fa",
  darkGrey: "#323232",
  darkGrey2: "#b8b8b8",
  lightGrey: "#eaeaea",
  lighterGrey: "#a8a8a8",
  lightestGrey: "#f8f8f8",
  matrixBorderGrey: "#D6D6D6",
  matrixRed: "rgba(255, 3, 3, .3)",
  highlightedRow: "rgba(1, 178, 212, 0.15)",
  bookPromotionBackground: "#8FBD36",
  fontFamily: "Roboto"
};

// configuring dotenv
dotenv.config();

// creating fragment matcher
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

// adding auth header to all requests
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const { token } = getUserAuthData();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(async ({ message, locations, path }) => {
      if (message === "User not authenticated") {
        // Useful code for future jwt refresh token implementation

        const { token } = getUserAuthData();
        // Token is set if user was already logged in once
        if (token) {
          deleteUserAuthData();
          window.location.href = "/login";
        }
        //   const response = await postJsonData("/login", {
        //     email: "useremail", // from localstorage
        //     password: "userPwd" // from localstorage
        //   }); // or create a /refresh route
        //   setUserAuthData({
        //     email: "useremail",
        //     token: response.token
        //   });

        //   window.location.reload();
        // }
      }
    });
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({ uri: GRAPHQL_ENDPOINT });

const client = new ApolloClient({
  link: authLink.concat(errorLink).concat(httpLink),
  cache: new InMemoryCache({
    fragmentMatcher
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore"
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    }
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <ThemeProvider theme={lightTheme}>
        <BuyModalProvider>
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
              <Route
                path="/analysisInput"
                component={withTracker(AnalysisInput)}
              />
              <PrivateRoute
                path="/userProfile"
                isAuthenticated={isUserAuthenticated}
                loginPath="/login"
                component={UserProfile}
              />
              <PrivateRoute
                path="/userHome/:userAction?/:firstNames?/:lastNames?/:dateOfBirth?/"
                isAuthenticated={isUserAuthenticated}
                loginPath="/login"
                component={withTracker(UserHome)}
              />
              <Route path="/" component={withTracker(AnalysisInput)} />
            </Switch>
          </BrowserRouter>
        </BuyModalProvider>
      </ThemeProvider>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
