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

    let { email, password } = data; 

    return async function (dispatch){
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(result) {
            console.log("this is our daaaata", data)
            console.log("this is our results", result)

            let newUser = {};
            newUser["email"] = data.email;
            newUser["displayName"] = "swag";
            newUser["uid"] = result.user.uid;

            result.user.updateProfile({
                displayName: data.displayName
            })

            return dispatch({
                type: CREATE_USER,
                data: newUser,
            })

            
        }).catch(function(error) {
          console.log(error);
        });

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