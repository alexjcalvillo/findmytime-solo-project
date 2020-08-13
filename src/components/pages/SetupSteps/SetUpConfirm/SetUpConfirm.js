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

  setRoutines = () => {
    this.props.dispatch({
      type: 'SET_ROUTINES',
      payload: {
        wakeup: this.props.store.wakeup,
        winddown: this.props.store.winddown,
      },
    });
  };
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
          <h4>WakeUp Routines:</h4>
          <ul>
            <li>
              {this.props.store.wakeup.startTime} -{' '}
              {this.props.store.wakeup.endTime}
            </li>
            <li>{this.props.store.wakeup.notes}</li>
          </ul>

          <h4>WindDown Routines:</h4>
          <ul>
            <li>
              {this.props.store.winddown.startTime} -{' '}
              {this.props.store.winddown.endTime}
            </li>
            <li>{this.props.store.winddown.notes}</li>
          </ul>
          <Link to="/admin">
            <button className="log-in" onClick={this.setRoutines}>
              Looks Good!
            </button>
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
