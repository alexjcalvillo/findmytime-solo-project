import React from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../../LogOutButton/LogOutButton';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import SetupBtn from '../../SetupBtn/SetupBtn';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

const UserPage = (props) => (
  <div>
    <h1 id="welcome">Welcome, {props.store.user.username}!</h1>
    <p>Your ID is: {props.store.user.id}</p>
    <SetupBtn className="log-in" />
    {/* <button onClick={this.setupAccount}>Go to Setup</button> */}
    <LogOutButton className="log-in" />
  </div>
);

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
