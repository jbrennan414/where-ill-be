import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import { updateAuth, signOut, signIn, createUser } from '../actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { styled } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import TemporaryDrawer from './LeftDrawer';
import headshot from '../assets/headshot.jpg';

import * as firebase from 'firebase'

const MyTouchbar = styled(AppBar)({
  background: '#77C9D4',
  alignItems:'center',
  justifyContent:'space-evenly',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  fontSize: '53px',
  height: 72,
  display:'flex',
});

const StyledButton = styled(Button)({
  // fontSize: '36px',

});

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      isShowingLoginModal: false,
      isShowingSignUpModal: false,
      password:'',
      confirmPass:'',
      isShowingLeftDrawer: false,
    };
  }

  componentDidMount(){
      this.props.updateAuth();
  }  

  addNewUser(){
    const { confirmPass, password, email} = this.state;

    if (confirmPass === '' || password == '' || email === ''){
      return console.log("Uh oh, looks like you missed a required field");
    }

    if (confirmPass !== password){
      return console.log("Uh oh, looks like your passwords don't match. ");
    }

    this.props.createUser(email, password);

  }

  logUserIn(){
    const { email, password } = this.state;
    this.props.signIn(email, password);

  }

  render() {

    const { isShowingLoginModal, isShowingSignUpModal, isShowingLeftDrawer, password, confirmPass } = this.state;
    const { auth } = this.props;

    return (
      <div>
        <MyTouchbar position="static">
          {auth.uid != null ? (
            <div style={{"display":"flex", "width":"100%", "justifyContent":"space-between", "alignItems":"center"}}>
              <Avatar style={{"marginLeft":"20px"}} onClick={() => this.setState({ isShowingLeftDrawer: true })} alt="user avatar" src={headshot} />
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
            </div>
          ) : (
            <div>
              <StyledButton onClick={() => this.setState({ isShowingLoginModal: !isShowingLoginModal })} color="inherit">Login</StyledButton>
              <StyledButton onClick={() => this.setState({ isShowingSignUpModal: !isShowingSignUpModal })} color="inherit">Sign Up</StyledButton>
            </div>
          )}
        </MyTouchbar>

          {/* Sign Up Modal */}
          <Dialog
            open={isShowingSignUpModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">{"Join Us!"}</DialogTitle>
          <TextField
            margin="dense"
            required
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            onChange={val => this.setState({ email: val.target.value })}
          />
          <TextField
            margin="dense"
            required
            id="name"
            label="Password"
            type="password"
            fullWidth
            onChange={val => this.setState({ password: val.target.value })}
          />
          <TextField
            required
            margin="dense"
            id="name"
            label="Confirm Password"
            type="password"
            fullWidth
            onChange={val => this.setState({ confirmPass: val.target.value })}
          />
          <DialogActions>
            <Button onClick={() => this.setState({ isShowingSignUpModal: !isShowingSignUpModal })} color="primary">
              Cancel
            </Button>
            <Button 
              onClick={() => 
                this.setState({ 
                  isShowingSignUpModal: !isShowingSignUpModal 
                }),
                this.addNewUser.bind(this)} 
              color="primary" 
              disabled= {confirmPass !== password || password === '' || confirmPass === '' ? true : false}
            >
              Sign Up!
            </Button>
          </DialogActions>
        </Dialog>
        <TemporaryDrawer
          show={isShowingLeftDrawer}
        />

        {/* Log In Modal */}
          <Dialog
            open={isShowingLoginModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">{"Log In!"}</DialogTitle>
          <TextField
            margin="dense"
            required
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            onChange={val => this.setState({ email: val.target.value })}
          />
          <TextField
            margin="dense"
            required
            id="name"
            label="Password"
            type="password"
            fullWidth
            onChange={val => this.setState({ password: val.target.value })}
          />
          <DialogActions>
            <Button onClick={() => this.setState({ isShowingLoginModal: false })} color="primary">
              Cancel
            </Button>
            <Button 
              onClick={() => 
                this.setState({ 
                  isShowingLoginModal: false 
                }),
                this.logUserIn.bind(this)} 
              color="primary" 
              disabled= {false}
            >
              Log In!
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateAuth,
  signOut,
  signIn,
  createUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
