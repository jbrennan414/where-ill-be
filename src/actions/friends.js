import * as firebase from 'firebase'

export const GET_ALL_USERS = "GET_ALL_USERS";
export const REQUEST_FRIEND = "REQUEST_FRIEND";

export function getUsers(myUID){
    return async function(dispatch){

        await firebase.database().ref('users').on("value", function(snapshot){
            if (snapshot.val()[myUID]){
                const myData = snapshot.val()[myUID];
                const myFriends = myData.friends;

                // Add to the friends object
                const myFriendsUIDs = Object.keys(myFriends);
                const allUserKeys = Object.keys(snapshot.val())

                let users = {};
                users["friends"] = {};
                users["strangers"] = {};

                allUserKeys.forEach(uid => {
                    if (myFriendsUIDs.includes(uid)){
                        const user = getUserDisplayName(myUID, uid, snapshot.val());
                        users["friends"][uid] = user;
                    } else {
                        const user = getUserDisplayName(myUID, uid, snapshot.val());
                        users["strangers"][uid] = user;
                    }
                })

                return dispatch({
                    type: GET_ALL_USERS,
                    data: users
                })
            }
        })
    }
}

export function requestFriend(requester, requestee){
    return async function (dispatch){
        let requesteeUID = null;
        //get requestee's UID
        await firebase.database().ref('users').on("value", function(snapshot){

            const allUsersValues = Object.values(snapshot.val());
            const allUserKeys = Object.keys(snapshot.val());

            const requesteeKey = allUsersValues.findIndex(user => user.displayName === requestee);
            requesteeUID = allUserKeys[requesteeKey];
        })

        //add a row on requester's friends object
        firebase.database().ref('users/' + requester + "/friends/" + requesteeUID).set("pending_approval");

        //add a row on requestee's object that says "requested"
        firebase.database().ref('users/' + requesteeUID + "/friends/" + requester).set("requested_you");

        return;

    }

}

export function approveFriend(myUID, targetUser){
    return async function () {

        const targetUserID = getUserID(targetUser);

        //update both user records
        await firebase.database().ref('users/' + myUID + "/friends/" + targetUserID).set("true");
        await firebase.database().ref('users/' + targetUserID + "/friends/" + myUID).set("true");
    }

}

export function denyFriend(myUID, targetUser){
    return async function () {

        const targetUserID = getUserID(targetUser);

        //update both user records
        await firebase.database().ref('users/' + myUID + "/friends/" + targetUserID).set("false");
        await firebase.database().ref('users/' + targetUserID + "/friends/" + myUID).set("false");
    }
    
}

// we don't want to show the user's UID 
// in the front end, so use this translation function

function getUserDisplayName(myUID, uid, snapshot){
    const snapshotKeys = Object.keys(snapshot);
    const snapshotValues = Object.values(snapshot);
    const userIndex = snapshotKeys.findIndex(key => key === uid);
    const displayName = snapshotValues[userIndex].displayName;
    const name = snapshotValues[userIndex].name;
    const photoURL = snapshotValues[userIndex].photoURL

    //Get our status for this user
    const myFriends = snapshot[myUID].friends;
    const userStatus = myFriends[uid];

    const user = {
        displayName: displayName,
        name: name,
        status: userStatus,
        avatar: photoURL,
    }

    return user;

}

function getUserID(displayName){
    let uid;

    firebase.database().ref('users').orderByChild("displayName").on("value", function(snapshot){
        const snapshotCopy = snapshot.val();
        const snapshotKeys = Object.keys(snapshotCopy);
        const snapshotValues = Object.values(snapshotCopy);
        const displayNameIndex = snapshotValues.findIndex(value => value.displayName === displayName)
        uid = snapshotKeys[displayNameIndex];
    })        

    return uid;
}