import React, { createContext, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

export const MainContext = createContext();

export const ContextProvider = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    checkIfAuthenticated();
  }, []);

  async function checkIfAuthenticated() {
    try {
      debugger;
      const data = await Auth.currentAuthenticatedUser();
      setUser({ username: data.username, ...data.attributes });
    } catch (err) {
      return null;
    }
  };

  const mainContextValue = {
    user,
    setUser
  };

  return (
    <MainContext.Provider value={mainContextValue}>
      {props.children}
    </MainContext.Provider>
  );
};