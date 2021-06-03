export const firstState = {
    showAlert: false,
};

export default (state = firstState, action) => {
    console.log(action, 'bbbbbbbbbbbb');
    switch (action.type) {
        case 'GET_USER_SUCCESS':
            return {
                ...action.payload,
            };
        case 'test_state':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
