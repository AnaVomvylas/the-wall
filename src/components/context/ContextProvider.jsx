import React, { createContext } from 'react';
import useMainReducer from './useMainReducer';
import Amplify from '@aws-amplify/core';
import { Auth } from 'aws-amplify';

const setUserAction = "SET_USER";

export const MainContext = createContext();

async function checkIfAuthenticated() {
  try {
    const data = await Auth.currentAuthenticatedUser()
    const userInfo = { username: data.username, ...data.attributes }
    return userInfo;
  } catch (err) {
    return null;
  }
};

export const ContextProvider = props => {
  let userInfo;
  checkIfAuthenticated().then(result => userInfo = result);

  const defaultMainState = {
    user: userInfo
  };
  const [mainState, mainDispatch] = useMainReducer(defaultMainState);
  
  const { user } = mainState;
  const setUser = (user) => mainDispatch({ type: setUserAction, user });


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