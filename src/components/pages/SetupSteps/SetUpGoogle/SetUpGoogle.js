import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';
import * as moment from 'moment';
import EventStepper from '../../../../components/EventStepper/EventStepper';
import styles from './SetUpGoogle.module.css';
// navigation purposes
import { Link } from 'react-router-dom';
import { Grid, Container, Typography, Box } from '@material-ui/core/';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class SetUpGoogle extends Component {
  state = {
    events: this.props.store.googleCalendar,
    event: {
      type: '',
      title: '',
      start: '',
      startDate: '',
      end: '',
      details: '',
      recurring: '',
      profile_id: this.props.store.user.id
        ? this.props.store.user.profile
        : null,
      freq: '',
    },
  };

  componentDidMount() {}

  getDates(recurrence, test) {
    let splitArr = recurrence.split(';');
    console.log(splitArr);
    let split2 = splitArr.filter((item, i) => {
      return item.includes('UNTIL');
    });
    const index = function (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].substring(0, 5) === 'UNTIL') {
          return i;
        }
      }
    };
  }

  setRecurring(days) {
    const newDays = days.map((day) => {
      switch (day) {
        case 'SU':
          return 1;
        case 'MO':
          return 2;
        case 'TU':
          return 3;
        case 'WE':
          return 4;
        case 'TH':
          return 5;
        case 'FR':
          return 6;
        case 'SA':
          return 7;
      }
    });
    return newDays;
  }

  addEvent = (index) => (event) => {
    console.log('adding event', index);
    const currentEvent = this.state.events[index];
    console.log(currentEvent.recurrence);
    let recurring = null;
    let newDays;
    let untilDate;
    if (currentEvent.recurrence) {
      let recurrence = currentEvent.recurrence[0];
      let splitArr = recurrence.split(';');
      console.log(splitArr);
      let split2 = splitArr.filter((item, i) => {
        return item.includes('BYDAY');
      });
      const arr = split2[0].split('=');
      console.log(arr);
      const days = arr[1].split(',');
      newDays = this.setRecurring(days);
      let split3 = splitArr.filter((item, i) => {
        return item.includes('UNTIL');
      });
      const arr2 = split3[0].split('=');
      console.log(arr2);
      untilDate = arr2[1];
    }
    console.log(newDays);

    const startDate = moment(currentEvent.start.dateTime).format('YYYY-MM-DD');
    const start = moment(currentEvent.start.dateTime).format(
      'YYYY-MM-DD HH:mm:ss'
    );
    let end = moment(currentEvent.end.dateTime).format('YYYY-MM-DD HH:mm');
    let endDate;
    if (currentEvent.recurrence) {
      endDate =
        moment(untilDate).format('YYYY-MM-DD') +
        ' ' +
        moment(end).format('HH:mm:ss');
      console.log(end);
    }
    const dataToAdd = {
      type: 'Task',
      title: currentEvent.summary,
      details: currentEvent.description,
      startDate,
      start,
      end,
      endDate,
      recurring,
      profile_id: this.props.store.user.profile.id,
      daysOfWeek: newDays,
    };
    console.log(dataToAdd);
    this.props.dispatch({ type: 'ADD_GOOGLE_EVENT', payload: dataToAdd });
  };

  render() {
    const date = new Date();
    console.log(date);
    return (
      <Container maxWidth="lg">
        <Grid container spacing={2} className="setupForm">
          <Grid item lg={12} style={{ borderBottom: '1px solid #888' }}>
            <Typography variant="h3">
              Welcome, {this.props.user.username} to the Setup Google
            </Typography>
          </Grid>

          <Grid container spacing={5} style={{ padding: '25px' }}>
            <Grid item lg={7} className={styles.innerGoogle}>
              <EventStepper
                events={this.state.events}
                addEvent={this.addEvent}
              />
            </Grid>
            <Grid item lg={3} style={{ padding: '18%' }}>
              <Link to="/google-confirm">
                <button className="log-in">Looks Good!</button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(SetUpGoogle);
