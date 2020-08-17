import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';

import styles from './SetUpConfirm.module.css';
import { Grid, Container, Typography } from '@material-ui/core/';

// navigation purposes
import { Link } from 'react-router-dom';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
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
    console.log(this.props.store.wakeup);
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
                Routine Time: {this.props.store.wakeup.startDate} -{' '}
                {this.props.store.wakeup.endDate}
              </li>
              <li>{this.props.store.wakeup.details}</li>
              {this.props.store.winddown.recurring && <li>Frequency: Daily</li>}
            </ul>

            <h4>WindDown Routines:</h4>
            <ul>
              <li>
                Routine: {this.props.store.winddown.startTime} -{' '}
                {this.props.store.winddown.endTime}
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
