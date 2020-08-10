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
class SetUpStep1 extends Component {
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
    // value = event.target.value;
    console.log(times);
    this.setState({
      timeStart: times[0],
      timeEnd: times[1],
    });
  }

  render() {
    return (
      <div className="setupForm">
        <div className="formHeading">
          <h1>Welcome, {this.props.user.username}: SetUp Step 1</h1>
        </div>
        <div className="inner">
          <h4>WakeUp Routines:</h4>
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
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(SetUpStep1);
