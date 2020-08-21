import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';
import SwipeableTextMobileStepper from '../../../../components/EventStepper/EventStepper';
import * as moment from 'moment';

import styles from './SetUpGoogle.module.css';
// navigation purposes
import { Link } from 'react-router-dom';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class SetUpGoogle extends Component {
  state = {
    events: this.props.store.googleCalendar,
  };

  componentDidMount() {}

  addEvent = (index) => (event) => {
    console.log('adding event', index);
    const currentEvent = this.state.events[index];

    if (currentEvent.recurrence) {
    }

    const event_date = moment(currentEvent.start.dateTime).format('YYYY-MM-DD');
    const start_time = moment(currentEvent.start.dateTime).format('hh:mm');
    const end_time = moment(currentEvent.end.dateTime).format('hh:mm');
    const dataToAdd = {
      event_type: 'Task/Event',
      event_title: currentEvent.summary,
      event_details: currentEvent.description,
      event_date,
      start_time,
      end_time,
      recurring: currentEvent.recurrence || null,
      recurring_event_id: 1,
      profile_id: this.props.store.user.profile.id,
    };
    this.props.dispatch({ type: 'ADD_GOOGLE_EVENT', payload: dataToAdd });
  };

  render() {
    const date = new Date();
    console.log(date);
    return (
      <div className="setupForm">
        <div className="formHeading">
          <h1>Welcome, {this.props.user.username} to the Setup Google</h1>
        </div>
        <div className={styles.innerGoogle}>
          <h3>
            Select the Events you would like to import to your FindMyTime
            Calendar
          </h3>
          <SwipeableTextMobileStepper />
          <ul>
            {this.state.events.map((event, index) => {
              return (
                <li
                  key={index}
                  style={{
                    listStyle: 'none',
                    margin: '0 0 2.5% 0',
                    padding: '1.5%',
                    border: '1px solid #444',
                    borderRadius: '4px',
                    boxShadow: '1px 0px 4px',
                  }}
                >
                  <p style={{ textDecoration: 'underline' }}>{event.summary}</p>
                  <p
                    style={{
                      background: 'linear-gradient(90deg, #f2f2f2, #444)',
                      opacity: '0.9',
                    }}
                  >
                    Start:{' '}
                    {moment(event.start.dateTime).format('DD-MM-YYYY hh:mm a')}
                    <br />
                    End:{' '}
                    {moment(event.end.dateTime).format('DD-MM-YYYY hh:mm a')}
                  </p>
                  Details:
                  <p
                    style={{
                      border: '1px solid #444',
                      borderRadius: '4px',
                      height: '150px',
                      overflow: 'scroll',
                    }}
                  >
                    {event.description}
                  </p>
                  <p>Recurring?</p>{' '}
                  {event.recurrence ? <p>True</p> : <p>False</p>}
                  <button className="log-in" onClick={this.addEvent(index)}>
                    Add Event?
                  </button>
                  <hr />
                </li>
              );
            })}
          </ul>
          <Link to="/google-confirm">
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
export default connect(mapStoreToProps)(SetUpGoogle);
