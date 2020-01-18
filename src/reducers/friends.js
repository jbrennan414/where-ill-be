import { GET_ALL_USERS } from '../actions/friends';

const initialState = {
    allUsers: null,
}

export default function(state = initialState, action){
    const { type, data } = action;
    switch(type){
        case GET_ALL_USERS:
            return {
                ...state,
                allUsers: data ? data : null,
            }
        
        default: 
            return state;
    }
}