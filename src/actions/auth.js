import * as firebase from 'firebase'

export const UPDATE_AUTH = "UPDATE_AUTH";
export const SIGN_OUT = "SIGN_OUT";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const CREATE_USER = "CREATE_USER";

export function updateAuth(){
    return async function(dispatch){


        await firebase.auth().onIdTokenChanged(function(user) {

            user.reload()

            if (user.emailVerified){
                console.log("AAAAAAAAA EMAIL IS VERIFIED")
            } else {
                console.log("BBbBBBBB email not verified")
            }

            return dispatch({
                type: UPDATE_AUTH,
                data: user
            })
        })
    }
}

export function createUser(newUser){

    return async function (dispatch){
        return dispatch({
            type: CREATE_USER,
            data: newUser,
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

export function updateMyProfile(data){

    const { displayName, uid, photoURL } = data;
    // update users table
    firebase.database().ref('users/' + uid).update({
        displayName: displayName,
        photoURL: photoURL
    });

    // update auth object
    return async function (dispatch){
        await firebase.auth().currentUser.updateProfile({
            displayName: displayName,
            photoURL: photoURL
        }).then(function() {

            data.notification = {
                severity:"success",
                message:"Profile updated!"
            }

            return dispatch({
                type: UPDATE_PROFILE,
                data:data,
            })
        }).catch(function(error) {
            // An error happened.
        });
    }
}