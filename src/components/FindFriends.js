import React, { Component } from 'react'
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FriendItem from './FriendItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getUsers } from '../actions/friends';
import { findAllByAltText } from '@testing-library/react';

const HeaderText = styled("p")({
    fontSize: '36px',
    display:'flex',
    flexWrap:'wrap',
    color:'#015249',
    fontFamily: "\"Do Hyeon\", sans-serif",
    justifyContent:'center'
});

const style = {
    searchBox: {
        backgroundColor: 'white',
        fontSize: '14px',
        borderRadius:'30px',
        height: '4em',
        marginBottom: '10px',
    }
}

class FindFriends extends Component {

    constructor(props) {
        super(props);
    
        this.state = { 
            searchedText: '',
        };

    }

    componentDidMount(){
        this.props.getUsers(this.props.auth.uid);
    }
    
    render() {

        const allUsers = this.props.friends.allUsers.sort();
        const myFriends = this.props.friends.myFriends.sort();
        const myUser = this.props.auth.email;
        let sortedUsers = [];
        let checkArray = [];

        const requestedMe = myFriends.filter(friends => friends.status === "requested_you");
        const myRequests = myFriends.filter(friends => friends.status === "pending_approval");
        const myRealFriends = myFriends.filter(friends => friends.status === "true");

        let newSortedUsers = sortedUsers.concat(requestedMe, myRequests, myRealFriends);
        newSortedUsers.forEach(user => {
            checkArray.push(user.email);
        });

        // if I friended myself somehow, remove it
        const myUsersIndex = checkArray.findIndex(item => item === myUser);
        if (myUsersIndex !== -1){
            newSortedUsers.splice(myUsersIndex, 1);
        }

        //add all others, that are not blocked
        allUsers.forEach(user => {
            if (!checkArray.includes(user.email) && user.email !== myUser){
                newSortedUsers.push(user);
            }
        })

        return (
            <div>
                <HeaderText>FIND FRIENDS</HeaderText>
                <TextField
                    style={style.searchBox}
                    id="search"
                    label="SEARCH"
                    type="text"
                    onChange={val => this.setState({ searchedText: val.target.value })}
                />
                {newSortedUsers.map((friend, i) => {
                    return <FriendItem key={i} friend={friend.displayName ? friend.displayName : friend.email} avatar={friend.avatar} />
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    friends: state.friends,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getUsers,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FindFriends);
