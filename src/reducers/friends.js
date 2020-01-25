import { 
    GET_ALL_USERS, 
    GET_MY_FRIENDS 
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
                allUsers: data ? data : null,
            }

        case GET_MY_FRIENDS:
            return {
                ...state,
                myFriends: data ? data: null,
            }
        
        default: 
            return state;
    }
}