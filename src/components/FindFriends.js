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
        let friends = [];
        Object.values(this.props.friends).forEach((item, i) => {
            friends.push(<FriendItem key={i} status={item.status} name={item.name} friend={item.displayName} avatar={item.avatar} />)
        })

        return friends;

    }

    renderStrangers(){
        let strangers = [];
        Object.values(this.props.strangers).forEach((item, i) => {
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
                {/* {newSortedUsers.map((friend, i) => {
                    return <FriendItem key={i} name={friend.name} friend={friend.displayName} avatar={friend.avatar} />
                })} */}
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
