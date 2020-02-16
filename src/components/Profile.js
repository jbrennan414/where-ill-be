import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateMyProfile } from '../actions/auth';
import { styled } from '@material-ui/core/styles';
import * as firebase from 'firebase/app'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

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

const style = {
    helperText: {
        fontSize: "14px",
        display: "flex",
        justifyContent:"center"
    }
}

class Profile extends Component {

    constructor(props) {
        super(props);
    
        this.state = { 
            email: this.props.auth.email || "None",
            uid: this.props.auth.uid || "None",
        };
    }

    componentDidMount(){
        this.setState({ photoURL: this.props.auth.photoURL });
    }

    uploadPhoto(){
        const d =  Date.now();
        const uid = this.props.auth.uid;
        const storageRef = firebase.storage().ref('headshots/'+ uid + "_headshot" + "_" + d);
        const file_data = document.getElementById('raised-button-file').files[0];
        let stateCopy = {...this.state};

        stateCopy["photoURL"] = `https://firebasestorage.googleapis.com/v0/b/where-ill-be.appspot.com/o/headshots%2F${this.props.auth.uid}_headshot_${d}?alt=media&token=AEu4IL3pYYyMNCXTq3C5IC_H6uHOoQ86dqDn4uSyDBLaYYL9D6Rt_O70qmHOVal`;

        storageRef.put(file_data).then(response => {
            this.props.updateMyProfile(stateCopy)
        })
    }

      
    render() {

        let { displayName, email, photoURL } = this.props.auth;

        // TODO on first load, we have a bug that name, nor displayName get set right away.
        //  We'll need to fix that sooner or later

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
                    <Button component="span">
                        <MyAvatar alt="user_image" src={photoURL} />
                    </Button>
                </label> 
                <form noValidate autoComplete="off">
                    <TextField required id="standard-required" defaultValue={`${displayName}`} placeholder="username" onChange={val => this.setState({ displayName: val.target.value })} />
                    <FormHelperText style={style.helperText} id="component-helper-text">Make this cool. This is how your friends will find you!</FormHelperText>
                    <TextField id="standard-required" defaultValue={`${email}`} placeholder="email" onChange={val => this.setState({ email: val.target.value })} />
                    <FormHelperText style={style.helperText} id="component-helper-text">This isn't always cool, we get it.</FormHelperText>
                </form>
                <Button onClick={()=> this.props.updateMyProfile(this.state)}>
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
      updateMyProfile,
  }, dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(Profile);