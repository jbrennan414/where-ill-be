import React, { Component } from 'react';

export default class CalendarView extends Component {


    getDaysInMonth(month, year){
           return new Date(year, month, 0).getDate();
    };

    renderDays(daysThisMonth){
        let days = [];

        for(let i=1; i < daysThisMonth + 1; i++){
            days.push(<div key={i}>{i}</div>)
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
                <h1>{`<< ${thisMonth} >>`}</h1>
                <div>
                    <h5>S</h5>
                    <h5>M</h5>
                    <h5>T</h5>
                    <h5>W</h5>
                    <h5>T</h5>
                    <h5>F</h5>
                    <h5>S</h5>
                </div>
                {this.renderDays(daysThisMonth)}
            </div>
        )
    }
}
