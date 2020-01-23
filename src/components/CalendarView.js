import React, { Component } from 'react';
import { styled } from '@material-ui/core/styles';
import { getThisMonthDates } from '../actions/dates';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

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

const Calendar = styled("div")({
    display:'flex',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    color: 'black',
    justifyContent:'flex-start',
    backgroundColor: '#77C9D4',
    padding: '0px 16px'
});

class CalendarView extends Component {

    componentDidMount(){
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0'); //January is 01

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

    renderDays(daysThisMonth){
        let days = [];

        for(let i=0; i < daysThisMonth.length; i++){
            days.push(<Day onClick={() => console.log(daysThisMonth[i])} key={i} id={daysThisMonth[i]}>{parseInt(i)+1}</Day>)
        }

        return days;

    }
    

    render() {

        const d = new Date();
        const daysThisMonth = this.props.thisMonth;

        const month = new Array();
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
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    thisMonth: state.dates.thisMonth,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getThisMonthDates
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView);
