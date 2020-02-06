import React, { useEffect, useRef } from "react";
import { Query } from "react-apollo";
import { currentWindowToken } from "../graphql/Queries";
import LoadingIndicator from "./LoadingIndicator";

// default refresh interval in seconds
const DEFAULT_REFRESH_INTERVAL = 10;

/**
 * Hook that periodically checks for updates in currentWindowToken
 * and calls a callback if an update has been detected
 * @param {function} callback callback function to be called every delay seconds
 * @param {int} delay time interval to call callback in (ms)
 */
function useInterval(callback, delay) {
  // callback as ref value
  const savedCallback = useRef();

  // effect that saves the callback passed as prop (if prop changed)
  useEffect(() => {
    // saving updated callback
    savedCallback.current = callback;
  }, [callback]);

  // effect that sets up periodic task to call callback (if delay changed)
  useEffect(() => {
    // function called all delay seconds
    function tick() {
      // calling provided callback
      savedCallback.current();
    }

    // if a delay has been passed => starting periodic task
    if (delay !== null) {
      // set up task every delay second
      const intervalId = setInterval(tick, delay);

      // cleanup function => clear interval
      return () => {
        clearInterval(intervalId);
      };
    }
    // return null;
  }, [delay]);
}

/**
 * Wait component that periodically checks passed refetch function and calls onSuccess
 * if provided data contains all required data.
 */
const Wait = ({ onSuccess, data, loading, refetch }) => {
  // if sufficient data is present => calling provided callback
  if (data && data.windowToken && data.windowToken.wpOrderId) {
    onSuccess();
  }

  // using useInteval hook to referch periodically
  useInterval(() => {
    refetch();
  }, DEFAULT_REFRESH_INTERVAL * 1000);

  // returning loading indicator if waiting
  return (
    <LoadingIndicator
      text={`Wir warten bis die Zahlung in unserem Webshop (in einem separaten Fenster) erfolgreich durchgeführt wurde.`}
    />
  );
};

// exporting wrapped query component
// TODO: Use apollo polling
export default ({ windowToken, onSuccess }) => {
  // querying for a window token and rendering wait component with result
  return (
    <Query query={currentWindowToken} variables={{ windowToken }}>
      {({ loading, data, refetch }) => {
        return (
          <Wait
            {...{
              onSuccess,
              data,
              loading,
              refetch
            }}
          />
        );
      }}
    </Query>
  );
};
