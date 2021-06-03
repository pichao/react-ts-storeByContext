export const combineReducers = (reducers) => {
    return (state, action) => {
        console.log(state, 'wwwwwwwwwwww');
        return Object.keys(reducers).reduce((acc, prop) => {
            console.log(acc, 'qqqqqqqqqqqq');

            return {
                ...acc,
                ...reducers[prop](state, action),
                // ...reducers[prop]({ [prop]: acc[prop] }, action),
            };
        }, state);
    };
};
