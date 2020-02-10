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

const StyledListItem = styled(ListItem)({
  backgroundColor: '#77C9D4',
  margin: '0px',
  padding:'0px',
  fontSize: '4'
});

const StyledText = styled(ListItemText)({
  padding:'0px',
  fontSize:'14',
  color:"white",
  margin:'0px 10px'
});

const StyledLink = styled(Link)({
  textDecoration:'none',
});

const style = {
  listItem: {
    backgroundColor: 'red',
    borderRadius: '40px',
    margin:'3px'
  }
}

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

  renderNotifications(){
    if (this.props.requestedFriends){
      return <StyledText style={{"backgroundColor":"red" }} primary={`${this.props.requestedFriends}`} /> 
    }

  }

  render() {
    const headshot =`https://firebasestorage.googleapis.com/v0/b/where-ill-be.appspot.com/o/headshots%2F${this.props.auth.uid}_headshot?alt=media&token=AEu4IL3pYYyMNCXTq3C5IC_H6uHOoQ86dqDn4uSyDBLaYYL9D6Rt_O70qmHOVal`;

    return (
      <Drawer open={this.props.show} >
        <div
          role="presentation"
          onClick={() => this.props.closeDrawer()}
          onKeyDown={this.toggleDrawer('left', false)}
          style={{"backgroundColor":"#77C9D4", 'height':"100%"}}
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
                <StyledText style={{"fontSize":"13px"}} primary={"Calendar"} />
              </StyledListItem>
            </StyledLink>
          </List>
          <Divider />
          <List style={{"padding":"0px"}}>
            <StyledLink to={`/friends`}>
              <StyledListItem button key={"Find Friends"}>
                <ListItemIcon><GroupIcon /></ListItemIcon>
                <StyledText  primary={"Find Friends"} />
                <div style={style.listItem}>
                  {this.renderNotifications()}
                </div>
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