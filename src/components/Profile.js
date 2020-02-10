import React, { Component } from 'react'
import { headshot } from '../assets/headshot.jpg'
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { updateProfile } from '../actions/auth';
import { styled } from '@material-ui/core/styles';
import * as firebase from 'firebase/app'

const TitleText = styled("div")({
    fontSize: '24px',
    display:'flex',
    flexWrap:'wrap',
    color:'#015249',
    fontFamily: "\"Do Hyeon\", sans-serif",
    justifyContent:'center'
});

const MyAvatar = styled(Avatar)({
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'center',
    height:'150px',
    width:'150px',
    border: '7px solid white',
});

const UserProfileText = styled("p")({
    display:'flex',
    fontFamily: "\"Do Hyeon\", sans-serif",
    flexWrap:'wrap',
    justifyContent:'flex-start',
    fontSize:'24px',
});

const UserProfileContainer = styled("div")({
    display:"flex",
    margin: "0px 20px",
    flexDirection:"column",
    justifyContent:"flex-start",
})

class Profile extends Component {

    constructor(props) {
        super(props);
    
        this.state = { 
            displayName: this.props.auth.displayName || "None",
            email: this.props.auth.email || "None",
            phoneNumber: this.props.auth.phoneNumber || "None"
        };
    }

    uploadPhoto(){
        const uid = this.props.auth.uid;
        const storageRef = firebase.storage().ref('headshots/'+ uid + "_headshot");
        const file_data = document.getElementById('raised-button-file').files[0];

        storageRef.put(file_data);
    }

      
    render() {
        const { displayName, email } = this.state;

        const headshot =`https://firebasestorage.googleapis.com/v0/b/where-ill-be.appspot.com/o/headshots%2F${this.props.auth.uid}_headshot?alt=media&token=AEu4IL3pYYyMNCXTq3C5IC_H6uHOoQ86dqDn4uSyDBLaYYL9D6Rt_O70qmHOVal`;

        return (
            <div>
                <TitleText><p style={{"fontSize":"36px"}}>MY PROFILE</p></TitleText>
                <input
                    accept="image/*"
                    //   className={classes.input}
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={()=>this.uploadPhoto()}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="raised" component="span">
                        <MyAvatar alt="user_image" src={headshot} />
                    </Button>
                </label> 
                {/* <form noValidate autoComplete="off">
                    <TextField required id="standard-required" defaultValue={`${displayName}`} onChange={val => this.setState({ displayName: val.target.value })} />
                    <TextField id="standard-required" defaultValue={`${email}`} onChange={val => this.setState({ email: val.target.value })} />
                    <TextField id="standard-required" defaultValue={`${phoneNumber}`} onChange={val => this.setState({ phoneNumber: val.target.value })} />
                </form> */}
                <UserProfileContainer>
                    <UserProfileText>name: {displayName}<EditIcon style={{"height":"30px"}} /></UserProfileText>
                    <UserProfileText>username: jpb66227<EditIcon style={{"height":"30px"}} /></UserProfileText>
                    <UserProfileText>email: {email} <EditIcon style={{"height":"30px"}} /></UserProfileText>
                </UserProfileContainer>
                {/* <Button onClick={()=> this.props.updateProfile(this.state)}>
                    Submit
                </Button> */}
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