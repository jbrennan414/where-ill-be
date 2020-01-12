import React, { Component } from 'react';

export default class CalendarView extends Component {
    render() {

        const d = new Date();
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
        var n = month[d.getMonth()].toUpperCase();
     
        return (
            <div>
                <h1>{`<< ${n} >>`}</h1>
            </div>
        )
    }
}
