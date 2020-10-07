import { useReducer } from 'react';

const setUser = (state, user) => {
    localStorage.setItem('user', user);
    return { ...state, user: user };
};

const mainReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return setUser(state, action.user);
        default:
            return state;
    }
};

const useMainReducer = (defaultState) => {
    return useReducer(mainReducer, defaultState);
};

export default useMainReducer;