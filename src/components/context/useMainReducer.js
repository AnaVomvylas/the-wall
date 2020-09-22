import { useReducer } from 'react';

const setIsAuthenticated = (state, value) => ({ ...state, isAuthenticated: value });

const mainReducer = (state, action) => {
    switch (action.type) {
        case "AUTHENTICATE":
            return setIsAuthenticated(state, action.value);
        default:
            return state;
    }
};

const useMainReducer = (defaultState) => {
    return useReducer(mainReducer, defaultState);
};

export default useMainReducer;