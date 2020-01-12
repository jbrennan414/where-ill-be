import React, { Component } from 'react'
import logo from '../../src/logo.svg'
import { styled } from '@material-ui/core/styles';

const LandingText = styled("div")({
    fontSize: '24px',
    display:'flex',
    flexWrap:'wrap',
    color:'#015249',
    fontFamily: "\"Do Hyeon\", sans-serif",
    justifyContent:'center'
  });

export default class LandingPage extends Component {
    render() {
        return (
            <div className="App">
                <LandingText><h1>WHERE I'LL BE</h1></LandingText>
                <img src={logo} className="App-logo" alt="logo" />
                <LandingText>
                    <h2>1) TELL YOUR FRIENDS WHERE YOU'RE GONNA SKI</h2>
                    <h2>2) SKI WITH THEM. IF YOU WANT</h2>
                </LandingText>
            </div>

        )
    }
}
