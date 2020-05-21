import React, { useContext, createContext, useState } from "react";
import { currentUserQuery } from "../graphql/Queries";
import {
  deleteUserMutation,
  setUserLangIdMutation
} from "../graphql/Mutations";
import { useApolloClient } from "@apollo/react-hooks";
import { deleteUserAuthData } from "../utils/AuthUtils";
import { useEffect } from "react";
import { LANGUAGES, LANGUAGE_KEY } from "../utils/Constants";
import i18next from "i18next";

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
  const [currentLanguage, setCurrentLanguage] = useState(
    LANGUAGES.find(langObj => langObj.id === i18next.language)
  );
  const [user, setUser] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const client = useApolloClient();
  const [currentAnalysis, setCurrentAnalysis] = useState();

  const fetchUser = async () => {
    setIsFetching(true);
    try {
      const response = await client.query({ query: currentUserQuery });
      setUser(response.data);
      const userLangId = response.data.currentUser.langId;
      if (userLangId) {
        if (currentLanguage.id !== userLangId) {
          const newLang = LANGUAGES.find(langObj => langObj.id === userLangId);
          if (newLang === undefined) {
            // No lang matches, async state backend&frontend
            console.log("Frontend and Backend languages are out of sync!");
          } else {
            setCurrentLanguage(newLang);
          }
        }
      }
    } catch (e) {
      console.log("error while refetching user:", e.message);
    }
    setIsFetching(false);
  };

  const deleteUser = async () => {
    // error should be caught whenever the func is called
    await client.mutate({ mutation: deleteUserMutation });
    deleteUserAuthData();
    setUser(undefined);
  };

  const logoutUser = () => {
    deleteUserAuthData();
    setUser(undefined);
  };

  useEffect(() => {
    fetchUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (currentLanguage.id !== i18next.language) {
      if (currentAnalysis) {
        try {
          currentAnalysis.refetch();
        } catch (e) {
          console.log("catch currentAnalysis");
          setCurrentAnalysis(undefined);
        }
      }
      i18next.changeLanguage(currentLanguage.id);
      localStorage.setItem(LANGUAGE_KEY, currentLanguage.id);
    }
  }, [currentLanguage]);

  const setLanguageWithId = async id => {
    try {
      await client.mutate({
        mutation: setUserLangIdMutation,
        variables: { langId: id }
      });
    } catch (e) {
      console.log("user might not be logged in:", e.message);
    }

    setCurrentLanguage(LANGUAGES.find(lang => lang.id === id));
  };

  return {
    user,
    isFetching,
    fetchUser,
    deleteUser,
    logoutUser,
    currentLanguage,
    setLanguageWithId,
    setCurrentAnalysis
  };
};
