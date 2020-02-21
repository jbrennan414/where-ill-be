import React, { Component } from 'react';
import { styled } from '@material-ui/core/styles';
import { addSkiDay } from '../actions/dates';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getUsers } from '../actions/friends';
import { getThisMonthsSkiDays } from '../actions/dates';
import { DatePicker } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import Avatar from '@material-ui/core/Avatar';
import FormHelperText from '@material-ui/core/FormHelperText';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { DialogActions, Badge } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { resortList } from '../assets/resortList';
import { createMuiTheme } from "@material-ui/core";

const ModalHeader = styled("div")({
    fontFamily: "\"Do Hyeon\", sans-serif",
    fontSize: '14px',
    margin: '10px 0px',
    display:'flex',
    backgroundColor: 'white',
    color: '#015249',
    justifyContent:'center',
});

const SingleRow = styled("div")({
    display:'flex',
    border: '1px solid gray',
    color:'#015249',
    backgroundColor:'white',
    fontFamily: "\"Do Hyeon\", sans-serif",
    justifyContent:'space-between',
    padding: '0px 20px',
    alignItems:'center',
    margin: '0',
});

const customTheme = createMuiTheme({
    overrides: {
      MuiPickersDay: {
        day: {
            color: "light-gray",
            fontFamily: "\"Do Hyeon\", sans-serif",
            backgroundColor: "white"

        },
        daySelected: {
          backgroundColor: "black",
        },
        dayDisabled: {
          color: "black",
        },
        current: {
          color: "black",
        },
      },
    },
  });
  
  const style = {
        avatar: {
            height: "15px",
            width: "15px"
        },
        submitButton: {
            color: "white",
            backgroundColor: "#015249"
        },
        cancelButton: {
            color:"#015249",
            border: "1px solid #015249"
        }
  }

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
        const month = today.getMonth() >= 10 ? today.getMonth().toString() : "0" + today.getMonth().toString();

        this.setState({ currentMonth: month });
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

    renderSkiierRows(skiiers){
        let rows = [];
        skiiers.forEach(item =>
            rows.push(
                <SingleRow>
                    <Avatar src={`${item.avatar}`} alt="user avatar" />
                    <div style={{"display":"flex", "flexDirection":"column"}}>
                        <p style={style.displayNameStyle}>{`@${item.displayName}`}</p>
                        <p style={style.nameStyle}>{`${item.name}`}</p>
                        <p>{`${item.resort}`}</p>
                    </div>
                </SingleRow>
            )
        );
        
        return rows;
    }

    submitSkiDay(){
        const { selectedDate, selectedResort } = this.state
        const uid = this.props.auth.uid;

        if (!selectedResort){
            this.setState({ isShowingAddDayModal: false });
            return;
        }

        this.props.addSkiDay(uid, selectedDate, selectedResort);
        this.setState({ isShowingAddDayModal: false });
    }

    render() {

        const { isShowingAddDayModal, selectedDate } = this.state;
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let selectedMonth;
        let selectedDay;
        if (selectedDate){
            selectedDay = selectedDate.substring(2,4);
            selectedMonth = months[parseInt(selectedDate.substring(0,2))];
        }

        let myFriends = {};
        let myFriendsSkiingToday = []

        if (this.props.friends){

            Object.values(this.props.friends).forEach((item, i) => {
                if (item.status === 'true') {
                    let singleLine = {};
                    singleLine["avatar"] = item["avatar"];
                    singleLine["name"] = item["name"];
                    myFriends[Object.keys(this.props.friends)[i]]= singleLine;
                }
            });

            //Uh, add me to my own friends 😑
            let myLine = {};
            myLine["avatar"] = this.props.auth.photoURL;
            myFriends[this.props.auth.uid] = myLine;

        }

            // mehhhhhhh
            if (this.props.thisMonthsSkiDays[this.state.selectedDate]){
                const allTodaysSkiiers = this.props.thisMonthsSkiDays[this.state.selectedDate];
                Object.keys(this.props.friends).forEach(friend => {
                    if (Object.keys(allTodaysSkiiers).includes(friend)){
                        let singleSkiier = {};
                        singleSkiier["displayName"] = this.props.friends[friend].displayName;
                        singleSkiier["avatar"] = this.props.friends[friend].avatar;
                        singleSkiier["name"] = this.props.friends[friend].name;
                        singleSkiier["resort"] = this.props.thisMonthsSkiDays[this.state.selectedDate][friend]
                        myFriendsSkiingToday.push(singleSkiier);
                    }
                })
            }

        return (
            <div>
                <ThemeProvider theme={customTheme}>
                    <DatePicker
                        autoOk
                        disableToolbar={true}
                        variant="static"
                        openTo="date"
                        renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
                            const month = day._d.getMonth() >= 10 ? day._d.getMonth().toString() : "0" + day._d.getMonth().toString();
                            const date = day._d.getDate() >= 10 ? day._d.getDate().toString() : "0" + day._d.getDate().toString();
                            const fullYear = day._d.getFullYear();
                            let badges = [];
                            //parsed date will look like 01052020 (February 5, 2020)
                            const parsedDate = `${month}${date}${fullYear}`;
                            //show my ski days
                            if (this.props.thisMonthsSkiDays[parsedDate]){
                                const todaysSkiiers = Object.keys(this.props.thisMonthsSkiDays[parsedDate]);
                                let avatars= [];

                                todaysSkiiers.forEach(skiier => {
                                    if (myFriends[skiier]){
                                        avatars.push(<Avatar style={style.avatar} src={myFriends[skiier]["avatar"]} />);
                                    }
                                })

                                badges.push(<Badge key={day} badgeContent={avatars}>{dayComponent}</Badge>);

                            } else {
                                badges.push(<Badge key={day} badgeContent={undefined}>{dayComponent}</Badge>);
                            }

                            return badges;

                        }}
                        value={selectedDate}
                        onMonthChange={(val) => {
                            const month = val._d.getMonth() >= 10 ? val._d.getMonth().toString() : "0" + val._d.getMonth().toString();
                            this.setState({ currentMonth: month })}
                        }
                        onChange={(val) => {
                            const month = val._d.getMonth() >= 10 ? val._d.getMonth().toString() : "0" + val._d.getMonth().toString();
                            const date = val._d.getDate() >= 10 ? val._d.getDate().toString() : "0" + val._d.getDate().toString();
                            const fullYear = val._d.getFullYear();
                            const parsedDate = `${month}${date}${fullYear}`;

                            this.setState({ selectedDate:parsedDate, isShowingAddDayModal: !isShowingAddDayModal })}}
                    />
                </ThemeProvider>

                {/* Add Ski Day Modal */}
                <Dialog
                    open={isShowingAddDayModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                    maxWidth={'xl'}
                >
                    <ModalHeader id="alert-dialog-title">{`${selectedMonth} ${selectedDay}`}</ModalHeader>
                    {this.renderSkiierRows(myFriendsSkiingToday)}
                    <Select
                        id= "ski-resort-dropdown"
                        onChange={this.handleChange}
                        placeholder={"ski?"}
                    >
                        {resortList.map(resort => {
                            return <MenuItem key={resort} value={resort} id={resort}>{resort}</MenuItem>
                        })}
                    </Select>
                    <FormHelperText>Where I'll Ski</FormHelperText>

                    <DialogActions>
                        <Button style={style.cancelButton} onClick={() => this.setState({ isShowingAddDayModal: false })} color="primary">
                            Cancel
                        </Button>
                        <Button style={style.submitButton} onClick={() => this.submitSkiDay()} color="primary">
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
    friends: state.friends.friends,
    thisMonthsSkiDays: state.dates.thisMonthsSkiDays,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    addSkiDay,
    getThisMonthsSkiDays, 
    getUsers,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView);
