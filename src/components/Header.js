import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import { updateAuth, signOut, signIn, createUser } from '../actions/auth';
import { getUsers } from '../actions/friends';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { styled } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TemporaryDrawer from './LeftDrawer';
import * as firebase from 'firebase/app';
import logo from '../assets/logo/v2/jb-v2-white.png';

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

const style = {
  notification : {
    backgroundColor:'red',
    height:'.25em',
    width: '.25em',
    borderRadius:'10px',
    position:'absolute',
    marginLeft: '1em',
    marginTop: '-.2em'
  },
  logo: {
    height: '1em',
    width: '1em',
    justifyContent:'center'
  }
}

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      isShowingLoginModal: false,
      isShowingSignUpModal: false,
      password:'',
      confirmPass:'',
      isShowingLeftDrawer: false,
      isShowingForgotPasswordModal: false,
    };
  }

  componentDidMount(){
    this.props.updateAuth();
    
  }  

  componentDidUpdate(){
    //we need a better way to solve this problem. we have a bug on first sign in
    if (this.props && this.props.auth && this.props.auth.uid && this.props.myFriends.length === 0){
      this.props.getUsers(this.props.auth.uid);
    }
  }

  forgotPassword(){
    let auth = firebase.auth();
    const emailAddress = this.state.forgottenEmail;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
      console.log("EMAIL SENT SUCCESSFULLY")
      // Email sent.
    }).catch(function(error) {
      console.log("EMAIL NOT SENT", error)
      // An error happened.
    });
  }


  addNewUser(){
    const { confirmPass, password, email} = this.state;

    if (confirmPass === '' || password === '' || email === ''){
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

    const { 
      isShowingLoginModal, 
      isShowingSignUpModal, 
      isShowingLeftDrawer, 
      password, 
      confirmPass,
      isShowingForgotPasswordModal,
    } = this.state;
    const { auth, myFriends } = this.props;

    const peopleWhoHaveRequestedMe = myFriends.filter(friend => friend.status === "requested_you");

    const headshot =`https://firebasestorage.googleapis.com/v0/b/where-ill-be.appspot.com/o/headshots%2F${this.props.auth.uid}_headshot?alt=media&token=5d2fe37f-6af6-4f37-8d3b-65acfba1e1bb`;

    return (
      <div>
        <MyTouchbar position="static">
          {auth.uid != null ? (
            <div style={{"display":"flex", "width":"100%", "justifyContent":"space-between", "alignItems":"center"}}>
              <Avatar style={{"marginLeft":"20px"}} onClick={() => this.setState({ isShowingLeftDrawer: !isShowingLeftDrawer })} alt="user avatar" src={headshot} />
              {peopleWhoHaveRequestedMe.length > 0 && <div style={style.notification}></div>}
              <img style={style.logo} src={logo} />
              <div></div>
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
            <Button style={style.headerText} onClick={() => this.setState({ isShowingSignUpModal: !isShowingSignUpModal })} color="primary">
              Cancel
            </Button>
            <Button 
              onClick={() =>this.setState({ isShowingSignUpModal: !isShowingSignUpModal }, () => this.addNewUser())}
              color="primary" 
              disabled= {confirmPass !== password || password === '' || confirmPass === '' ? true : false}
              style={style.headerText}
            >
              Sign Up!
            </Button>
          </DialogActions>
        </Dialog>
        <TemporaryDrawer
          show={isShowingLeftDrawer}
          requestedFriends={peopleWhoHaveRequestedMe.length}
          closeDrawer={() => this.setState({ isShowingLeftDrawer: !isShowingLeftDrawer })}
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
              onClick={() =>this.setState({ isShowingLoginModal: !isShowingLoginModal }, () => this.logUserIn())}
              color="primary" 
              disabled= {false}
            >
              Log In!
            </Button>
          </DialogActions>
          <a onClick={()=> this.setState({ isShowingForgotPasswordModal: !isShowingForgotPasswordModal, isShowingLoginModal: !isShowingLoginModal })}>Forgot password?</a>
        </Dialog>

         {/* Forgot Password Modal */}
         <Dialog
            open={isShowingForgotPasswordModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">{"Reset Your Password"}</DialogTitle>
          <TextField
            margin="dense"
            required
            id="name"
            label="Email"
            type="email"
            fullWidth
            onChange={val => this.setState({ forgottenEmail: val.target.value })}
          />
          <DialogActions>
            <Button onClick={() => this.setState({ isShowingForgotPasswordModal: false })} color="primary">
              Cancel
            </Button>
            <Button 
              onClick={() =>this.setState({ isShowingForgotPasswordModal: !isShowingForgotPasswordModal }, () => this.forgotPassword())}
              color="primary" 
              disabled= {false}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  myFriends: state.friends.myFriends,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateAuth,
  signOut,
  signIn,
  createUser,
  getUsers,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
