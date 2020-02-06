/**
 * From ReactGA Community Wiki Page https://github.com/react-ga/react-ga/wiki/React-Router-v4-withTracker
 */

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import GoogleAnalytics from "react-ga";

GoogleAnalytics.initialize("UA-109503933-2", { anonymizeIp: true });

let withTracker = (WrappedComponent, options) => props => {
  // getting needed parts of props
  const { location } = props;

  // function to track a pageview
  const trackPage = page => {
    GoogleAnalytics.set({
      page,
      ...options
    });
    // logging pageview
    if (page) {
      GoogleAnalytics.pageview(page);
    }
  };

  // tracking upon location change (prop)
  useEffect(() => {
    const page = location.pathname;
    const loggingPath = page.split("/").length > 0 ? page.split("/")[1] : "/";
    trackPage(loggingPath);
  }, [location.pathname]);

  return <WrappedComponent {...props} />;
};

withTracker.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

// in development environment, we don't wont Tracking to be effective:
if (process.env.NODE_ENV === "development") {
  withTracker = (WrappedComponent, options) => props => {
    return <WrappedComponent {...props} />;
  };
}

export default withTracker;
