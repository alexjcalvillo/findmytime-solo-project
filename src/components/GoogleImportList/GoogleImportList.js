import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class TemplateClass extends Component {
  state = {
    heading: 'Class Component',
  };

  render() {
    return (
      <div>
        {this.state.events.map((event, index) => {
          return (
            <li key={index}>
              <p>{event.summary}</p>
              <p
                style={{
                  background: 'linear-gradient(90deg, #f2f2f2, #444)',
                }}
              >
                Start:{' '}
                {moment(event.start.dateTime).format('DD-MM-YYYY hh:mm a')}
                <br />
                End: {moment(event.end.dateTime).format('DD-MM-YYYY hh:mm a')}
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
              <p>Recurring?</p> {event.recurrence ? <p>True</p> : <p>False</p>}
              <button className="log-in" onClick={this.addEvent(index)}>
                Add Event?
              </button>
              <hr />
            </li>
          );
        })}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(TemplateClass);
