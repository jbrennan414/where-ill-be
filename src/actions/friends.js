import * as firebase from 'firebase'

export const GET_ALL_USERS = "GET_ALL_USERS";

export function getUsers(){
    return async function(dispatch){

        await firebase.database().ref('users').orderByChild("email").on("value", function(snapshot){
            const userEmails = Object.values(snapshot.val());
            const justEmails = [];
            userEmails.forEach(email => {
                justEmails.push(email.email)
            })

                return dispatch({
                    type: GET_ALL_USERS,
                    data: justEmails
                })
        })
    }
}