import React, { Component } from 'react'
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FriendItem from './FriendItem';

const HeaderText = styled("p")({
    fontSize: '36px',
    display:'flex',
    flexWrap:'wrap',
    color:'#015249',
    fontFamily: "\"Do Hyeon\", sans-serif",
    justifyContent:'center'
});

export default class FindFriends extends Component {
    render() {

        const friends = ["Cody Wise", "Russell Wilson", "Russell Crowe", "Ari Shaffir", "Troy Aikman", "Carolyn Pokorney"]

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
