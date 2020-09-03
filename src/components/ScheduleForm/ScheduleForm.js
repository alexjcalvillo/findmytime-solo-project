import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import moment from 'moment';

import styles from './ScheduleForm.module.css';
import { Grid, Container, Typography } from '@material-ui/core/';

// import Container from '@material-ui/core/Container';
// importing react-time-picker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Events to be built using this example structure
// {
//     title: event.title,
//     startRecur: moment(event.date).format(
//       'YYYY-MM-DD'
//     ),
//     startTime: moment(event.start).format('HH:mm:ss'),
//     endTime: moment(event.end).format('HH:mm:ss'),
//     // daysOfWeek: [1, 2, 3, 4, 5],
//     backgroundColor: type(event.event_type),
//     // rrule: event.recurring,
//     duration,
//   };

// RULE creator
// const rule = new RRule({
//   freq: this.state.freq,
//   interval: this.state.interval,
//   byweekday: realDays,
//   dtstart: this.state.startDate || new Date(),
//   until: this.state.endDate || null,
// });

// steps 1 and 2 have similar setup with differences in reducers and titling
class ScheduleForm extends Component {
  state = {
    event: {
      type: '',
      title: '',
      start: '',
      startDate: '',
      end: '',
      details: '',
      recurring: '',
      profile_id: this.props.store.user.id
        ? this.props.store.user.profile
        : null,
      freq: '',
      repeat: false,
    },
    byweekday: {
      SU: false,
      MO: false,
      TU: false,
      WE: false,
      TH: false,
      FR: false,
      SA: false,
    },
  };

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
    if (this.props.store.user.profile !== undefined) {
      this.setState({
        event: {
          profile_id: this.props.store.user.profile.id,
        },
      });
    }
  }

  handleInput = (input) => (event) => {
    this.setState({
      event: {
        ...this.state.event,
        [input]: event.target.value,
      },
    });
  };

  setRepeat = () => {
    this.setState({
      event: {
        ...this.state.event,
        repeat: !this.state.event.repeat,
      },
    });
  };

  handleCheck = (day) => (event) => {
    this.setState({
      byweekday: {
        ...this.state.byweekday,
        [day]: !this.state.byweekday[day],
      },
    });
  };

  setStartDate(date) {
    const newDate = moment(date).format('YYYY-MM-DD HH:mm');
    this.setState({
      event: {
        ...this.state.event,
        startDate: moment(date).format('YYYY-MM-DD'), // moment(date).format('YYYY-MM-DD'),
        start: newDate,
        visualStart: date, // moment(date).format('HH:mm:ss'),
      },
    });
  }
  setEndDate(date) {
    const newDate = moment(date).format('YYYY-MM-DD HH:mm');

    this.setState({
      event: {
        ...this.state.event,
        endDate: moment(date).format('YYYY-MM-DD'),
        end: newDate,
        visualEnd: date,
      },
    });
  }

  handleNext = () => {
    const days = Object.keys(this.state.byweekday);
    const daysToUse = days.filter((day) => {
      return this.state.byweekday[day];
    });
    const realDays = this.setRecurring(daysToUse);
    const data = { ...this.state.event, daysOfWeek: realDays };
    this.props.handleNext(data);
  };

  setRecurring(days) {
    const newDays = days.map((day) => {
      switch (day) {
        case 'SU':
          return 1;
        case 'MO':
          return 2;
        case 'TU':
          return 3;
        case 'WE':
          return 4;
        case 'TH':
          return 5;
        case 'FR':
          return 6;
        case 'SA':
          return 7;
      }
    });
    return newDays;
  }

  render() {
    return (
      <div>
        <Container
          maxWidth={this.props.maxWidth}
          className="setupForm"
          id={styles.background}
        >
          <Grid container spacing={2}>
            <Grid item lg={12}>
              <Typography
                variant="h2"
                component="h2"
                className={styles.titleSched}
              >
                Schedule an event
              </Typography>
            </Grid>
            <Grid
              item
              lg={6}
              md={6}
              sm={12}
              xs={12}
              style={{ borderRight: '1px solid #888' }}
            >
              <div className={styles.innerForm}>
                <label htmlFor="title">Title: </label>
                <br />
                <input
                  className={styles.inputSchedule}
                  type="text"
                  id="title"
                  onChange={this.handleInput('title')}
                />
                <br />
                <input
                  type="checkbox"
                  id="repeat"
                  onClick={this.setRepeat}
                ></input>
                <label htmlFor="repeat"> Repeating Event?</label>
                <br />
                {this.state.event.repeat ? (
                  <>
                    <label htmlFor="freq">Repeat: </label>
                    <select
                      className={styles.inputSchedule}
                      id="freq"
                      onChange={this.handleInput('freq')}
                    >
                      <option value={undefined}>
                        Select how often this routine will be
                      </option>
                      <option value={'daily'}>Every Day</option>
                      <option value={'weekly'}>Every Week</option>
                      {/* <option value={'monthly'}>Every Month</option>
                      <option value={'yearly'}>Every Year</option> */}
                    </select>

                    <h4>Or:</h4>

                    <div>
                      <input
                        type="checkbox"
                        id="sun"
                        onChange={this.handleCheck('SU')}
                      ></input>
                      <label htmlFor="sun">Sunday</label>
                      <br />

                      <input
                        type="checkbox"
                        id="mon"
                        onClick={this.handleCheck('MO')}
                      ></input>
                      <label htmlFor="mon">Monday</label>
                      <br />
                      <input
                        type="checkbox"
                        id="tues"
                        onClick={this.handleCheck('TU')}
                      ></input>
                      <label htmlFor="tues">Tuesday</label>
                      <br />
                      <input
                        type="checkbox"
                        id="wed"
                        onClick={this.handleCheck('WE')}
                      ></input>
                      <label htmlFor="wed">Wednesday</label>
                      <br />
                      <input
                        type="checkbox"
                        id="thur"
                        onClick={this.handleCheck('TH')}
                      ></input>
                      <label htmlFor="thur">Thursday</label>
                      <br />
                      <input
                        type="checkbox"
                        id="fri"
                        onClick={this.handleCheck('FR')}
                      ></input>
                      <label htmlFor="fri">Friday</label>
                      <br />
                      <input
                        type="checkbox"
                        id="sat"
                        onClick={this.handleCheck('SA')}
                      ></input>
                      <label htmlFor="sat">Saturday</label>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <br />
                <div style={{ display: 'inline-block', width: '66%' }}>
                  <label htmlFor="start">Start Date/Time:*</label>

                  <br />
                  <DatePicker
                    id="start"
                    className={styles.dateBtn}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    selected={this.state.event.visualStart}
                    onChange={(date) => this.setStartDate(date)}
                  />
                </div>
                <div style={{ display: 'inline-block' }}>
                  <label htmlFor="end">End Date/Time:*</label>
                  <br />
                  <DatePicker
                    id="end"
                    className={styles.dateBtn}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    selected={this.state.event.visualEnd}
                    onChange={(date) => this.setEndDate(date)}
                  />
                </div>
                <Typography variant="body2">
                  *If you want the event to be indefinite, simply leave the
                  start and end dates the same and select the timeframe you wish
                  to complete this task!
                </Typography>
              </div>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div
                className={styles.innerForm}
                style={{ marginTop: '1.5%', borderBottom: '1px solid #888' }}
              >
                <label htmlFor="type">Type of Event: </label>
                <br />
                <select
                  className={styles.inputSchedule}
                  id="type"
                  onChange={this.handleInput('type')}
                >
                  <option value="">Select the type of event</option>
                  <option value="Routine">Routine</option>
                  <option value="Habit">Habit</option>
                  <option value="Task">Task</option>
                </select>
                <br />
                <label htmlFor="details">Details: </label>
                <br />
                <textarea
                  className={styles.inputText}
                  id="details"
                  onChange={this.handleInput('details')}
                ></textarea>
                <br />
              </div>
              <div className={styles.innerForm}>
                <button className={styles.nextBtn} onClick={this.handleNext}>
                  Next
                </button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(withRouter(ScheduleForm));
