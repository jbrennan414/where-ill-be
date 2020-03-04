import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { updateAuth, signOut, createUser } from '../actions/auth';
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
  justifyContent:'space-evenly',
  alignItems:'center',
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
    justifyContent:'center',
    position:'absolute',
    right: '44%'
  },
  textBox:{
    border: '1px solid lightgray',
    fontSize:'14px',
    width:'80%'
  },
  actionButtons:{
    display:'flex',
    justifyContent:'center',
    marginBottom:'20px'
  },
  button:{
    color:'white',
    backgroundColor:'#015249'
  },
  cancelButton:{
    color:'#015249',
    border:'1px solid #015249'
  },
  modalImage:{
    height: '12em',
    width:'14em'
  },
  modal:{
    textAlign:'center'
  }
}

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      isShowingLoginModal: false,
      isShowingSignUpModal: false,
      isShowingLeftDrawer: false,
      isShowingForgotPasswordModal: false,
      isShowingSnackbar: false,
      snackbarMessage: "",
      snackbarType:"",
    };
  }

  componentDidMount(){
    this.props.updateAuth();
    
  }  

  componentDidUpdate(){
    //we need a better way to solve this problem. we have a bug on first sign in
    if (this.props && this.props.auth && this.props.auth.uid && this.props.friends.length === 0){
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


  async addNewUser(){

    const { email, name, displayName, password } = this.state;

    if (email && name && displayName && password) {
      let newUser = {};

      await firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result) {
          newUser["email"] = result.user.email;
          newUser["uid"] = result.user.uid;
          newUser["displayName"] = displayName;

          result.user.updateProfile({
              displayName: displayName
          })

          // V2 RELEASE
          // var self = this;
          // var emailUser = firebase.auth().currentUser;
          // emailUser.sendEmailVerification().then(function() {
          //   // Email sent.
          //   self.setState({
          //     isShowingSnackbar:true,
          //     snackbarMessage: "Great! Check your email!",
          //     snackbarType: "success"
          //   })
          // }).catch(function(error) {
          //   alert(error.message)
          // });

          firebase.database().ref('users/' + result.user.uid).set({
              name:name,
              displayName: displayName,
              photoURL: ""
          });

        }).catch(function(error){
          //can we fix this?
          alert(error.message)
        })

        this.props.createUser(newUser)
    }
  }

  handleClose(){
    this.setState({ isShowingSnackbar: false });
  }

  async logUserIn(){
    const { email, password } = this.state;
    var self = this;
      await firebase.auth().signInWithEmailAndPassword(email, password).then(function(error) {
        console.log("Logged in successfully.")
        self.setState({ 
          isShowingSnackbar:true,
          snackbarMessage: "Welcome!",
          snackbarType: "success",
        })
      }).catch(function(error){
        alert(error.message)
    })

  }

  render() {

    const { 
      isShowingLoginModal, 
      isShowingSignUpModal, 
      isShowingLeftDrawer, 
      isShowingForgotPasswordModal,
    } = this.state;

    const { auth, friends } = this.props;

    const peopleWhoHaveRequestedMe = Object.keys(friends.friends).filter(k=>friends.friends[k]["status"]==="requested_you");

    return (
      <div>
        <MyTouchbar position="static">
          {auth.uid != null ? (
            <div style={{"display":"flex", "width":"100%", "justifyContent":"space-between", "alignItems":"center"}}>
              <Avatar style={{"marginLeft":"20px", "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} onClick={() => this.setState({ isShowingLeftDrawer: !isShowingLeftDrawer })} alt="user avatar" src={auth.photoURL} />
              {peopleWhoHaveRequestedMe.length > 0 && <div style={style.notification}></div>}
              <img alt="" style={style.logo} src={logo} />
              <div></div>
            </div>
          ) : (
            <div>
              <StyledButton onClick={() => this.setState({ isShowingLoginModal: !isShowingLoginModal })} color="inherit">Login</StyledButton>
              <StyledButton onClick={() => this.setState({ isShowingSignUpModal: !isShowingSignUpModal })} color="inherit">Sign Up</StyledButton>
            </div>
          )}
        </MyTouchbar>
        <Snackbar open={this.state.isShowingSnackbar} autoHideDuration={4000} onClose={()=> this.handleClose()}>
          <MuiAlert onClose={()=> this.handleClose()} severity={this.state.snackbarType}>
            {this.state.snackbarMessage}
          </MuiAlert>
        </Snackbar>

          {/* Sign Up Modal */}
          <Dialog
            open={isShowingSignUpModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            style={style.modal}
          >
          <DialogTitle style={{"color":"#015249"}} id="alert-dialog-title">{"JOIN US!"}</DialogTitle>
          <div style={style.modal}>
            <TextField
              style={style.textBox}
              margin="dense"
              id="email"
              label="email"
              type="email"
              fullWidth
              onChange={val => this.setState({ email: val.target.value })}
            />
            <TextField
              style={style.textBox}
              margin="dense"
              id="fullname"
              label="full name"
              type="name"
              fullWidth
              onChange={val => this.setState({ name: val.target.value })}
            />
            <TextField
              style={style.textBox}
              margin="dense"
              id="displayName"
              label="username"
              type="name"
              fullWidth
              onChange={val => this.setState({ displayName: val.target.value })}
            />
            <TextField
              style={style.textBox}
              margin="dense"
              id="pw"
              label="password"
              type="password"
              fullWidth
              onChange={val => this.setState({ password: val.target.value })}
            />
            <DialogActions style={style.actionButtons}>
            <Button style={style.cancelButton} onClick={() => this.setState({ isShowingSignUpModal: !isShowingSignUpModal })} color="primary">
              Cancel
            </Button>
            <Button 
              onClick={() =>this.setState({ isShowingSignUpModal: !isShowingSignUpModal }, () => this.addNewUser())}
              color="primary" 
              style={style.button}
            >
              Sign Up
            </Button>
            </DialogActions>
            <p></p>
          </div>
        </Dialog>
        <TemporaryDrawer
          show={isShowingLeftDrawer}
          // requestedFriends={peopleWhoHaveRequestedMe.length}
          closeDrawer={() => this.setState({ isShowingLeftDrawer: !isShowingLeftDrawer })}
        />

        {/* Log In Modal */}
          <Dialog
            open={isShowingLoginModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            style={style.modal}
          >
          <DialogTitle style={{"color":"#015249"}} id="alert-dialog-title">{"LOG IN"}</DialogTitle>
          <div style={style.modal}>
            <TextField
              style={style.textBox}
              margin="dense"
              id="email"
              label="email"
              type="email"
              fullWidth
              onChange={val => this.setState({ email: val.target.value })}
            />
            <TextField
              style={style.textBox}
              margin="dense"
              id="pword"
              label="password"
              type="password"
              fullWidth
              onChange={val => this.setState({ password: val.target.value })}
            />
            <DialogActions style={style.actionButtons}>
            <Button style={style.cancelButton} onClick={() => this.setState({ isShowingLoginModal: !isShowingLoginModal })} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() =>this.setState({ isShowingLoginModal: !isShowingLoginModal }, () => this.logUserIn())}
                color="primary" 
                disabled= {false}
                style={style.button}
              >
                Log In
              </Button>
            </DialogActions>
            <a style={style.forgotPasswprd} onClick={()=> this.setState({ isShowingForgotPasswordModal: !isShowingForgotPasswordModal, isShowingLoginModal: !isShowingLoginModal })}>Forgot password?</a>
            <h1></h1>
          </div>
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
  friends: state.friends,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateAuth,
  signOut,
  createUser,
  getUsers,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
