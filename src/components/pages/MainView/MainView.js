import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import moment from 'moment';
import { Grid, Container, Typography } from '@material-ui/core/';
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
      type: 'FETCH_EVENTS',
      payload: this.props.store.user.id,
    });
    this.setState({
      myEventsList: this.props.store.eventsReducer.map((event, index) => {
        const year = moment(event.event_date).format('YYYY');
        const month = moment(event.event_date).format('M') - 1;
        const day = moment(event.event_date).format('D');
        console.log(year, month, day);
        const startHour = moment(event.start_time, 'hh:mm:ss').format('HH');
        const startMinute = moment(event.start_time, 'hh:mm:ss').format('m');
        const endHour = moment(event.end_time, 'hh:mm:ss').format('HH');
        const endMinute = moment(event.end_time, 'hh:mm:ss').format('mm');
        console.log(startHour, startMinute, endHour, endMinute);
        return {
          title: event.event_title,
          start: new Date(year, month, day, startHour, startMinute),
          //   end: new Date(year, month, day, endHour, endMinute),
          startTime: '05:00:00',
          endTime: '06:15:00',
          allDay: false,
          // daysOfWeek: [1, 2, 3, 4, 5],
          borderColor: 'green',
          backgroundColor: 'blue',
          rrule: event.recurring,
          duration: '01:30',
        };
      }),
    });
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
    console.log();
    return (
      <Container maxWidth="lg" disableGutters={true} className="setupForm">
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <Typography variant="h2" component="h2">
              The Main View
            </Typography>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
            <Grid item lg={12}>
              <Typography variant="overline">Today's Routines:</Typography>
              {this.props.store.eventsReducer.map((event, index) => {
                return (
                  <Grid item lg={10} key={index} className={styles.itemToday}>
                    {event.title}
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item xl={8} lg={8} md={8} sm={8} xs={12}>
            <MyFullCalendar />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(MainView);
