import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';

// navigation purposes
import { Link } from 'react-router-dom';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class GoogleConfirm extends Component {
  state = {
    events: [],
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_GOOGLE_EVENTS',
      payload: this.props.store.user.id,
    });
    this.setState({
      events: this.props.store.googleCalendar,
    });
  }
  render() {
    console.log(this.props.store.googleCalendar);
    return (
      <div className="setupForm">
        <div className="formHeading">
          <h1>
            Welcome, {this.props.user.username} to the Setup Confirmation Page
          </h1>
        </div>
        <div className="inner">
          <h3>Does this look correct?</h3>
          <h4>Imported Events:</h4>
          <ul>
            {this.props.store.googleCalendar.map((event, index) => {
              return (
                <li
                  style={{
                    borderTop: '1px solid black',
                    borderBottom: '1px solid black',
                    marginBottom: '5px',
                  }}
                  key={index}
                >
                  {event.event_type}
                  {event.event_title}
                  {event.event_date}
                  {event.start_time}
                  {event.end_time}
                  {event.recurring_event_id === 1
                    ? 'Recurring event'
                    : 'Recurring: NO'}
                </li>
              );
            })}
          </ul>
          <Link to="/admin">
            <button className="log-in">Looks Good!</button>
          </Link>
          <br />
          <hr />
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(GoogleConfirm);
