import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

// navigation purposes
import { Link } from 'react-router-dom';

// Google Import option starts here
import GoogleBtn from '../../GoogleBtn/GoogleBtn';

import './SetUp.css';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class SetUp extends Component {
  state = {};
  render() {
    return (
      <div className="setupForm">
        <div className="formHeading">
          <h1>Welcome, {this.props.user.username} to the Setup Page</h1>
        </div>
        <div className="inner">
          <div id="wrapper">
            <div id="left"></div>
            <div id="right">
              <h3>Let's get your schedule:</h3>
              <Link to="/setup-1">
                <button className="log-in">Begin Guided Setup</button>
              </Link>
              <br />
              <hr />
              <h3>Or let Google do the work:</h3>
              <GoogleBtn />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(SetUp);
