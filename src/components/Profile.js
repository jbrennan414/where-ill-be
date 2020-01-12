import React, { Component } from 'react'
import { headshot } from '../assets/headshot.jpg'
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import { updateProfile } from '../actions/auth';

class Profile extends Component {

    constructor(props) {
        super(props);
    
        this.state = { 
            displayName: this.props.auth.displayName || "None",
            email: this.props.auth.email || "None",
            phoneNumber: this.props.auth.phoneNumber || "None"
        };
      }

    render() {
        const { displayName, email, phoneNumber } = this.state;

        return (
            <div>
                <Avatar alt="user_image" src={headshot} />
                <form noValidate autoComplete="off">
                    <TextField required id="standard-required" defaultValue={`${displayName}`} onChange={val => this.setState({ displayName: val.target.value })} />
                    <TextField id="standard-required" defaultValue={`${email}`} onChange={val => this.setState({ email: val.target.value })} />
                    <TextField id="standard-required" defaultValue={`${phoneNumber}`} onChange={val => this.setState({ phoneNumber: val.target.value })} />
                </form>
                <Button onClick={()=> this.props.updateProfile(this.state)}>
                    Submit
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
  })
  
  const mapDispatchToProps = (dispatch) => bindActionCreators({
      updateProfile,
  }, dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(Profile);