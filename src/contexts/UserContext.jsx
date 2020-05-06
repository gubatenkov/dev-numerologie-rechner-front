import React, { useContext, createContext, useState } from "react";
import { currentUserQuery } from "../graphql/Queries";
import { deleteUserMutation } from "../graphql/Mutations";
import { useApolloClient } from "@apollo/react-hooks";
import { deleteUserAuthData } from "../utils/AuthUtils";
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

  const fetchUser = async () => {
    setIsFetching(true);
    try {
      const response = await client.query({ query: currentUserQuery });
      setUser(response.data);
    } catch (e) {
      console.log("error while refetching user:", e.message);
    }
    setIsFetching(false);
  };

  const deleteUser = async () => {
    // error should be caught whenever the func is called
    await client.mutate({ query: deleteUserMutation });
    deleteUserAuthData();
    setUser(undefined);
  };

  useEffect(() => {
    fetchUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    user,
    isFetching,
    fetchUser,
    deleteUser
  };
};
