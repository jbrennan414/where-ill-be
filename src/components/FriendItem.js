import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { styled } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { requestFriend, approveFriend, denyFriend, getUserID } from '../actions/friends';

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
    }, 
    name: {
        display:"flex",
        flexDirection:"column"
    },
    displayNameStyle: {
        margin: "0px",
        fontWeight:"bold",
        marginTop: "5px"
    },
    nameStyle: {
        margin: "0px",
        color: "gray",
        marginBottom: "5px"
    },
    requestedStyle: {
        margin: "0px",
        color: "lightgray",
        marginBottom: "5px"
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

        const { status, avatar } = this.props

        switch (status) {
            case "pending_approval":
                return (
                    <SingleRow style={style.pending}>
                        <Avatar style={{"marginLeft":"20px", "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} src={avatar} alt="user avatar" />
                        <div style={{"display":"flex", "flexDirection":"column"}}>
                            <p style={style.displayNameStyle}>{`@${friend}`}</p>
                            <p style={style.requestedStyle}>{name}</p>
                        </div>
                        <p>requested</p>
                    </SingleRow>
                );
            case "requested_you":
                return (
                    <SingleRow style={style.requested_you}>
                        <Avatar style={{"marginLeft":"20px", "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} src={avatar} alt="user avatar" />
                        <div style={{"display":"flex", "flexDirection":"column"}}>
                            <p style={style.displayNameStyle}>{`@${friend}`}</p>
                            <p style={style.nameStyle}>{name}</p>
                        </div>
                        <div>
                            <DenyButton onClick={() => this.props.denyFriend(this.props.auth.uid, friend)} id={friend}>DENY</DenyButton>
                            <AddButton onClick={() => this.props.approveFriend(this.props.auth.uid, friend)} id={friend}>APPROVE</AddButton>
                        </div>
                    </SingleRow>
                );
            case "true":
                return (
                    <SingleRow style={style.friends}>
                        <Avatar style={{"marginLeft":"20px", "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} src={avatar} alt="user avatar" />
                        <div style={{"display":"flex", "flexDirection":"column"}}>
                            <p style={style.displayNameStyle}>{`@${friend}`}</p>
                            <p style={style.requestedStyle}>{name}</p>
                        </div>
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
                        <Avatar style={{"marginLeft":"20px", "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} src={avatar} alt="user avatar" />
                        <div style={{"display":"flex", "flexDirection":"column"}}>
                            <p style={style.displayNameStyle}>{`@${friend}`}</p>
                            <p style={style.nameStyle}>{name}</p>
                        </div>
                        <AddButton onClick={() => this.props.requestFriend(this.props.auth.uid, friend)} id={friend}>ADD</AddButton>
                    </SingleRow>
                );
            }
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
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    requestFriend,
    approveFriend,
    denyFriend,
    getUserID
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FriendItem);
