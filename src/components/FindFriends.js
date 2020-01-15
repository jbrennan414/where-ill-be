import React, { Component } from 'react'
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FriendItem from './FriendItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as firebase from 'firebase'

const HeaderText = styled("p")({
    fontSize: '36px',
    display:'flex',
    flexWrap:'wrap',
    color:'#015249',
    fontFamily: "\"Do Hyeon\", sans-serif",
    justifyContent:'center'
});

class FindFriends extends Component {

    getFriends(userId){
        let friends = [];
        let ref = firebase.database().ref("users");
        ref.orderByChild("email").on("child_added", function(snapshot) {

            const individualEmail = snapshot.val().email;

        });
    }

    render() {

        const friends = this.getFriends(this.props.auth.uid) || ["Louis", "Michael", "John", "Kyle"];

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
                {friends.map(friend => {
                    console.log("this is friend", friend)
                    return <FriendItem key={friend} friend={friend} />
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FindFriends);
