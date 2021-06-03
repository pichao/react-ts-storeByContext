import firstReducer, { firstState } from './firstReducer';
import seconeReducer, { secondState } from './secondReducer';
import { combineReducers } from 'utils/index';

export const rootReducer = combineReducers({
    // 耦合性太强
    firstReducer,
    seconeReducer,
});
export const initState = {
    firstState,
    secondState,
};
