import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';

import styles from './SetUpStep2.module.css';

// importing 3rd party comps/functions
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import moment from 'moment';

// navigation purposes
import { Link } from 'react-router-dom';

// Google Import option starts here
// import GoogleBtn from '../../../GoogleBtn/GoogleBtn';

// let value = '';
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class SetUpStep2 extends Component {
  state = {
    winddown: {
      type: 'winddown',
      startTime: '',
      date: moment(new Date()).format('YYYY-MM-DD'),
      endTime: '',
      details: '',
      recurring: true,
      recurring_event_id: 1,
      profile_id: this.props.store.user.id,
    },
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

  handleNext = () => {
    this.props.dispatch({
      type: 'SET_WINDDOWN_ROUTINES',
      payload: this.state.winddown,
    });
    this.props.history.push('/setup-confirm');
  };

  render() {
    return (
      <div className="setupForm">
        <div className="formHeading">
          <h1>Welcome, {this.props.user.username}: SetUp Step 2</h1>
        </div>
        <div className="inner">
          <div id={styles.wrapper}>
            <div id={styles.left}></div>
            <div id={styles.right}>
              <h4>WindDown Routines:</h4>
              <p>
                Let's wrap up our day with a great WindDown routine. Better
                sleep = a better you! This routine adjusts your body from the
                busyness of the day and signals it's time to go to sleep. This
                let's you fall asleep even faster. So let's plan it out.
              </p>
              <hr />
              <label htmlFor="details">Routine Details</label>
              <p style={{ fontSize: '0.8rem', WebkitTextEmphasis: '' }}>
                The kinds of things you might want to think about: What time do
                you want to wake up? What are some "must-haves" in the morning?
                For us, coffee is mandatory; roughly 15 minutes to get up and
                make it, plus read and enjoy it.
              </p>
              <br />
              <textarea
                id="details"
                type="text"
                placeholder="details"
                onChange={this.handleInput('details')}
              />
              <br />
              <p>
                Start Time & End Time
                <br />
                (remember this is to block off daily time to get up and ready
                for your day!)
              </p>
              <TimeRangePicker
                required
                maxDetail={'minute'}
                onChange={(value) => this.handleTimeRange(value)}
                value={this.state.timeStart}
              />

              <br />
              <label htmlFor="frequency">Frequency</label>
              <p>
                How often? This is probably going to be daily, but if you want
                to sleep in on the weekends, we don't blame you!
              </p>
              <select id="frequency">
                <option value="daily">Daily</option>
              </select>
              <button
                className="log-in"
                style={{
                  float: 'right',
                  position: 'relative',
                  bottom: '1.5%',
                  right: '-50px',
                  color: 'black',
                }}
                onClick={this.handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(SetUpStep2);
