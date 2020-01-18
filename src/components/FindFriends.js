import React, { Component } from 'react'
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FriendItem from './FriendItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as firebase from 'firebase'
import { getUsers } from '../actions/friends';

const HeaderText = styled("p")({
    fontSize: '36px',
    display:'flex',
    flexWrap:'wrap',
    color:'#015249',
    fontFamily: "\"Do Hyeon\", sans-serif",
    justifyContent:'center'
});

class FindFriends extends Component {

    render() {
        const allUsers = this.props.friends.allUsers;

        return (
            <div>
                <HeaderText>FIND FRIENDS</HeaderText>
                <TextField
                    style={{"width":"85%", "backgroundColor":"white", "fontSize":"14px"}}
                    id="search"
                    label="Search"
                    type="text"
                    // onChange={val => this.setState({ confirmPass: val.target.value })}
                />
                {allUsers.map(friend => {
                    console.log("this is friend", friend)
                    return <FriendItem key={friend} friend={friend} />
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
    getUsers
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FindFriends);
