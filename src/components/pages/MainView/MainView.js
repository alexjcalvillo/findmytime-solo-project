import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import moment from 'moment';

import profPic from '../MainView/profilepic.png';
// Material UI imports
import { Grid, Container, Typography, Box } from '@material-ui/core/';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

// component specific styling
import styles from './MainView.module.css';

// import FullCalendar Calendar for use
import MyFullCalendar from '../../MyFullCalendar/MyFullCalendar';
import GoogleBtn from '../../GoogleBtn/GoogleBtn';
import { RRule, RRuleSet, rrulestr } from 'rrule';
// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

class MainView extends Component {
  state = {
    myEventsList: [
      ...this.props.store.googleCalendar,
      ...this.props.store.eventsReducer,
    ],
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
    // this.props.dispatch({
    //   type: 'GET_GOOGLE_EVENTS',
    //   payload: this.props.store.user.profile.id,
    // });
    this.setState({
      myEventsList: [
        ...this.props.store.googleCalendar,
        ...this.props.store.eventsReducer,
      ],
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
    const events = [
      ...this.props.store.googleCalendar,
      ...this.props.store.eventsReducer,
    ];
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
          className={styles.appHome}
        >
          <Box>
            <Grid container spacing={0}>
              <Grid
                item
                lg={4}
                md={5}
                sm={12}
                style={{
                  padding: '5px',
                  // borderRight: '1px solid #888',
                  // borderBottom: '1px solid #888',
                  backgroundColor: '#f2f2f29f',
                  borderTopLeftRadius: '4px',
                }}
              >
                <Typography variant="h2" component="h2">
                  The Main View
                </Typography>
              </Grid>
              <Grid
                item
                lg={4}
                md={4}
                sm={12}
                style={{
                  // borderBottom: '1px solid #888',
                  backgroundColor: '#f2f2f29f',
                }}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  style={{ padding: '2.5%' }}
                >
                  Calendar
                </Typography>
              </Grid>
              <Grid
                item
                lg={4}
                md={4}
                sm={12}
                style={{
                  // borderBottom: '1px solid #888',
                  backgroundColor: '#f2f2f29f',
                  borderTopRightRadius: '4px',
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
                md={12}
                sm={12}
                style={{
                  backgroundColor: '#f2f2f29f',
                  borderBottomLeftRadius: '4px',
                }}
                className={styles.sideBar}
              >
                <Box>
                  <Grid
                    item
                    lg={12}
                    style={{
                      backgroundColor: 'white',
                      paddingTop: '4%',
                      borderRadius: '4px',
                    }}
                  >
                    <Grid container justify="center">
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
                  <Grid
                    item
                    lg={12}
                    style={{
                      backgroundColor: '#d96055c2',
                      padding: '4%',
                      borderRadius: '4px',
                    }}
                  >
                    <Typography variant="h5">
                      {this.state.myEventsList.length > 3
                        ? 'Busy Day!'
                        : 'Plenty of time to try something new'}
                    </Typography>
                    <Typography variant="overline">
                      Today's Routines:
                    </Typography>
                    <Grid
                      container
                      justify="center"
                      spacing={2}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '6px',
                        padding: '2%',
                      }}
                    >
                      {events.map((event, index) => {
                        console.log(event);
                        if (event.event_type === 'Routine') {
                          return (
                            <Grid
                              item
                              lg={10}
                              key={index}
                              className={styles.itemToday}
                              style={{ marginTop: '2%' }}
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
                  <Grid
                    item
                    lg={12}
                    style={{
                      backgroundColor: '#d96055c2',
                      padding: '4%',
                      borderRadius: '4px',
                    }}
                  >
                    <Typography variant="overline">Today's Habits:</Typography>
                    {events.map((event, index) => {
                      if (event.event_type === 'Habit') {
                        return (
                          <Grid
                            item
                            lg={12}
                            key={index}
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

                  <Grid
                    item
                    lg={12}
                    style={{
                      backgroundColor: '#d96055c2',
                      padding: '4%',
                      borderRadius: '4px',
                    }}
                  >
                    <Typography variant="overline">Today's Tasks:</Typography>
                    {events.map((event, index) => {
                      const checkstart = moment(event.start).format(
                        'YYYY-MM-DD'
                      );
                      const today = moment(todaysDate).format('YYYY-MM-DD');
                      if (event.event_type === 'Task' && checkstart === today) {
                        return (
                          <Grid
                            item
                            lg={10}
                            key={index}
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
                  <Grid
                    container
                    justify="center"
                    spacing={0}
                    style={{
                      backgroundColor: '#d96055c2',
                      padding: '4%',
                      borderRadius: '4px',
                    }}
                  >
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
                      <br />
                      <GoogleBtn />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid
                item
                lg={8}
                className={styles.calBar}
                style={{ borderBottomRightRadius: '4px' }}
              >
                <Box justify="center">
                  <Grid item lg={12}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Box className={styles.calBar2}>
                        {this.props.store &&
                          this.props.store.days &&
                          this.props.store.eventsReducer &&
                          this.props.store.googleCalendar && (
                            <MyFullCalendar
                              hover={this.handleMouseOver}
                              events={events.map((event, index) => {
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
                                let rrule;
                                console.log(daysOfWeek, event.id);
                                if (daysOfWeek.length < 1) {
                                  daysOfWeek = undefined;
                                }
                                if (event.recurring === 'every day') {
                                  daysOfWeek = [0, 1, 2, 3, 4, 5, 6, 7];
                                }
                                if (
                                  daysOfWeek === undefined &&
                                  event.recurring !== 'every day' &&
                                  event.recurring !== null
                                ) {
                                  console.log(event.recurring);
                                  rrule = event.recurring;
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
                                  // rrule,
                                  duration,
                                  extendedProps: {
                                    details: event.details,
                                  },
                                };
                              })}
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
