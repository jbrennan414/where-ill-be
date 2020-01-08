import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import { updateAuth, signOut, signIn } from '../actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { styled } from '@material-ui/core/styles';

import * as firebase from 'firebase'

const MyTouchbar = styled(AppBar)({
  background: '#77C9D4',
  alignItems:'center',
  justifyContent:'space-evenly',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 72,
  display:'flex',
});

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      isShowingLoginModal: false,
      isShowingSignUpModal: false,
      password:'',
      confirmPass:'',
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

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
      // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
      console.log(error);
    });

  }

  logUserIn(){
    const { email, password } = this.state;
    this.props.signIn(email, password);

  }

  render() {

    const { isShowingLoginModal, isShowingSignUpModal, password, confirmPass } = this.state;
    const { auth } = this.props;

    return (
      <div>
        <MyTouchbar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
            </IconButton>
              {auth.user !== null ? (
                <Button onClick={() => this.props.signOut()} color="inherit">Log Out</Button>
              ) : (
                <div>
                  <Button onClick={() => this.setState({ isShowingLoginModal: !isShowingLoginModal })} color="inherit">Login</Button>
                  <Button onClick={() => this.setState({ isShowingSignUpModal: !isShowingSignUpModal })} color="inherit">Sign Up</Button>
                </div>
              )}
            </Toolbar>
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
            <Button onClick={() => this.setState({ isShowingLoginModal: !isShowingLoginModal })} color="primary">
              Cancel
            </Button>
            <Button 
              onClick={() => 
                this.setState({ 
                  isShowingLoginModal: !isShowingLoginModal 
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
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
