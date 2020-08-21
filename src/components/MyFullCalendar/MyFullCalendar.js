import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import styles from './MyFullCalendar.module.css';
// Material UI
import { Tooltip } from '@material-ui/core';
// Full Calendar imports
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import rrulePlugin from '@fullcalendar/rrule';

// RRule data structure
/*
rrule: {
        freq: 'weekly',
        interval: 5,
        byweekday: [ 'mo', 'fr' ],
        dtstart: '2012-02-01T10:30:00', // will also accept '20120201T103000'
        until: '2012-06-01' // will also accept '20120201'
      }
      */

class MyFullCalendar extends Component {
  handleMouseOver = (task) => {
    console.log(task);
    console.log(task.event.extendedProps.details);
    return (
      <div style="position:absolute; width:100%; height:100%; top:-1px; text-align:right; z-index:100">
        {task.event.extendedProps.details}
      </div>
    );
  };
  render() {
    console.log(this.props.events);
    console.log(this.props.googleEvents);
    return (
      <div>
        <div className={styles.myCal}>
          <FullCalendar
            plugins={[dayGridPlugin, listPlugin, timeGridPlugin, rrulePlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              start: 'today prev next',
              center: 'title',
              end: 'dayGridMonth timeGridDay timeGridWeek',
            }}
            buttonText={{
              today: 'today',
              dayGridMonth: 'Month',
              week: 'Week',
              day: 'Day',
            }}
            timeZone="local"
            // events={this.props.events}
            events={this.props.events}
            // eventMouseEnter={(task) => this.props.hover(task)}
            expandRows={false}
            showNonCurrentDates={false}
            nowIndicator={true}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MyFullCalendar);
