import { GET_THIS_MONTH_DATES } from '../actions/dates';

const initialState = {
    dates: [],
}

export default function(state = initialState, action){
    const { type, data } = action;
    switch(type){
        case GET_THIS_MONTH_DATES:
            return {
                ...state,
                thisMonth: data,
            }
        
        default: 
            return state;
    }
}