import React, { Component } from 'react'
import { styled } from '@material-ui/core/styles';
import FriendItem from './FriendItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getUsers } from '../actions/friends';
import CircularProgress from '@material-ui/core/CircularProgress';

const HeaderText = styled("p")({
    fontSize: '36px',
    display:'flex',
    flexWrap:'wrap',
    color:'#015249',
    fontFamily: "\"Do Hyeon\", sans-serif",
    justifyContent:'center'
});

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

    renderFriends(){
        let requested_you = {};
        let requested = {};
        let realFriends = {};
        Object.values(this.props.friends).forEach((friend, i) => {

            switch (friend.status) {
                case "requested_you":
                    requested_you[Object.keys(this.props.friends)[i]] = friend;
                    break;
                
                case "pending_approval":
                    requested[Object.keys(this.props.friends)[i]] = friend;
                    break;

                case "true":
                    realFriends[Object.keys(this.props.friends)[i]] = friend;
                    break;

                default:
                    break;
            }

        })

        let friendsObject = {...requested_you, ...requested, ...realFriends};


        let friends = [];
        Object.values(friendsObject).forEach((item, i) => {
            friends.push(<FriendItem key={i} status={item.status} name={item.name} friend={item.displayName} avatar={item.avatar} />)
        })

        return friends;

    }

    renderStrangers(){
        let strangers = [];
        Object.values(this.props.strangers).forEach((item, i) => {
            if (this.props.auth.displayName == item.displayName){
                return;
            }

            strangers.push(<FriendItem key={i} status={item.status} name={item.name} friend={item.displayName} avatar={item.avatar} />)
        });

        return strangers;

    }
    
    render() {

        if (!this.props.friends || !this.props.strangers){
            return <CircularProgress />;
        }

        return (
            <div>
                <HeaderText>FIND FRIENDS</HeaderText>
                {this.renderFriends()}
                {this.renderStrangers()}
                {/* <TextField
                    style={style.searchBox}
                    id="search"
                    label="SEARCH"
                    type="text"
                    onChange={val => this.setState({ searchedText: val.target.value })}
                /> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    friends: state.friends.friends,
    strangers: state.friends.strangers,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getUsers,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FindFriends);
