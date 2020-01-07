import * as firebase from 'firebase'

export const UPDATE_AUTH = "UPDATE_AUTH";

export function updateAuth(){
    return async function(dispatch){

        await firebase.auth().onAuthStateChanged(function(user) {
            return dispatch({
                type: UPDATE_AUTH,
                data: user
            })
        })
    }
}