import { 
    GET_ALL_USERS, 
} from '../actions/friends';

const initialState = {
    friends: [],
    strangers: [],
}

export default function(state = initialState, action){
    const { type, data } = action;

    switch(type){
        case GET_ALL_USERS:
            return {
                ...state,
                friends: data ? data.friends : [],
                strangers: data ? data.strangers : []
            }

        default: 
            return state;
    }
}