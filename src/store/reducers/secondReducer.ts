export const secondState = {
    name: 'pitter',
};

export default (state = secondState, action) => {
    switch (action.type) {
        case 'rotate':
            return {
                ...action.payload,
            };
        default:
            return state;
    }
};
