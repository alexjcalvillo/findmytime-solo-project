import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';

// import { RRule, RRuleSet, rrulestr } from 'rrule';
import moment from 'moment';

import styles from './SetUpConfirm.module.css';
import { Grid, Container, Typography } from '@material-ui/core/';

// navigation purposes
import { Link } from 'react-router-dom';

class SetUpConfirm extends Component {
  state = {};

  setRoutines = () => {
    this.props.dispatch({
      type: 'SET_ROUTINES',
      payload: {
        wakeup: this.props.store.wakeup,
        winddown: this.props.store.winddown,
      },
    });
  };
  render() {
    // console.log(this.props.store.wakeup);
    // const recurring = rrulestr(this.props.store.winddown.recurring);
    // const recurringText = recurring.toText();
    // console.log(recurringText);
    return (
      <Container maxWidth="sm" className={styles.headingBox}>
        <Grid container spacing={8}>
          <Grid item lg={12}>
            <h1>
              Welcome, {this.props.user.username} to the Setup Confirmation Page
            </h1>
          </Grid>
          <div className={styles.innerConfirm}>
            <h3>Does this look correct?</h3>
            <h4>WakeUp Routines:</h4>
            <ul>
              <li>
                Routine Time:{' '}
                {moment(this.props.store.wakeup.start).format('HH:mm')} -{' '}
                {moment(this.props.store.wakeup.end).format('HH:mm')}
              </li>
              <li>{this.props.store.wakeup.details}</li>
              {this.props.store.winddown.recurring && (
                <li>Frequency:{recurringText}</li>
              )}
            </ul>

            <h4>WindDown Routines:</h4>
            <ul>
              <li>
                Routine:{' '}
                {moment(this.props.store.winddown.start).format('HH:mm')} -{' '}
                {moment(this.props.store.winddown.end).format('HH:mm')}
              </li>
              <li>{this.props.store.winddown.details}</li>
              {this.props.store.winddown.recurring && <li>Frequency: Daily</li>}
            </ul>
            <Link to="/admin">
              <button className="log-in" onClick={this.setRoutines}>
                Looks Good!
              </button>
            </Link>
          </div>
        </Grid>
      </Container>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(SetUpConfirm);
