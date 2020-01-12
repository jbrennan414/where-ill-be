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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import { bindActionCreators } from 'redux'

import headshot from '../assets/headshot.jpg';

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
        >
          <List>
            <Link to={`/profile`}>
              <ListItem button key={"My Profile"}>
                <ListItemIcon><Avatar src={headshot} /></ListItemIcon>
                <ListItemText primary={"My Profile"} />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <Link to={`/calendar`}>
              <ListItem button key={"Calendar"}>
                <ListItemIcon><TodayIcon /></ListItemIcon>
                <ListItemText primary={"Calendar"} />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <Link to={`/friends`}>
              <ListItem button key={"Find Friends"}>
                <ListItemIcon><GroupIcon /></ListItemIcon>
                <ListItemText primary={"Find Friends"} />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <Link to={`/`}>
              <ListItem onClick={()=> this.props.signOut()} button key={"Sign Out"}>
                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                <ListItemText primary={"Sign Out"} />
              </ListItem>
            </Link>
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