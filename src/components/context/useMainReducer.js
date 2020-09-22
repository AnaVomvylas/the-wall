import { useReducer } from 'react';

const setUser = (state, user) => {
    try {
        // const valueToStore =
        //     value instanceof Function ? value(storedValue) : value;
        window.localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
        console.log(error);
    }
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