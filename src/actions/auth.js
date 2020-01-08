import * as firebase from 'firebase'

export const UPDATE_AUTH = "UPDATE_AUTH";
export const SIGN_OUT = "SIGN_OUT";

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

export function signOut(){
    return async function (dispatch){
        await firebase.auth().signOut().then(function() {
            return dispatch({
                type: SIGN_OUT,
                data: null,
            });

        }).catch(function(error) {
            // An error happened.
        });
    }
}