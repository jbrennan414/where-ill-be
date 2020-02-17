import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { styled } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { requestFriend, approveFriend, denyFriend } from '../actions/friends';

const style = {
    friends: {
        color:'white',
        backgroundColor:'#57BC90',
    },
    pending: {
        color:'white',
        backgroundColor:'#77C9D4',
    },
    requested_you:{
        color:'white',
        backgroundColor: '#015249'
    }
}

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

    buttonTypeHelper(friend, name){
        let buttonType;
        const allFriendDisplayNames = this.props.myFriends.map(friend => friend.displayName);
        const friendIndex = allFriendDisplayNames.findIndex(displayName => displayName === friend);

        const { avatar } = this.props;

        if (friendIndex === -1){
            return (
                <SingleRow>
                    <Avatar src={avatar} alt="user avatar" />
                    <p>{name}</p>
                    <p>{`@${friend}`}</p>
                    <AddButton onClick={() => this.props.requestFriend(this.props.auth.uid, friend, name)} id={friend}>ADD</AddButton>
                </SingleRow>
            );
            
        } else {
            const status = this.props.myFriends[friendIndex].status;

            switch (status) {
                case "pending_approval":
                    buttonType = "pending";
                    return (
                        <SingleRow style={style.pending}>
                            <Avatar alt="user avatar" />
                            <p>{name}</p>
                            <p>{`@${friend}`}</p>
                            <p>requested</p>
                        </SingleRow>
                    );
                case "requested_you":
                    buttonType = "requested_you";
                    return (
                        <SingleRow style={style.requested_you}>
                            <Avatar alt="user avatar" />
                            <p>{name}</p>
                            <p>{`@${friend}`}</p>
                            <DenyButton onClick={() => this.props.denyFriend(this.props.auth.uid, friend)} id={friend}>DENY</DenyButton>
                            <AddButton onClick={() => this.props.approveFriend(this.props.auth.uid, friend)} id={friend}>APPROVE</AddButton>
                        </SingleRow>
                    );

                case "true":
                    return (
                        <SingleRow style={style.friends}>
                            <Avatar alt="user avatar" />
                            <p>{name}</p>
                            <p>{`@${friend}`}</p>
                            <p>friends!</p>
                        </SingleRow>
                    );
                case "false":
                    //in this case, they're blocked, let's not render
                    // the name on either
                    return(<div></div>)
                default: 
                return (
                    <SingleRow>
                        <Avatar src={avatar} alt="user avatar" />
                        <p>{name}</p>
                        <p>{`@${friend}`}</p>
                        <p>FRIENDS!</p>
                    </SingleRow>
                );            }

        }

        return buttonType;

    }


    render() {
        const { friend, name } = this.props;

        return (
            this.buttonTypeHelper(friend, name)
        )
    }
}



const mapStateToProps = (state) => ({
    auth: state.auth,
    myFriends: state.friends.myFriends
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    requestFriend,
    approveFriend,
    denyFriend,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FriendItem);
