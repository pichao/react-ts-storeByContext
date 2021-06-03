// store.js
import React, { createContext, useReducer } from 'react';
import { rootReducer, initState } from './reducers';
// const initialState = {
//     name: 'pitter',
//     title: 'hahahha',
// };
export interface State {
    [propName: string]: any;
}
export interface Actions {
    type: string;
    payload?: object;
}
const store = createContext<{
    state: State;
    dispatch: React.Dispatch<Actions>;
}>({
    state: initState,
    dispatch: () => undefined,
});
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
