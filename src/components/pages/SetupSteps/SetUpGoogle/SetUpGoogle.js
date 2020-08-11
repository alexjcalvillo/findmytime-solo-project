import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';

// navigation purposes
import { Link } from 'react-router-dom';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class SetUpGoogle extends Component {
  state = {
    events: [],
  };

  componentDidMount() {
    // this.props.dispatch({
    //   type: 'GET_GOOGLE_CALENDAR',
    //   payload: this.props.store.google,
    // });
    // this.setState({
    //   accessToken: this.props.store.google,
    // });
    this.getEvents();
  }

  getEvents = () => {
    function start() {
      window.gapi.client
        .init({
          apiKey: 'AIzaSyBlgNuGbplqSIBBSWHlGQaCCKVZU7PyoL0',
          CLIENT_ID:
            '129021208394-bp1f5i16igv01sp39vsj7be64ub2mu03.apps.googleusercontent.com',
          clientSecret: 'h-kdqqnmQsLVEHHeAn2rOCGo',
        })
        .then(function () {
          return window.gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/'primary'/events`,
          });
        })
        .then(
          (response) => {
            let events = response.result.items;
            this.setState(
              {
                events,
              },
              () => {
                console.log(this.state.events);
              }
            );
          },
          function (reason) {
            console.log(reason);
          }
        );
    }
    window.gapi.load('client', start);
  };
  render() {
    return (
      <div className="setupForm">
        <div className="formHeading">
          <h1>Welcome, {this.props.user.username} to the Setup Google</h1>
        </div>
        <div className="inner">
          <h3>See your token?</h3>
          <p>
            {this.state.events.map((event, index) => {
              return (
                <div>
                  <p>{event.summary}</p>
                  <p>
                    {event.start.dateTime} - {event.end.dateTime}
                  </p>
                </div>
              );
            })}
          </p>
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
export default connect(mapStoreToProps)(SetUpGoogle);
