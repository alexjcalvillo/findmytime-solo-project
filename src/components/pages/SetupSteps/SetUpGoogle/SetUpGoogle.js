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

  addEvent = (index) => (event) => {
    console.log('adding event', index);
    const currentEvent = this.state.events[index];

    if (currentEvent.recurrence) {
      const recurrence = currentEvent.recurrence[0];
    }

    const startDate = moment(currentEvent.start.dateTime).format('YYYY-MM-DD');
    const start = moment(currentEvent.start.dateTime).format(
      'YYYY-MM-DD HH:mm:ss'
    );
    const end = moment(currentEvent.end.dateTime).format('YYYY-MM-DD HH:mm:ss');
    const dataToAdd = {
      type: 'Task',
      title: currentEvent.summary,
      details: currentEvent.description,
      startDate,
      start,
      end,
      recurring: currentEvent.recurrence || null,
      profile_id: this.props.store.user.profile.id,
    };
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
