import React, { Component } from 'react'
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FriendItem from './FriendItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
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


    componentDidMount(){
        this.props.getUsers(this.props.auth.uid);
    }
    render() {
        const allUsers = this.props.friends.allUsers.sort();
        let sortedUsers = [];
        
        //add my friends to a list
        if (this.props && this.props.friends && this.props.friends.myFriends){
            this.props.friends.myFriends.forEach(friend => {
                sortedUsers.push(friend.email);
            })
        }

        //add others to the list
        allUsers.forEach(friend => {
            if (!sortedUsers.includes(friend)){
                sortedUsers.push(friend)
            }
        })


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
                {sortedUsers.map((friend, i) => {
                    return <FriendItem key={i} friend={friend} />
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
