import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';

// importing react-time-picker
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';

// steps 1 and 2 have similar setup with differences in reducers and titling
class SetUpStep1 extends Component {
  state = {
    notes: '',
  };

  handleInput = (input) => (event) => {
    this.setState({
      [input]: event.target.value,
    });
  };

  handleTimeRange = ([startTime, endTime]) => {
    if (startTime !== undefined) {
      this.props.dispatch({
        type: 'SET_WAKEUP_START_TIME',
        payload: { startTime },
      });
    }
    this.props.dispatch({
      type: 'SET_WAKEUP_END_TIME',
      payload: { endTime },
    });
  };

  handleNext = () => {
    this.props.dispatch({
      type: 'SET_WAKEUP_ROUTINE_NOTES',
      payload: this.state.notes,
    });
    this.props.history.push('/setup-2');
  };

  render() {
    return (
      <div className="setupForm">
        <div className="formHeading">
          <h1>Welcome, {this.props.user.username}: SetUp Step 1</h1>
        </div>
        <div className="inner">
          <div id="wrapper">
            <div id="left"></div>
            <div id="right">
              <h4>WakeUp Routines:</h4>
              <p>
                We are going to start with your morning routine! Trust us, we
                know you don't want to wake up, but the key to a strong,
                productive day is a great start. So let's plan it out.
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
                onChange={this.handleInput('notes')}
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
                disableClock
                maxDetail={'minute'}
                onChange={this.handleTimeRange}
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
              <br />

              <button
                className="log-in"
                style={{
                  float: 'right',
                  position: 'relative',
                  bottom: '50px',
                  color: 'black',
                }}
                onClick={this.handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        {/* <p>{this.props.store.wakeup}</p> */}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(SetUpStep1);
