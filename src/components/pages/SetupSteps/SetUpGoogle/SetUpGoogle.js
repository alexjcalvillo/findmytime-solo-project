import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';

import * as moment from 'moment';

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
      profile_id: this.props.store.user.id,
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
        <div className="inner">
          <h3>
            Select the Events you would like to import to your FindMyTime
            Calendar
          </h3>
          <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
            {this.state.events.map((event, index) => {
              return (
                <li key={index}>
                  <p>{event.summary}</p>
                  <p>
                    Start:{' '}
                    {moment(event.start.dateTime).format('DD-MM-YYYY hh:mm a')}
                    <br />
                    End:{' '}
                    {moment(event.end.dateTime).format('DD-MM-YYYY hh:mm a')}
                  </p>
                  <p
                    style={{
                      border: '1px solid black',
                      borderRadius: '2px',
                      overflow: 'scroll',
                    }}
                  >
                    Details: {event.description}
                  </p>
                  <p>Recurring?</p> {event.recurrence && <p>True</p>}
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
