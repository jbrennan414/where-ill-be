import { combineReducers } from 'redux';

import auth from './reducers/auth';
import friends from './reducers/friends';
import dates from './reducers/dates';

const rootReducer = combineReducers({
    auth,
    friends,
    dates,
})

export default rootReducer;