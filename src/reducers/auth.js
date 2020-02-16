import { UPDATE_AUTH, SIGN_OUT, UPDATE_PROFILE, CREATE_USER } from '../actions/auth';

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
                uid: data ? data.uid : null,
                displayName: data ? data.displayName : null,
                photoURL: data ? data.photoURL : null,
                name: data ? data.name : null,
            }
        case SIGN_OUT:
            return {
                ...state,
                email: null,
                user: null,
                displayName: null,
                name: null,
            }
        case UPDATE_PROFILE:
            return {
                ...state,
                displayName: data ? data.displayName : null,
                email: data ? data.email : null,
                photoURL: data ? data.photoURL : null,
                name: data ? data.name : null,
            }
        case CREATE_USER:
            return {
                ...state,
                displayName: data ? data.user.displayName : null,
                uid: data ? data.user.uid : null,
                email: data ? data.user.email : null,
                name: data ? data.name : null,
            }

        default:
            return state;

    }
}