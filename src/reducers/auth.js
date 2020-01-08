import { UPDATE_AUTH, SIGN_OUT } from '../actions/auth';

const initialState = {
    user: null,
}

export default function(state = initialState, action){
    const { type, data } = action;

    switch(type){
        case UPDATE_AUTH:
            return {
                ...state,
                user: data ? data.email : null,
                uid: data ? data.uid : null
            }
        case SIGN_OUT:
            return {
                ...state,
                user: null,
            }
        default:
            return state;

    }
}