import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';

// navigation purposes
import { Link } from 'react-router-dom';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class SetUpConfirm extends Component {
  state = {};
  render() {
    console.log(this.props.store.wakeup);
    return (
      <div className="setupForm">
        <div className="formHeading">
          <h1>
            Welcome, {this.props.user.username} to the Setup Confirmation Page
          </h1>
        </div>
        <div className="inner">
          <h3>Does this look correct?</h3>
          <ul>
            <li>{this.props.store.wakeup.startTime}</li>
          </ul>

          <Link to="/setup-1">
            <button className="log-in">Begin Guided Setup</button>
          </Link>
          <br />
          <hr />
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(SetUpConfirm);
