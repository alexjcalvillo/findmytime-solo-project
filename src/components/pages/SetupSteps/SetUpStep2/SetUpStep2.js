import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';

// importing react-time-picker
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
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
    details: '',
    timeStart: '',
    timeEnd: '',
  };

  handleInput = (input) => (event) => {
    this.setState({
      [input]: event.target.value,
    });
  };

  handleTimeRange(times) {
    console.log(times);
    this.setState({
      timeStart: times[0],
      timeEnd: times[1],
    });
  }

  handleNext = () => {
    this.props.history.push('/setup-confirm');
  };

  render() {
    console.log(this.props.store.wakeup);
    return (
      <div className="setupForm">
        <div className="formHeading">
          <h1>Welcome, {this.props.user.username}: SetUp Step 2</h1>
        </div>
        <div className="inner" style={{ overflow: 'scroll' }}>
          <h4>WindDown Routines:</h4>
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
            maxDetail={'minute'}
            onChange={(value) => this.handleTimeRange(value)}
            value={this.state.timeStart}
          />

          <br />
          <select>
            <option value="daily">Daily</option>
          </select>
          <button
            className="log-in"
            style={{
              display: 'block',
              marginLeft: '80%',
              // bottom: '50px',
              color: 'black',
            }}
            onClick={this.handleNext}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(SetUpStep2);
