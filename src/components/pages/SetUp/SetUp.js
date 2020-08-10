import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../../LogOutButton/LogOutButton';
import mapStoreToProps from '../../../redux/mapStoreToProps';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class SetUp extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Welcome, {this.props.user.username} to the Setup Page</h1>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(SetUp);
