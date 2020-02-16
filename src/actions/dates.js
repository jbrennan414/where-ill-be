import * as firebase from 'firebase'

export function addSkiDay(uid, date, resort){
    return async function(dispatch){

        await firebase.database().ref('dates/' + date + "/" + uid).set(resort);

    }

}