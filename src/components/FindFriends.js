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

        let myFilteredUsers = allUsers.filter(users => users.includes(this.state.searchedText));
        let myFilteredFriends = myFriends.filter(user => user.email.includes(this.state.searchedText));
        
        //add my friends to a list
        if (this.props && this.props.friends && this.props.friends.myFriends){
            myFilteredFriends.forEach(friend => {
                
                //don't show me in this list
                if (friend.email === myUser){
                    return;
                }
                sortedUsers.push(friend.email);
            })
        }

        //add others to the list
        myFilteredUsers.forEach(friend => {
            //don't show me in this list, either
            if (friend === myUser){
                return;
            }

            if (!sortedUsers.includes(friend)){
                sortedUsers.push(friend)
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
