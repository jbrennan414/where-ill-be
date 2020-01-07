import { UPDATE_AUTH } from '../actions/auth';

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
        default:
            return state;

    }
}