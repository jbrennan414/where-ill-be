import React, { Component } from 'react';
import { styled } from '@material-ui/core/styles';
import { addSkiDay } from '../actions/dates';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getUsers } from '../actions/friends';
import { DatePicker } from "@material-ui/pickers";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { resortList } from '../assets/resortList';

const ModalHeader = styled("div")({
    fontFamily: "\"Do Hyeon\", sans-serif",
    fontSize: '14px',
    margin: '10px 0px',
    display:'flex',
    backgroundColor: 'white',
    color: '#015249',
    justifyContent:'center',
});

class CalendarView extends Component {

    constructor(props) {
        super(props);
    
        this.state = { 
            isShowingAddDayModal: false,
            selectedResort:'',
        };

    }

    componentDidMount(){

        const today = new Date;
        this.setState({ selectedDate:today });
        this.props.getUsers(this.props.auth.uid);
    }

    getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
          days.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
        return days;
    }

    handleChange = event => {
        this.setState({ selectedResort: event.target.value});
    };

    submitSkiDay(){
        const { selectedDate, selectedResort } = this.state
        const uid = this.props.auth.uid;

        this.props.addSkiDay(uid, selectedDate, selectedResort);
        this.setState({ isShowingAddDayModal: false });
    }
    

    render() {

        const { isShowingAddDayModal, selectedDate } = this.state;
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const parsedDate = this.state.selectedDate ? months[this.state.selectedDate.getMonth()] + " " + this.state.selectedDate.getDate() : "";

        return (
            <div>
                <DatePicker
                    autoOk
                    variant="static"
                    openTo="date"
                    value={selectedDate}
                    onChange={(val) => this.setState({ selectedDate: val._d, isShowingAddDayModal: !isShowingAddDayModal })}
                />

                {/* Add Ski Day Modal */}
                <Dialog
                    open={isShowingAddDayModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <ModalHeader id="alert-dialog-title">{parsedDate}</ModalHeader>
                    <Select
                        id= "ski-resort-dropdown"
                        onChange={this.handleChange}
                    >
                        {resortList.map(resort => {
                            return <MenuItem key={resort} value={resort} id={resort}>{resort}</MenuItem>
                        })}
                    </Select>
                    <DialogActions>
                        <Button onClick={() => this.setState({ isShowingAddDayModal: false })} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.submitSkiDay()} color="primary">
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
    thisMonth: state.dates.thisMonth,
    myFriends: state.friends.myFriends
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    addSkiDay,
    getUsers,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView);
