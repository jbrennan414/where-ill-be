import { combineReducers } from 'redux';

import auth from './reducers/auth';
import friends from './reducers/friends';
import dates from './reducers/dates';

const appReducer = combineReducers({
    auth,
    friends,
    dates,
});

const rootReducer = (state, action) => {
    if (action.type === "SIGN_OUT"){
        state = undefined;
    }
    return appReducer(state, action)
}

export default rootReducer;