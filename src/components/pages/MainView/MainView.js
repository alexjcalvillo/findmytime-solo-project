import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import moment from 'moment';
// Material UI imports
import { Grid, Container, Typography, Box } from '@material-ui/core/';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import styles from './MainView.module.css';
// import React Big Calendar for use
import MyFullCalendar from '../../MyFullCalendar/MyFullCalendar';
// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

class MainView extends Component {
  state = {
    myEventsList: [],
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_GOOGLE_EVENTS',
      payload: this.props.store.user.id,
    });
    this.setState({
      googleEvents: this.props.store.googleCalendar,
    });
  }

  newEvent = () => {
    console.log('in new event');
    this.props.history.push('/new-event');
  };

  render() {
    console.log(this.state.myEventsList);
    const todaysDate = moment(Date()).format('MMM Do YY');
    return (
      <Container
        maxWidth="lg"
        fixed
        disableGutters={true}
        style={{ backgroundColor: '#f2f2f2', borderRadius: '4px' }}
      >
        <Box>
          <Grid container spacing={0}>
            <Grid
              item
              lg={4}
              style={{
                padding: '5px',
                borderRight: '1px solid #888',
                borderBottom: '1px solid #888',
                backgroundColor: 'white',
              }}
            >
              <Typography variant="h2" component="h2">
                The Main View
              </Typography>
            </Grid>
            <Grid
              item
              lg={4}
              style={{
                borderBottom: '1px solid #888',
                backgroundColor: 'white',
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                style={{ padding: '2.5%', backgroundColor: 'white' }}
              >
                Calendar
              </Typography>
            </Grid>
            <Grid
              item
              lg={4}
              style={{
                borderBottom: '1px solid #888',
                backgroundColor: 'white',
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                style={{ padding: '2.5%', textAlign: 'right' }}
              >
                Today is {todaysDate}
              </Typography>
            </Grid>
            <Grid
              item
              lg={4}
              style={{ backgroundColor: 'white' }}
              className={styles.sideBar}
            >
              <Box>
                <Grid item lg={12}>
                  <Typography variant="h5">
                    {this.props.store.eventsReducer.length > 3
                      ? 'Busy Day!'
                      : 'Plenty of time to try something new'}
                  </Typography>
                  <Typography variant="overline">Today's Routines:</Typography>
                  <Grid container spacing={2}>
                    {this.props.store.eventsReducer.map((event, index) => {
                      if (event.event_type === 'Routine') {
                        return (
                          <Grid
                            item
                            lg={12}
                            key={index}
                            style={{ marginTop: '10px' }}
                            className={styles.itemToday}
                          >
                            <Typography variant="body2">
                              {event.title}
                            </Typography>
                            <Typography variant="subtitle1">
                              {event.details}
                            </Typography>
                            <button
                              className="log-in"
                              style={{ display: 'inline' }}
                            >
                              Mark Complete!
                            </button>
                          </Grid>
                        );
                      }
                    })}
                  </Grid>
                </Grid>
                <hr />
                <Grid item lg={12}>
                  <Typography variant="overline">Today's Habits:</Typography>
                  {this.props.store.eventsReducer.map((event, index) => {
                    if (event.event_type === 'Habit') {
                      return (
                        <Grid
                          item
                          lg={10}
                          key={index}
                          style={{ marginTop: '10px' }}
                          className={styles.itemToday}
                        >
                          {event.title}
                          {event.details}
                        </Grid>
                      );
                    }
                  })}
                </Grid>
                <hr />
                <Grid item lg={12}>
                  <Typography variant="overline">Today's Tasks:</Typography>
                  {this.props.store.eventsReducer.map((event, index) => {
                    if (event.event_type === 'Task') {
                      return (
                        <Grid
                          item
                          lg={10}
                          key={index}
                          style={{ marginTop: '10px' }}
                          className={styles.itemToday}
                        >
                          {event.title}
                          {event.details}
                        </Grid>
                      );
                    }
                  })}
                  <hr />
                </Grid>
                <Grid item lg={12} className={styles.keyBadge}>
                  <FiberManualRecordIcon
                    style={{
                      display: 'inline-block',
                      verticalAlign: 'middle',
                    }}
                  />{' '}
                  - Habit
                  <br />
                  <FiberManualRecordIcon
                    style={{
                      color: 'blue',
                      display: 'inline-block',
                      verticalAlign: 'middle',
                    }}
                  />{' '}
                  - Routine
                  <br />
                  <FiberManualRecordIcon
                    style={{
                      color: 'green',
                      display: 'inline-block',
                      verticalAlign: 'middle',
                    }}
                  />{' '}
                  - Task
                  <br />
                  <button className="log-in" onClick={this.newEvent}>
                    New Event!
                  </button>
                </Grid>
              </Box>
            </Grid>
            <Grid item lg={8} className={styles.calBar}>
              <Box alignItems="center" justify="center">
                <Grid item lg={12}>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Box className={styles.calBar2}>
                      <MyFullCalendar
                        events={this.props.store.eventsReducer.map(
                          (event, index) => {
                            const end = moment(event.end).format('HH:mm:ss');
                            const start = moment(event.start).format(
                              'HH:mm:ss'
                            );
                            console.log(start, end);
                            const time = moment(event.end).diff(
                              moment(event.start)
                            );
                            console.log(time);
                            const duration = time;
                            console.log(duration);
                            const type = (color) => {
                              switch (color) {
                                case 'Routine':
                                  return 'blue';
                                case 'Task':
                                  return 'green';
                                case 'Habit':
                                  return 'black';
                                default:
                                  return 'green';
                              }
                            };
                            return {
                              title: event.title,
                              startRecur: moment(event.date).format(
                                'YYYY-MM-DD'
                              ),
                              startTime: moment(event.start).format('HH:mm:ss'),
                              endTime: moment(event.end).format('HH:mm:ss'),
                              // daysOfWeek: [1, 2, 3, 4, 5],
                              backgroundColor: type(event.event_type),
                              // rrule: event.recurring,
                              duration,
                            };
                          }
                        )}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(MainView);
