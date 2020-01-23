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

//add the user to our users table
function writeUserData(userId, email) {
    firebase.database().ref('users/' + userId).set({
      email: email,
    });
}

// function createDates(date){
//     firebase.database().ref('dates/' + date).set({
//         skiers:"none",
//     })
// }

export function createUser(email, password){
    return async function (dispatch){
        await firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {

            writeUserData(user.user.uid, user.user.email)

            // for(let i = 1; i < 32; i++){
            //     let date = ("0"+i).slice(-2)
            //     createDates(`05${date}2020`);
            // }

    
            return dispatch({
                type: CREATE_USER,
                data: user,
            })
        })
        .catch(function(error) {
        // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
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
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage)
        // ...
      });
    }
}

export function updateProfile(data){

    const { displayName, email, phoneNumber } = data;

    return async function (dispatch){
        await firebase.auth().currentUser.updateProfile({
            displayName: displayName,
            email: email,
            phoneNumber: phoneNumber,
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