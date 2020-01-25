import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { styled } from '@material-ui/core/styles';
import headshot from '../assets/headshot.jpg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { requestFriend } from '../actions/friends';


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

class FriendItem extends Component {

    render() {

        const { friend } = this.props

        return (
            <SingleRow>
                <Avatar alt="user avatar" src={headshot} />
                <p>{friend}</p>
                <AddButton onClick={() => this.props.requestFriend(this.props.auth.uid, friend)} id={friend}>ADD</AddButton>
            </SingleRow>
        )
    }
}



const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    requestFriend,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FriendItem);
