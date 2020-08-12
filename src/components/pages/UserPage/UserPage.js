import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../../LogOutButton/LogOutButton';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import SetupBtn from '../../SetupBtn/SetupBtn';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component {
  render() {
    return (
      <div className="setupForm">
        <div className="formHeading">
          <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        </div>
        <div className="inner">
          <p>Your ID is: {this.props.store.user.id}</p>
          {/* TODO: Conditionally render setup based on if user has events saved (first login) */}
          <SetupBtn className="log-in" />
          {/* <button onClick={this.setupAccount}>Go to Setup</button> */}
          <LogOutButton className="log-in" />
          {/* TODO: Conditionally render based on if user has events saved - they can't launch without some type of setup */}
          <button className="log-in">Launch FindMyTime</button>
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
