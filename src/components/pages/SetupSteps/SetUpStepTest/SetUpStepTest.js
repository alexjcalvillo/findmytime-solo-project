import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import mapStoreToProps from '../../../../redux/mapStoreToProps';
import moment from 'moment';

import styles from './SetUpStepTest.module.css';
import { Grid, Container, Typography } from '@material-ui/core/';

// import Container from '@material-ui/core/Container';
// importing react-time-picker
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import RRuleSelector from '../../../RRuleSelector/RRuleSelector';
import { RRule, RRuleSet, rrulestr } from 'rrule';
import DatePicker from 'react-datepicker';

// Events to be built using this example structure
// {
//   title: 'wakeup',
//   startTime: '05:00:00',
//   endTime: '06:15:00',
//   allDay: false,
//   borderColor: 'green',
//   backgroundColor: 'blue',
//   rrule:
//     'DTSTART:20200816T100000Z RRULE:FREQ=DAILY;UNTIL=20200816T111500Z',
//   duration: '01:15',
// }

// RULE creator
// const rule = new RRule({
//   freq: this.state.freq,
//   interval: this.state.interval,
//   byweekday: realDays,
//   dtstart: this.state.startDate || new Date(),
//   until: this.state.endDate || null,
// });

// steps 1 and 2 have similar setup with differences in reducers and titling
class SetUpStepTest extends Component {
  state = {
    event: {
      type: '',
      title: '',
      startDate: '',
      date: moment(new Date()).format('YYYY-MM-DD'),
      endDate: '',
      details: '',
      recurring: '',
      profile_id: this.props.store.user.profile.id,
      freq: '',
    },
  };

  handleInput = (input) => (event) => {
    this.setState({
      event: {
        ...this.state.event,
        [input]: event.target.value,
      },
    });
  };

  setStartDate(date) {
    console.log(date);
    this.setState({
      event: {
        ...this.state.event,
        startDate: date,
      },
    });
  }
  setEndDate(date) {
    // const start = moment(this.state.event.startDate).format('YYYY-MM-DD');
    // const end = moment(date).format('YYYY-MM-DD');
    // console.log(start, end);
    // if (end === start) {
    //   const newDate = null;
    //   const duration = moment
    //     .duration(
    //       moment(this.state.event.end).format('HH:mm:ss'),
    //       moment(this.state.event.start).format('HH:mm:ss')
    //     )
    //     .asHours();
    //   console.log(duration);
    //   this.setState({
    //     event: {
    //       ...this.state.event,
    //       endDate: newDate,
    //       duration,
    //     },
    //   });
    // } else {
    this.setState({
      event: {
        ...this.state.event,
        endDate: date,
      },
    });
  }

  handleNext = () => {
    if (this.state.event.type === '' || undefined) {
      alert('Please complete the event information');
      return;
    } else if (this.state.event.endDate === '' || undefined) {
      alert('Please complete the event information');
      return;
    } else if (this.state.event.details === '' || undefined) {
      alert('Please complete the event information');
      return;
    }
    const recurring = this.setRecurring();
    const data = { ...this.state.event, recurring };
    this.props.handleNext(data);
    // this.props.dispatch({
    //   type: 'SET_WAKEUP_ROUTINES',
    //   payload: { ...this.state.event, recurring },
    // });
    // this.props.history.push('/setup-2');
  };

  setRecurring() {
    if (this.state.event.freq === '' || undefined) {
      alert('Please select your frequency.');
      return;
    }
    const rule = new RRule({
      freq: this.state.event.freq,
      interval: this.state.interval,
      byweekday: [],
      dtstart: this.state.event.startDate || null,
      until: this.state.event.endDate || null,
    });
    const recurring = rule.toString();
    return recurring;
  }

  render() {
    console.log(this.state.event);
    return (
      <div>
        <Container
          maxWidth={this.props.maxWidth}
          className="setupForm"
          id={styles.background}
        >
          <Grid container spacing={1}>
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
                <label htmlFor="freq">Repeat: </label>
                <select
                  className={styles.inputSchedule}
                  id="freq"
                  onChange={this.handleInput('freq')}
                >
                  <option value={undefined}>
                    Select how often this routine will be
                  </option>
                  <option value={RRule.DAILY}>Every Day</option>
                  <option value={RRule.WEEKLY}>Every Week</option>
                  <option value={RRule.MONTHLY}>Every Month</option>
                  <option value={RRule.YEARLY}>Every Year</option>
                </select>
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
                    selected={this.state.event.startDate}
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
                    selected={this.state.event.endDate}
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
export default connect(mapStoreToProps)(withRouter(SetUpStepTest));
