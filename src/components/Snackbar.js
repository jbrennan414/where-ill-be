import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class SnackBar extends Component {
  constructor(props) {
    super(props);

    this.state = { 
        display: "",
        severity:"",
        message:""
    };
  }

  componentDidMount(){
    this.setState({ 
      display: this.props.display, 
      severity: this.props.severity,
      message: this.props.message,
    })
  }

  handleClose(){
    this.setState({ display: false })
  }

  render() {

    return (
      <div>
        <Snackbar open={this.state.display} autoHideDuration={4000} onClose={this.handleClose.bind(this)}>
          <Alert onClose={this.handleClose.bind(this)} severity={this.state.severity}>
            {this.state.message}
          </Alert>
        </Snackbar>
        {/* <Alert severity="error">This is an error message!</Alert> */}
        {/* <Alert severity="warning">This is a warning message!</Alert> */}
        {/* <Alert severity="info">This is an information message!</Alert> */}
        {/* <Alert severity="success">This is a success message!</Alert> */}
      </div>
    );
  }
}
