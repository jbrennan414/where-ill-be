import { combineReducers } from 'redux';

import auth from './reducers/auth';
import friends from './reducers/friends';

const rootReducer = combineReducers({
    auth,
    friends
})

export default rootReducer;