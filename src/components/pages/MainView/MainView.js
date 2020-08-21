import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import moment from 'moment';

import profPic from '../MainView/profilepic.png';
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
    onOpen: true,
  };

  componentDidMount() {
    this.setState({
      onOpen: false,
    });
    this.props.dispatch({
      type: 'POST_JUNCTION',
      payload: this.props.store.days,
    });
    // this.props.dispatch({
    //   type: 'GET_DAYS_BY_EVENTS',
    //   payload: this.props.store.user.profile_id,
    // });
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

  handleMouseOver = (task) => {
    console.log(task);
    console.log(task.event.extendedProps.details);
    return (
      <div style="background-color: white; color: black;">
        {task.event.extendedProps.details}
      </div>
    );
  };

  render() {
    const todaysDate = moment(Date()).format('MMM Do, YYYY');
    const movement = {
      position: 'relative',
      top: '80px',
      opacity: '0',
    };
    const stop = {
      position: 'relative',
      top: '0px',
      opacity: '1',
      transitionProperty: 'top opacity',
      transitionDuration: '0.8s',
      transitionDelay: '0.03s',
    };

    return (
      <div style={this.state.onOpen ? movement : stop}>
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
                    <Grid container alignItems="center" justify="center">
                      <img
                        src={
                          this.props.store.user &&
                          this.props.store.user.profile &&
                          this.props.store.user.profile.profile_pic_path
                        }
                        style={{ borderRadius: '50%' }}
                      />
                    </Grid>
                    <Grid container justify="center">
                      <Typography variant="h5">
                        {this.props.user &&
                          this.props.user.profile &&
                          this.props.user.profile.first_name}{' '}
                        {this.props.user &&
                          this.props.user.profile &&
                          this.props.user.profile.last_name}
                      </Typography>
                    </Grid>
                  </Grid>
                  <hr />
                  <Grid item lg={12}>
                    <Typography variant="h5">
                      {this.props.store.eventsReducer.length > 3
                        ? 'Busy Day!'
                        : 'Plenty of time to try something new'}
                    </Typography>
                    <Typography variant="overline">
                      Today's Routines:
                    </Typography>
                    <Grid container spacing={2}>
                      {this.props.store.eventsReducer.map((event, index) => {
                        if (event.event_type === 'Routine') {
                          return (
                            <Grid
                              item
                              lg={12}
                              key={index}
                              style={{
                                margin: '2.5px 5px',
                                boxShadow: '1px 0px 3px 0px',
                                background:
                                  'linear-gradient(to top, #05aff2, #9de3ff)',
                              }}
                            >
                              <Typography variant="body2">
                                {event.title}
                              </Typography>
                            </Grid>
                          );
                        }
                      })}
                    </Grid>
                  </Grid>
                  <hr />
                  <Typography variant="overline">Today's Habits:</Typography>
                  <Grid container spacing={2}>
                    {this.props.store.eventsReducer.map((event, index) => {
                      if (event.event_type === 'Habit') {
                        return (
                          <Grid
                            item
                            lg={12}
                            key={index}
                            style={{
                              margin: '2.5px 5px',
                              boxShadow: '1px 0px 3px 0px',
                              background:
                                'linear-gradient(to top, #05aff2, #9de3ff)',
                            }}
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
                    <Grid container spacing={2}>
                      {this.props.store.eventsReducer.map((event, index) => {
                        if (event.event_type === 'Task') {
                          return (
                            <Grid
                              item
                              lg={12}
                              key={index}
                              style={{
                                margin: '2.5px 5px',
                                boxShadow: '1px 0px 3px 0px',
                                background:
                                  'linear-gradient(to top, #05aff2, #9de3ff)',
                              }}
                            >
                              {event.title}
                              {event.details}
                            </Grid>
                          );
                        }
                      })}
                    </Grid>
                    <hr />
                  </Grid>
                  <Grid container justify="center" spacing={0}>
                    <Grid item lg={8} className={styles.keyBadge}>
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
                    </Grid>
                    <Grid item lg={12} style={{ marginTop: '25px' }}>
                      <button className="log-in" onClick={this.newEvent}>
                        New Event!
                      </button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item lg={8} className={styles.calBar}>
                <Box alignItems="center" justify="center">
                  <Grid item lg={12}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Box className={styles.calBar2}>
                        {this.props.store && this.props.store.days && (
                          <MyFullCalendar
                            hover={this.handleMouseOver}
                            events={this.props.store.eventsReducer.map(
                              (event, index) => {
                                const end = moment(event.end).format(
                                  'HH:mm:ss'
                                );
                                const start = moment(event.start).format(
                                  'HH:mm:ss'
                                );
                                const time = moment(event.end).diff(
                                  moment(event.start)
                                );
                                const duration = time;
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
                                {
                                  /* TODO: fix daysOfWeek variable filter */
                                }
                                let daysOfWeek = this.props.store.days
                                  .filter((day) => {
                                    if (day.id === event.id) {
                                      return day.num;
                                    }
                                  })
                                  .map((day) => {
                                    console.log(day.num);
                                    return day.num - 1;
                                  });
                                console.log(daysOfWeek, event.id);
                                if (daysOfWeek.length < 1) {
                                  daysOfWeek = undefined;
                                }
                                const endDate = moment(event.end).format(
                                  'YYYY-MM-DD'
                                );
                                const startDate = moment(event.start).format(
                                  'YYYY-MM-DD'
                                );
                                console.log(endDate, startDate);
                                let endRecur;
                                if (endDate !== startDate) {
                                  endRecur = endDate;
                                }
                                console.log(endRecur);
                                return {
                                  id: event.id,
                                  title: event.title,
                                  startRecur: moment(event.date).format(
                                    'YYYY-MM-DD'
                                  ),
                                  endRecur,
                                  startTime: moment(event.start).format(
                                    'HH:mm:ss'
                                  ),
                                  endTime: moment(event.end).format('HH:mm:ss'),
                                  daysOfWeek: daysOfWeek,
                                  backgroundColor: type(event.event_type),
                                  // rrule: event.recurring,
                                  duration,
                                  extendedProps: {
                                    details: event.details,
                                  },
                                };
                              }
                            )}
                          />
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MainView);
