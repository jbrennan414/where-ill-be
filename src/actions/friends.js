import * as firebase from 'firebase'

export const GET_ALL_USERS = "GET_ALL_USERS";
export const REQUEST_FRIEND = "REQUEST_FRIEND";
export const GET_MY_FRIENDS = "GET_MY_FRIENDS";

export function getUsers(myUID){
    return async function(dispatch){

        await firebase.database().ref('users').orderByChild("email").on("value", function(snapshot){
            const userEmails = Object.values(snapshot.val());
            //get my users' index
            const dbKeys = Object.keys(snapshot.val());
            
            // We need a bit of work here to show my friends, etc
            const myUsersDBIndex = dbKeys.findIndex(key => key === myUID);
            const myUsersData = Object.values(snapshot.val())[myUsersDBIndex];
            const myFriendsUIDs = Object.keys(myUsersData["friends"]);
            const myFriends = [];
            myFriendsUIDs.forEach(uid => {
                const useremail = getUserEmail(uid, snapshot.val())
                myFriends.push(useremail);
            })

            dispatch({
                type: GET_MY_FRIENDS,
                data: myFriends,
            })

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
        let requesteeUID = null;
        //get requestee's UID
        await firebase.database().ref('users').on("value", function(snapshot){
            const allUsersKeys = Object.values(snapshot.val());
            const allUserKeys = Object.keys(snapshot.val());

            const requesteeKey = allUsersKeys.findIndex(user => user.email === requestee);
            requesteeUID = allUserKeys[requesteeKey];
        })

        //add a row on requester's friends object
        firebase.database().ref('users/' + requester + "/friends/" + requesteeUID).set("pending_approval");

        //add a row on requestee's object that says "requested"
        firebase.database().ref('users/' + requesteeUID + "/friends/" + requester).set("requested");

        return;

    }

}

// we don't want to show the user's UID 
// in the front end, so use this translation function

function getUserEmail(uid, snapshot){
    const snapshotKeys = Object.keys(snapshot);
    const uidIndex = snapshotKeys.findIndex(item => item === uid);
    const status = Object.values(snapshot)[uidIndex].friends[uid];


    const user =  {
        email: Object.values(snapshot)[uidIndex].email,
        status: status,
    }

    return user;

}