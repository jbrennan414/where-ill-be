import { UPDATE_AUTH, SIGN_OUT, UPDATE_PROFILE } from '../actions/auth';

const initialState = {
    user: null,
}

export default function(state = initialState, action){
    const { type, data } = action;

    switch(type){
        case UPDATE_AUTH:
            return {
                ...state,
                email: data ? data.email : null,
                uid: data ? data.uid : null
            }
        case SIGN_OUT:
            return {
                ...state,
                email: null,
                user: null,
            }
        case UPDATE_PROFILE:
            return {
                ...state,
                displayName: data ? data.displayName : null,
                email: data ? data.email : null,
            }

        default:
            return state;

    }
}