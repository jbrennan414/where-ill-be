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
      displayName: email,
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


            var actionCodeSettings = {
                url: 'https://www.whereillbe.com/finishSignUp',
                handleCodeInApp: true,
            };
            firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
                .then(function() {
                    console.log("YOU FUCKING DID IT!")
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                window.localStorage.setItem('emailForSignIn', email);
            })
            .catch(function(error) {
                console.log("YOU HAD AN ERROR", error)
                // Some error occurred, you can inspect the code: error.code
            });

    
            return dispatch({
                type: CREATE_USER,
                data: user,
            })
        })
        .catch(function(error) {
        // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/weak-password') {
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
        var errorMessage = error.message;

        console.log(errorMessage)
        // ...
      });
    }
}

export function updateProfile(data){

    const { displayName, email, phoneNumber, uid, photoURL } = data;
    // update users table
    firebase.database().ref('users/' + uid).set({
        email: email,
        displayName: displayName,
        photoURL: photoURL
    });

    // update auth object
    return async function (dispatch){
        await firebase.auth().currentUser.updateProfile({
            displayName: displayName,
            email: email,
            phoneNumber: phoneNumber,
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