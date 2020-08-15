import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import moment from 'moment';
// import React Big Calendar for use
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import MyFullCalendar from '../../MyFullCalendar/MyFullCalendar';
// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
const localizer = momentLocalizer(moment);
let allViews = Object.keys(Views).map((k) => Views[k]);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  });

class MainView extends Component {
  state = {
    myEventsList: [],
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_EVENTS',
      payload: this.props.store.user.id,
    });
    this.setState({
      myEventsList: this.props.store.eventsReducer.map((event, index) => {
        const year = moment(event.event_date).format('YYYY');
        const month = moment(event.event_date).format('M') - 1;
        const day = moment(event.event_date).format('D');
        console.log(year, month, day);
        const startHour = moment(event.start_time, 'hh:mm:ss').format('HH');
        const startMinute = moment(event.start_time, 'hh:mm:ss').format('m');
        const endHour = moment(event.end_time, 'hh:mm:ss').format('HH');
        const endMinute = moment(event.end_time, 'hh:mm:ss').format('mm');
        console.log(startHour, startMinute, endHour, endMinute);
        return {
          title: event.event_title,
          //   start: new Date(year, month, day, startHour, startMinute),
          //   end: new Date(year, month, day, endHour, endMinute),
          start: '2020-08-15T05:00:00',
          end: '2020-08-15T06:15:00',
          allDay: false,
          //   daysOfWeek: [1, 2, 3, 4, 5],
          borderColor: 'green',
          backgroundColor: 'blue',
          rrule: 'RRULE:FREQ=WEEKLY;WKST=SU;INTERVAL=2;BYDAY=TH',
        };
      }),
    });
  }
  render() {
    console.log(this.state.myEventsList);
    console.log();
    return (
      <div className="setupForm">
        <div className="formHeading">
          <h2>The Main View</h2>
        </div>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              backgroundColor: '#444',
              flex: '1',
              height: '800px',
              width: '15%',
              marginRight: '28px',
            }}
          >
            <div className="formHeading"></div>
            <div style={{ color: 'white' }}>
              <h4>Today's Routines:</h4>
              {this.state.myEventsList.map((event, index) => {
                const eventStart = moment(event.start).format('YYYY-MM-DD');
                const todaysDate = moment(new Date()).format('YYYY-MM-DD');

                if (eventStart === todaysDate) {
                  return <div key={index}>{event.title}</div>;
                }
              })}
            </div>
          </div>
          <div
            style={{
              height: '800px',
              width: '100%',
              flex: '4',
              flexDirection: 'row',
            }}
          >
            {/* <Calendar
              culture={'en'}
              events={this.state.myEventsList}
              views={allViews}
              step={60}
              showMultiDayTimes
              // max={dates.add(
              //   dates.endOf(new Date(2015, 17, 1), 'day'),
              //   -1,
              //   'hours'
              // )}
              defaultDate={new Date()}
              components={{
                timeSlotWrapper: ColoredDateCellWrapper,
              }}
              localizer={localizer}
            />
          </div> */}
            <MyFullCalendar events={this.state.myEventsList} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MainView);
