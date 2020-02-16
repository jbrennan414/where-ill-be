import React, { Component } from 'react';
import { styled } from '@material-ui/core/styles';
import { addSkiDay } from '../actions/dates';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getUsers } from '../actions/friends';
import { getThisMonthsSkiDays } from '../actions/dates';
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
        console.log("how often do we hit this?")

        const today = new Date;
        const month = today.getMonth() >= 10 ? today.getMonth().toString() : "0" + today.getMonth().toString();

        this.setState({ selectedDate:today, currentMonth: month });
        this.props.getUsers(this.props.auth.uid);
    }
    
    componentDidUpdate(prevProps, prevState){
        // compare our current months, if they're different
        // please go get our ski days
        if (prevState.currentMonth !== this.state.currentMonth){
            this.props.getThisMonthsSkiDays(this.props.auth.uid, this.state.currentMonth)
        }
    }

    handleChange = event => {
        this.setState({ selectedResort: event.target.value});
    };

    submitSkiDay(){
        const { selectedDate, selectedResort } = this.state
        const uid = this.props.auth.uid;

        const month = selectedDate.getMonth() >= 10 ? selectedDate.getMonth().toString() : "0" + selectedDate.getMonth().toString();
        const day = selectedDate.getDate() >= 10 ? selectedDate.getDate().toString() : "0" + selectedDate.getDate().toString();
        const fullYear = selectedDate.getFullYear();

        //parsed date will look like 01052020 (February 5, 2020)
        const parsedDate = `${month}${day}${fullYear}`;

        this.props.addSkiDay(uid, parsedDate, selectedResort);
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
                    onMonthChange={(val) => {
                        const month = val._d.getMonth() >= 10 ? val._d.getMonth().toString() : "0" + val._d.getMonth().toString();
                        this.setState({ currentMonth: month })}
                    }
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
    myFriends: state.friends.myFriends,
    thisMonthsSkiDays: state.dates.thisMonthsSkiDays,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    addSkiDay,
    getThisMonthsSkiDays, 
    getUsers,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView);
