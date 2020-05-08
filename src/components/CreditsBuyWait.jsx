import React, { useEffect, useRef } from "react";
import { Query } from "react-apollo";
import { currentWindowToken } from "../graphql/Queries";
import LoadingIndicator from "./LoadingIndicator";
import { useTranslation } from "react-i18next";
const DEFAULT_REFRESH_INTERVAL = 10;

/**
 * Hook that periodically checks for updates in currentWindowToken
 * and calls a callback if an update has been detected
 * @param {function} callback callback function to be called every delay seconds
 * @param {int} delay time interval to call callback in (ms)
 */
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const intervalId = setInterval(tick, delay);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [delay]);
}

/**
 * Wait component that periodically checks passed refetch function and calls onSuccess
 * if provided data contains all required data.
 */
const Wait = ({ onSuccess, data, refetch }) => {
  const { t } = useTranslation();
  if (data && data.windowToken && data.windowToken.wpOrderId) {
    onSuccess();
  }

  useInterval(() => {
    refetch();
  }, DEFAULT_REFRESH_INTERVAL * 1000);

  return <LoadingIndicator text={t("WAITING_INFORMATION")} />;
};

// TODO: Use apollo pollings
export default ({ windowToken, onSuccess }) => {
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
