import { 
    GET_ALL_USERS, 
} from '../actions/friends';

const initialState = {
    allUsers: [],
}

export default function(state = initialState, action){
    const { type, data } = action;

    switch(type){
        case GET_ALL_USERS:
            return {
                ...state,
                allUsers: data ? data : [],
            }

        default: 
            return state;
    }
}