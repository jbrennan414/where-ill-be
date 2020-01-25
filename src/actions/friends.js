import * as firebase from 'firebase'

export const GET_ALL_USERS = "GET_ALL_USERS";
export const REQUEST_FRIEND = "REQUEST_FRIEND";

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

export function requestFriend(requester, requestee){
    return async function (dispatch){
        
        //THIS IS BROKEN RIGHT NOW BUT WHATEVER, IT'S CLOSE
        //add a row on requester's friends object
        let friends  = {}
        friends[requester] = "pending_approval";

        let friends2 = {};
        friends2["/users/" + requester + "/friends/"] = friends;

        return firebase.database().ref().update(friends2);

        //add a row on requestee's object


    }

}