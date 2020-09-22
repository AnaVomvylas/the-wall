import React, { createContext } from 'react';
import useMainReducer from './useMainReducer';

export const MainContext = createContext();

const getUserFromLocalStorage = () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (err) {
      return null;
    }
  };

export const ContextProvider = props => {
    const defaultMainState = {
        user: getUserFromLocalStorage()
    };
    const [mainState, mainDispatch] = useMainReducer(defaultMainState);


    
    const { user } = mainState;
    const setUser = (user) => mainDispatch({ type: "SET_USER", user });



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