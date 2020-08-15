import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../../LogOutButton/LogOutButton';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import SetupBtn from '../../SetupBtn/SetupBtn';

import styles from './UserPage.module.css';
import RRuleSelector from '../../RRuleSelector/RRuleSelector';
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_USER_PROFILE',
      payload: this.props.store.user.id,
    });
    this.props.dispatch({
      type: 'FETCH_EVENTS',
      payload: this.props.store.user.id,
    });
  }

  launchApp = () => {
    this.props.history.push('/main-view');
  };
  render() {
    return (
      <div className="setupForm">
        <div className="formHeading">
          <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        </div>
        <div
          style={{
            margin: 'auto',
            width: '50%',
            border: '1px solid blue',
            borderRadius: '5px',
            padding: '15px',
          }}
        >
          <RRuleSelector />
        </div>
        <div className={styles.innerUser}>
          <p>Your ID is: {this.props.store.user.id}</p>
          {/* TODO: Conditionally render setup based on if user has events saved (first login) */}
          {this.props.store.user.profile ? (
            <div>
              <h1>Your information:</h1>
              <p>
                Name: {this.props.store.user.profile.first_name}{' '}
                {this.props.store.user.profile.last_name}
              </p>
            </div>
          ) : (
            <p>
              Must be your first time here! Let's help you get situated and set
              up your profile
            </p>
          )}
          {this.props.store.eventsReducer.length > 1 ? (
            <button className="log-in" onClick={this.launchApp}>
              Launch FindMyTime
            </button>
          ) : (
            <SetupBtn className="log-in" />
          )}
          <br />
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
