import React, { createContext } from 'react';
import useMainReducer from './useMainReducer';
import { Auth } from 'aws-amplify';

const authenticateAction = "AUTHENTICATE";

export const MainContext = createContext();

async function checkIfAuthenticated() {
  try {
    await Auth.currentAuthenticatedUser();
    return true;
  } catch (err) {
    return false;
  }
};

export const ContextProvider = props => {
  let isUserAuthenticated;
  checkIfAuthenticated().then(result => isUserAuthenticated = result);

  const defaultMainState = {
    isAuthenticated: isUserAuthenticated
  };
  const [mainState, mainDispatch] = useMainReducer(defaultMainState);


  const { isAuthenticated } = mainState;
  const setIsAuthenticated = (value) => mainDispatch({ type: authenticateAction, value });

  const mainContextValue = {
    isAuthenticated,
    setIsAuthenticated
  };

  return (
    <MainContext.Provider value={mainContextValue}>
      {props.children}
    </MainContext.Provider>
  );
};