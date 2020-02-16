import { GET_THIS_MONTHS_SKI_DAYS } from '../actions/dates';


const initialState = {
    thisMonthsSkiDays: [],
}

export default function(state = initialState, action){
    const { type, data } = action;
    switch(type){
        case GET_THIS_MONTHS_SKI_DAYS:
            return {
                ...state,
                thisMonthsSkiDays: data,
            }
        default: 
            return state;
    }
}