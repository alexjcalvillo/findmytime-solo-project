import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import styles from './MyFullCalendar.module.css';
// Full Calendar imports
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
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
  render() {
    console.log(this.props.events);
    console.log(this.props.googleEvents);
    return (
      <div className={styles.calendar}>
        <div className="formHeading">
          <h1>Full Calendar</h1>
        </div>
        <div>
          <FullCalendar
            plugins={[dayGridPlugin, listPlugin, rrulePlugin]}
            initialView="listWeek"
            headerToolbar={{
              start: 'today prev next',
              center: 'title',
              end: 'dayGridMonth dayGridDay listWeek',
            }}
            buttonText={{
              today: 'today',
              dayGridMonth: 'Month',
              week: 'week',
              day: 'Day',
              listWeek: 'Week',
            }}
            timeZone="local"
            // events={this.props.events}
            events={this.props.events}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MyFullCalendar);
