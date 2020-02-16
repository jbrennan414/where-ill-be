import * as firebase from 'firebase'

export const UPDATE_AUTH = "UPDATE_AUTH";
export const SIGN_OUT = "SIGN_OUT";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const CREATE_USER = "CREATE_USER";

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

    export function createUser(data){

    const { email, password, displayName } = data; 
    let user = null;

    return async function (dispatch){
        await firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
            user = firebase.auth().currentUser;
            }).then(function () {
                user.updateProfile({
                    displayName: displayName
                });

                firebase.database().ref('users/' + user.uid).set({
                    name: data.name,                   
                    displayName: data.displayName,
                    photoURL: "",
                });

              }).catch(function(error) {
                console.log(error.message);
              });


              return dispatch({
                type: CREATE_USER,
                data: user,
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

export function signIn(email, password){
    return async function (){
       await firebase.auth().signInWithEmailAndPassword(email, password).then(function(error) {
        // Handle Errors here.
        var errorMessage = error.message;

        console.log(errorMessage)
        // ...
      });
    }
}

export function updateMyProfile(data){

    const { displayName, name, uid, photoURL } = data;
    // update users table
    firebase.database().ref('users/' + uid).set({
        name:name,
        displayName: displayName,
        photoURL: photoURL
    });

    // update auth object
    return async function (dispatch){
        await firebase.auth().currentUser.updateProfile({
            displayName: displayName,
            photoURL: photoURL
        }).then(function() {
            return dispatch({
                type: UPDATE_PROFILE,
                data:data,
            })
        }).catch(function(error) {
            // An error happened.
        });
    }
}