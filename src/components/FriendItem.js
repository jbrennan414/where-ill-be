import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { styled } from '@material-ui/core/styles';
import headshot from '../assets/headshot.jpg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { requestFriend, approveFriend } from '../actions/friends';


const SingleRow = styled("div")({
    display:'flex',
    border: '1px solid gray',
    color:'#015249',
    backgroundColor:'white',
    fontFamily: "\"Do Hyeon\", sans-serif",
    justifyContent:'space-between',
    padding: '0px 20px',
    alignItems:'center',
    margin: '0',
});

const AddButton = styled("button")({
    color:'white',
    backgroundColor:'#57BC90',
    fontFamily: "\"Do Hyeon\", sans-serif",
});

const DenyButton = styled("button")({
    color:'white',
    backgroundColor:'red',
    fontFamily: "\"Do Hyeon\", sans-serif",
    marginRight: '3px',
});

class FriendItem extends Component {

    buttonTypeHelper(friend){
        let buttonType;
        const allFriendEmails = this.props.myFriends.map(friend => friend.email);
        const friendIndex = allFriendEmails.findIndex(email => email === friend);

        if (friendIndex === -1){
            return <AddButton onClick={() => this.props.requestFriend(this.props.auth.uid, friend)} id={friend}>ADD</AddButton>
        } else {
            const status = this.props.myFriends[friendIndex].status;

            switch (status) {
                case "pending_approval":
                    buttonType = "pending";
                    break;

                case "requested_you":
                    buttonType = "requested_you";
                    return (
                        <div>
                            <DenyButton onClick={() => this.props.requestFriend(this.props.auth.uid, friend)} id={friend}>DENY</DenyButton>
                            <AddButton onClick={() => this.props.approveFriend(this.props.auth.uid, friend)} id={friend}>APPROVE</AddButton>
                        </div>
                    )

                    break;

                //We will eventually need cases here 
                //for true and false

            }

        }

        return buttonType;

    }


    render() {

        const { friend } = this.props;

        const buttonText = this.buttonTypeHelper(friend)

        return (
            <SingleRow>
                <Avatar alt="user avatar" src={headshot} />
                <p>{friend}</p>
                {this.buttonTypeHelper(friend)}
            </SingleRow>
        )
    }
}



const mapStateToProps = (state) => ({
    auth: state.auth,
    myFriends: state.friends.myFriends
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    requestFriend,
    approveFriend
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FriendItem);
