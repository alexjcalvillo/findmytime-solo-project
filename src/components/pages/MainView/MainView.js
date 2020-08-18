import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import moment from 'moment';
// Material UI imports
import { Grid, Container, Typography } from '@material-ui/core/';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import styles from './MainView.module.css';
// import React Big Calendar for use
import MyFullCalendar from '../../MyFullCalendar/MyFullCalendar';
// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

class MainView extends Component {
  state = {
    myEventsList: [],
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_GOOGLE_EVENTS',
      payload: this.props.store.user.id,
    });
    this.setState({
      googleEvents: this.props.store.googleCalendar,
    });
  }
  render() {
    console.log(this.state.myEventsList);
    return (
      <Container maxWidth="lg" className="setupForm">
        <Grid container spacing={1}>
          <Grid item lg={4} md={6} xs={12}>
            <Typography variant="h2" component="h2">
              The Main View
            </Typography>
          </Grid>
          <Grid item lg={8} md={6} xs={0}></Grid>
          <Grid item lg={4} md={12} sm={12} xs={12} className={styles.sideBar}>
            <Grid item lg={12}>
              <Typography variant="h4">
                {this.props.store.eventsReducer.length > 3
                  ? 'Busy Day!'
                  : 'Plenty of time to try something new'}
              </Typography>
              <Typography variant="overline">Today's Routines:</Typography>
              {this.props.store.eventsReducer.map((event, index) => {
                if (event.event_type === 'Routine') {
                  return (
                    <Grid
                      item
                      lg={10}
                      key={index}
                      style={{ marginTop: '25px' }}
                      className={styles.itemToday}
                    >
                      {event.title}
                    </Grid>
                  );
                }
              })}
            </Grid>
            <hr />
            <Grid item lg={12}>
              <Typography variant="overline">Today's Habits:</Typography>
              {this.props.store.eventsReducer.map((event, index) => {
                if (event.event_type === 'Habit') {
                  return (
                    <Grid
                      item
                      lg={10}
                      key={index}
                      style={{ marginTop: '25px' }}
                      className={styles.itemToday}
                    >
                      {event.title}
                    </Grid>
                  );
                }
              })}
            </Grid>
            <hr />
            <Grid item lg={12}>
              <Typography variant="overline">Today's Tasks:</Typography>
              {this.props.store.eventsReducer.map((event, index) => {
                if (event.event_type === 'Task') {
                  return (
                    <Grid
                      item
                      lg={10}
                      key={index}
                      style={{ marginTop: '25px' }}
                      className={styles.itemToday}
                    >
                      {event.title}
                    </Grid>
                  );
                }
              })}
            </Grid>
            <Grid item xl={12}>
              <FiberManualRecordIcon
                style={{ display: 'inline-block', verticalAlign: 'middle' }}
              />{' '}
              - Habit
              <br />
              <FiberManualRecordIcon
                style={{
                  color: 'blue',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                }}
              />{' '}
              - Routine
              <br />
              <FiberManualRecordIcon
                style={{
                  color: 'green',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                }}
              />{' '}
              - Task
              <br />
              <button className="log-in">New Event!</button>
            </Grid>
          </Grid>
          <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
            <MyFullCalendar
              events={this.props.store.eventsReducer.map((event, index) => {
                const end = moment(event.end).format('HH:mm:ss');
                const start = moment(event.start).format('HH:mm:ss');

                const duration = moment.duration(end, start).asMilliseconds();
                console.log(duration);
                const type = (color) => {
                  switch (color) {
                    case 'Routine':
                      return 'blue';
                    case 'Task':
                      return 'green';
                    case 'Habit':
                      return 'black';
                  }
                };
                return {
                  title: event.title,
                  startTime: moment(event.start).format('HH:mm:ss'),
                  endTime: moment(event.end).format('HH:mm:ss'),
                  // daysOfWeek: [1, 2, 3, 4, 5],
                  backgroundColor: type(event.event_type),
                  rrule: event.recurring,
                  duration,
                };
              })}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(MainView);
