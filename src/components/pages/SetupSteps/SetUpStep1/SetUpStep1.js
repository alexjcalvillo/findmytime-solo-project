import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';

// importing react-time-picker
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';

// steps 1 and 2 have similar setup with differences in reducers and titling
class SetUpStep1 extends Component {
  state = {
    wakeup: {
      details: '',
      timeRange: [],
    },
  };

  handleInput = (input) => (event) => {
    this.setState({
      wakeup: {
        [input]: event.target.value,
      },
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
      payload: this.state.wakeup.details,
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
          <h4>WakeUp Routines:</h4>
          <p>
            I'm baby polaroid affogato try-hard, pabst taiyaki pitchfork
            portland blog cardigan edison bulb. +1 cred hoodie VHS, bitters
            ennui skateboard chia chartreuse cliche air plant put a bird on it
            meh. Lumbersexual tumblr thundercats bicycle rights mixtape
            readymade XOXO kale chips pinterest kombucha. Migas typewriter lyft
            subway tile, trust fund polaroid vice try-hard edison bulb godard 3
            wolf moon green juice keffiyeh meggings crucifix. Cray readymade
            flannel, af try-hard XOXO pug ennui tbh pok pok.
          </p>
          <p>
            Air plant truffaut palo santo copper mug fashion axe vape food truck
            chia dreamcatcher. Intelligentsia scenester pok pok, post-ironic
            four loko farm-to-table sriracha. Messenger bag lo-fi chillwave,
            kinfolk thundercats microdosing freegan pabst swag dreamcatcher.
            Readymade godard meh, knausgaard microdosing man bun hot chicken.
          </p>
          <hr />
          <label htmlFor="details">Routine Details</label>
          <br />
          <textarea
            id="details"
            type="text"
            placeholder="details"
            onChange={this.handleInput('details')}
          />
          <br />
          <TimeRangePicker
            required
            disableClock
            maxDetail={'minute'}
            onChange={this.handleTimeRange}
          />
          <br />
          <select>
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
        {/* <p>{this.props.store.wakeup}</p> */}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(SetUpStep1);
