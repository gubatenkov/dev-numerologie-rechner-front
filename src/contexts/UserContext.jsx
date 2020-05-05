import React, { useContext, createContext, useState } from "react";
import { currentUserQuery } from "../graphql/Queries";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { useEffect } from "react";

const UserContext = createContext({});

export const UserProvider = props => {
  const value = useUserProvider();
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

const useUserProvider = () => {
  const [user, setUser] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const client = useApolloClient();

  const fetchUser = () => {
    console.log("fetchUser");
    setIsFetching(true);
    client
      .query({ query: currentUserQuery })
      .then(response => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log("error while refetching user:", e.message);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    isFetching,
    fetchUser
  };
};
