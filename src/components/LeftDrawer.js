import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TodayIcon from '@material-ui/icons/Today';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { signOut } from '../actions/auth';
import { connect } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import { bindActionCreators } from 'redux';

import headshot from '../assets/headshot.jpg';

const StyledListItem = styled(ListItem)({
  backgroundColor: '#77C9D4',
  margin: '0px',
  padding:'0px',
  fontSize: '24px'
});

const StyledText = styled(ListItemText)({
  padding:'0px',
  fontSize:'14px',
  color:"white"
});

const StyledLink = styled(Link)({
  textDecoration:'none',
});


class LeftDrawer extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      show: this.props.show,
    };
  }

  toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
  }

    this.setState({ [side]:open })

  };
  
  render() {
    return (
      <Drawer open={this.props.show} >
        <div
          role="presentation"
          onClick={this.toggleDrawer('left', false)}
          onKeyDown={this.toggleDrawer('left', false)}
          style={{"background-color":"#77C9D4", 'height':"100%"}}
        >
          <List style={{"padding":"0px"}}>
            <StyledLink to={`/profile`}>
              <StyledListItem button key={"My Profile"}>
                <ListItemIcon><Avatar src={headshot} /></ListItemIcon>
                <StyledText primary={"My Profile"} />
              </StyledListItem>
            </StyledLink>
          </List>
          <Divider />
          <List style={{"padding":"0px"}}>
            <StyledLink to={`/calendar`}>
              <StyledListItem button key={"Calendar"}>
                <ListItemIcon><TodayIcon /></ListItemIcon>
                <StyledText primary={"Calendar"} />
              </StyledListItem>
            </StyledLink>
          </List>
          <Divider />
          <List style={{"padding":"0px"}}>
            <StyledLink to={`/friends`}>
              <StyledListItem button key={"Find Friends"}>
                <ListItemIcon><GroupIcon /></ListItemIcon>
                <StyledText primary={"Find Friends"} />
              </StyledListItem>
            </StyledLink>
          </List>
          <Divider />
          <List style={{"padding":"0px"}}>
            <StyledLink to={`/`}>
              <StyledListItem onClick={()=> this.props.signOut()} button key={"Sign Out"}>
                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                <StyledText primary={"Sign Out"} />
              </StyledListItem>
            </StyledLink>
          </List>
        </div>
      </Drawer>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  signOut,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LeftDrawer);