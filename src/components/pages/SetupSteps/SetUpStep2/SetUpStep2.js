import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';
import SetUpStepTest from '../SetUpStepTest/SetUpStepTest';

import styles from './SetUpStep2.module.css';
import { Grid, Container, Typography } from '@material-ui/core/';

// importing 3rd party comps/functions
import moment from 'moment';

// navigation purposes

// Google Import option starts here
// import GoogleBtn from '../../../GoogleBtn/GoogleBtn';

// let value = '';
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class SetUpStep2 extends Component {
  state = {
    // winddown: {
    //   type: 'winddown',
    //   startTime: '',
    //   date: moment(new Date()).format('YYYY-MM-DD'),
    //   endTime: '',
    //   details: '',
    //   recurring: true,
    //   recurring_event_id: 1,
    //   profile_id: this.props.store.user.id,
    // },
  };

  handleInput = (input) => (event) => {
    this.setState({
      winddown: {
        ...this.state.winddown,
        [input]: event.target.value,
      },
    });
  };

  handleTimeRange = ([startTime, endTime]) => {
    if (startTime !== undefined) {
      // this.props.dispatch({
      //   type: 'SET_WAKEUP_START_TIME',
      //   payload: { startTime },
      // });
      this.setState({
        winddown: {
          ...this.state.winddown,
          startTime,
        },
      });
    } else {
      this.setState({
        winddown: {
          ...this.state.winddown,
          endTime,
        },
      });
    }
    // this.props.dispatch({
    //   type: 'SET_WAKEUP_END_TIME',
    //   payload: { endTime },
    // });
  };

  handleNext = (data) => {
    this.props.dispatch({
      type: 'SET_WINDDOWN_ROUTINES',
      payload: data,
    });
    this.props.history.push('/setup-confirm');
  };

  render() {
    const maxWidth = 'sm';
    return (
      <>
        <Container maxWidth={maxWidth} className={styles.headingBox}>
          <Grid container spacing={8}>
            <Grid item lg={12}>
              <Typography
                variant="h2"
                component="h1"
                style={{ textDecoration: 'underline' }}
              >
                WindDown Routines:
              </Typography>
              <Grid item lg={6}>
                <Typography variant="body2">
                  Let's wrap up our day with a great WindDown routine. Better
                  sleep = a better you! This routine adjusts your body from the
                  busyness of the day and signals it's time to go to sleep. This
                  let's you fall asleep even faster. So let's plan it out.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <SetUpStepTest maxWidth={maxWidth} handleNext={this.handleNext} />
      </>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(SetUpStep2);
