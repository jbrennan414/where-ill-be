import { UPDATE_AUTH, SIGN_OUT, UPDATE_PROFILE, CREATE_USER } from '../actions/auth';

const initialState = {
}

export default function(state = initialState, action){
    const { type, data } = action;

    switch(type){
        case UPDATE_AUTH:
            return {
                ...state,
                email: data ? data.email : null,
                uid: data ? data.uid : null,
                displayName: data ? data.displayName : null,
                photoURL: data ? data.photoURL : null,
            }
        case SIGN_OUT:
            return {
                ...state,
                email: null,
                displayName: null,
                uid: null,
                photoURL: null,
            }
        case UPDATE_PROFILE:
            return {
                ...state,
                displayName: data ? data.displayName : null,
                email: data ? data.email : null,
                photoURL: data ? data.photoURL : null,
                notifications: data ? data.notification : null, 
            }
        case CREATE_USER:
            return {
                ...state,
                uid: data ? data.uid : null,
                email: data ? data.email : null,
                displayName: data ? data.displayName : null,
            }

        default:
            return state;

    }
}