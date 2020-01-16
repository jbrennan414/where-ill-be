import React, { Component } from 'react';
import { styled } from '@material-ui/core/styles';

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

export default class CalendarView extends Component {

    getDaysInMonth(month, year){
           return new Date(year, month, 0).getDate();
    };

    renderDays(daysThisMonth){
        let days = [];

        for(let i=1; i < daysThisMonth + 1; i++){
            days.push(<Day key={i}>{i}</Day>)
        }

        return days;

    }
    

    render() {

        const d = new Date();
        const currentMonth = d.getMonth() + 1;
        const currentYear = d.getFullYear();
        const daysThisMonth = this.getDaysInMonth(currentMonth, currentYear)

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
