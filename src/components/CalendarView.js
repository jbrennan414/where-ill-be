import React, { Component } from 'react';
import { styled } from '@material-ui/core/styles';
import { getThisMonthDates, addSkiDay } from '../actions/dates';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as firebase from 'firebase'
import { getUsers } from '../actions/friends';
import Avatar from '@material-ui/core/Avatar';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { resortList } from '../assets/resortList';

const Month = styled("div")({
    display:'flex',
    color:'#015249',
    fontFamily: "\"Do Hyeon\", sans-serif",
    justifyContent: 'center',
    fontSize:'36px',
    marginTop: '72px',
});

const Week = styled("div")({
    display:'flex',
    flexDirection:'row',
    color:'white',
    fontFamily: "\"Do Hyeon\", sans-serif",
    justifyContent: 'space-evenly',
    fontSize:'12px',
});

const Day = styled("div")({
    fontFamily: "\"Do Hyeon\", sans-serif",
    fontSize: '12px',
    display:'flex',
    backgroundColor: 'white',
    height: '40px',
    width: '40px',
    color: '#A5A5AF',
    margin: '4px',
});

const SkiDay = styled("div")({
    fontFamily: "\"Do Hyeon\", sans-serif",
    fontSize: '12px',
    display:'flex',
    backgroundColor: '#57BC90',
    height: '40px',
    width: '40px',
    color: 'white',
    margin: '4px',
});

const Calendar = styled("div")({
    display:'flex',
    flexWrap: 'wrap',
    color: 'black',
    justifyContent:'flex-start',
    backgroundColor: '#77C9D4',
    padding: '0px 16px'
});

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

const style = {
    avatar: {
        width:"10px",
        height: "10px",
        display:"flex",
        alignSelf:"flex-end"
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
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0'); //January is 01
        this.props.getUsers(this.props.auth.uid);
        this.props.getThisMonthDates(month);
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

    getUserID(email){
        let uid;
        firebase.database().ref('users').orderByChild("email").on("value", function(snapshot){
            const snapshotCopy = snapshot.val();
            const snapshotKeys = Object.keys(snapshotCopy);
            const snapshotValues = Object.values(snapshotCopy);
            const emailIndex = snapshotValues.findIndex(value => value.email === email)
            uid = snapshotKeys[emailIndex];
        })

        return uid;
    }

    renderMyFriendsList(){
        const thisMonthKeys = Object.keys(this.props.thisMonth);
        const selectedIndex = thisMonthKeys.findIndex(date => date === this.state.selectedDate);
        const allSkiers = Object.values(this.props.thisMonth)[selectedIndex];
        const myFriends = this.props.myFriends.filter(friend => friend.status === "true");
        let checkArray = [];

        myFriends.forEach(friend => {
            checkArray.push(friend.uid);
        })

        if (!allSkiers){return};

        let allRows = [];
        Object.keys(allSkiers).forEach((skier, i) => {
            if (checkArray.includes(skier)){
                const thisFriendIndex = myFriends.findIndex(item => item.uid === skier);
                const currentFriend = myFriends[thisFriendIndex];
                allRows.push(<SingleRow><Avatar src={currentFriend.avatar} /> {currentFriend.email} {Object.values(allSkiers)[i]}</SingleRow>);
            }
        })

        return allRows;

    }

    renderDays(daysThisMonth){
        let days = [];
        if(!daysThisMonth){
            return;
        }

        const thisMonth = Object.values(this.props.thisMonth);
        const uid = this.props.auth.uid;

        const myVerifiedFriends = this.props.myFriends.filter(friend => friend.status === "true");
        let myVerifiedUIDs = [];
        
        myVerifiedFriends.forEach(friend => {
            const userID = this.getUserID(friend.email);
            myVerifiedUIDs.push(userID);
        });

        for(let i=0; i < daysThisMonth.length; i++){
            const thisDaysSkiers = Object.keys(thisMonth[i]);
            //check thisDaysSkiers against myVerifiedUids
            //I'm very tired and there is definitely a better way to do this
            let myFriendsAreSkiing = [];
            thisDaysSkiers.forEach(skier => {
                const headshot =`https://firebasestorage.googleapis.com/v0/b/where-ill-be.appspot.com/o/headshots%2F${skier}_headshot?alt=media&token=5d2fe37f-6af6-4f37-8d3b-65acfba1e1bb`;

                if (myVerifiedUIDs.includes(skier)){
                    myFriendsAreSkiing.push(<Avatar style={style.avatar} alt="user" src={headshot} />)
                }
            })

            if (thisDaysSkiers.includes(uid)){
                days.push(
                    <SkiDay 
                        onClick={() => this.setState({ isShowingAddDayModal: true, selectedDate: daysThisMonth[i] })} 
                        key={i} 
                        id={daysThisMonth[i]}>{parseInt(i)+1}
                        <p>{myFriendsAreSkiing}</p>
                    </SkiDay>
                )
            } else {
                days.push(
                    <Day 
                        onClick={() => {this.setState({ isShowingAddDayModal: true, selectedDate: daysThisMonth[i] })}}
                        key={i} 
                        id={daysThisMonth[i]}>{parseInt(i)+1}
                        <p>{myFriendsAreSkiing}</p>
                    </Day>
                )
            }
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
        const d = new Date();

        if (!this.props || !this.props.thisMonth){
            return <h1>Loading</h1>
        }

        const daysThisMonth = Object.keys(this.props.thisMonth);

        const { isShowingAddDayModal, selectedDate } = this.state;

        const month = []
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        const thisMonth = month[d.getMonth()].toUpperCase();
     
        return (
            <div>
                <Month>{`<<  ${thisMonth}  >>`}</Month>
                <Week>
                    <h5>S</h5>
                    <h5>M</h5>
                    <h5>T</h5>
                    <h5>W</h5>
                    <h5>Th</h5>
                    <h5>F</h5>
                    <h5>S</h5>
                </Week>
                <Calendar>
                    {this.renderDays(daysThisMonth)}
                </Calendar>

                {/* Add Ski Day Modal */}
                <Dialog
                    open={isShowingAddDayModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <ModalHeader id="alert-dialog-title">{thisMonth} {selectedDate ? selectedDate.slice(2,4):""}</ModalHeader>
                    {this.renderMyFriendsList()}
                    <Select
                        id= "ski-resort-dropdown"
                        onChange={this.handleChange}
                    >
                        {resortList.map(resort => {
                            return <MenuItem value={resort} id={resort}>{resort}</MenuItem>
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
    getThisMonthDates,
    getUsers,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView);
