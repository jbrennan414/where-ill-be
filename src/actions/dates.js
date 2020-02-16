import * as firebase from 'firebase'
export const GET_THIS_MONTHS_SKI_DAYS = "GET_THIS_MONTHS_SKI_DAYS";

export function addSkiDay(uid, date, resort){
    return async function(dispatch){

        await firebase.database().ref('dates/' + date + "/" + uid).set(resort);

    }

}

export function getThisMonthsSkiDays(uid, month){
    return async function(dispatch){
        await firebase.database().ref('dates').on("value", function(snapshot){

            //Eeeew I'm gonna loop over every day. 
            //If the month matches the one I want, 
            //keep the record....eeew
            const snapshotKeys = Object.keys(snapshot.val());
            const snapshotValues = Object.values(snapshot.val());
            let thisMonth = {};
            snapshotKeys.forEach((item, index) => {
                if (item.slice(0,2) === month){
                    thisMonth[snapshotKeys[index]] = snapshotValues[index];
                }
            });

            return dispatch({
                type: GET_THIS_MONTHS_SKI_DAYS,
                data: thisMonth,
            });
        })
    }
}