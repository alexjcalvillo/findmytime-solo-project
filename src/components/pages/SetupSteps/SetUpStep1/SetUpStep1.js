import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import mapStoreToProps from '../../../../redux/mapStoreToProps';
import moment from 'moment';
import SetUpStepTest from '../SetUpStepTest/SetUpStepTest';

import styles from './SetUpStep1.module.css';

// importing react-time-picker
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import RRuleSelector from '../../../RRuleSelector/RRuleSelector';
import { Grid, Container, Typography } from '@material-ui/core/';

// steps 1 and 2 have similar setup with differences in reducers and titling
class SetUpStep1 extends Component {
  state = {
    wakeup: {
      type: 'wakeup',
      startTime: '',
      date: moment(new Date()).format('YYYY-MM-DD'),
      endTime: '',
      details: '',
      recurring: this.props.store.recurring,
      profile_id: this.props.store.user.id,
    },
  };

  handleInput = (input) => (event) => {
    this.setState({
      wakeup: {
        ...this.state.wakeup,
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
        wakeup: {
          ...this.state.wakeup,
          startTime,
        },
      });
    } else {
      this.setState({
        wakeup: {
          ...this.state.wakeup,
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
      type: 'SET_WAKEUP_ROUTINES',
      payload: data,
    });
    this.props.history.push('/setup-2');
  };

  getRecurring = () => (recurring) => {
    console.log(recurring);
    this.setState({
      wakeup: {
        ...this.state.wakeup,
        recurring,
      },
    });
  };

  render() {
    const width = 'sm';
    return (
      <>
        <Container maxWidth={width} className={styles.headingBox}>
          <Grid container spacing={8}>
            <Grid item lg={12}>
              <Typography
                variant="h2"
                component="h1"
                style={{ textDecoration: 'underline' }}
              >
                WakeUp Routines:
              </Typography>
              <Grid item lg={6}>
                <Typography variant="body2">
                  We are going to start with your morning routine! Trust us, we
                  know you don't want to wake up, but the key to a strong,
                  productive day is a great start. So let's plan it out.
                </Typography>
              </Grid>
              {/* <button
            className="log-in"
            style={{
              float: 'right',
              position: 'relative',
              bottom: '1.5%',
              color: 'black',
            }}
            onClick={this.handleNext}
          >
            Next
          </button> */}
            </Grid>
          </Grid>
        </Container>
        <SetUpStepTest maxWidth={width} handleNext={this.handleNext} />
      </>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(withRouter(SetUpStep1));
