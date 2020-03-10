import React, { Component } from 'react'
import logo from '../../src/assets/logo/v2/jb-v2-white.png'
import { styled } from '@material-ui/core/styles';

const LandingText = styled("div")({
    fontSize: '24px',
    display:'flex',
    flexWrap:'wrap',
    color:'#015249',
    fontFamily: "\"Do Hyeon\", sans-serif",
    justifyContent:'center',
    flexDirection: "column"
  });

export default class LandingPage extends Component {
    render() {
        return (
            <div className="App">
                <LandingText><p style={{"fontSize":"36px"}}>WHERE I'LL BE</p></LandingText>
                <img src={logo} className="App-logo" alt="logo" />
                <LandingText>
                    <p>1) TELL YOUR FRIENDS WHERE YOU'RE GONNA SKI</p>
                    <p>2) SKI WITH THEM. IF YOU WANT.</p>
                </LandingText>
            </div>

        )
    }
}
