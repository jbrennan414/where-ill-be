import * as firebase from 'firebase'

export const GET_THIS_MONTH_DATES = "GET_THIS_MONTH_DATES";

export function getThisMonthDates(month){
    return async function(dispatch){

        await firebase.database().ref('dates').on("value", function(snapshot){
            const allDates = Object.keys(snapshot.val());
            let thisMonth = [];
            //this sucks and is ugly, watch out
            allDates.forEach(date => {
                if (date.substring(0,2) === month){
                    thisMonth.push(date);
                }
            })

            return dispatch({
                type: GET_THIS_MONTH_DATES,
                data: thisMonth,
            })
        })
    }
}