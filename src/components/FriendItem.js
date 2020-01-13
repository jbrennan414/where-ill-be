import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { styled } from '@material-ui/core/styles';
import headshot from '../assets/headshot.jpg';

const SingleRow = styled("p")({
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

export default class FriendItem extends Component {
    render() {

        const { friend } = this.props

        return (
            <SingleRow>
                <Avatar alt="user avatar" src={headshot} />
                <p>{friend}</p>
                <AddButton>ADD</AddButton>
            </SingleRow>
        )
    }
}
