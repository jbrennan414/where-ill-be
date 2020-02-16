const initialState = {
    dates: [],
}

export default function(state = initialState, action){
    const { type, data } = action;
    switch(type){
        default: 
            return state;
    }
}