import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import moment from 'moment';

import profPic from '../MainView/profilepic.png';
// Material UI imports
import { Grid, Container, Typography, Box } from '@material-ui/core/';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import AddIcon from '@material-ui/icons/Add';
// component specific styling
import styles from './MainView.module.css';

// import FullCalendar Calendar for use
import MyFullCalendar from '../../MyFullCalendar/MyFullCalendar';
import GoogleBtn from '../../GoogleBtn/GoogleBtn';
// import { RRule, RRuleSet, rrulestr } from 'rrule';
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
    tabs: {
      routineTab: true,
      habitTab: false,
      taskTab: false,
    },
  };

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ time: Date.now() }),
      1000
    );
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

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  newEvent = () => {
    this.props.history.push('/new-event');
  };

  handleTab = (key) => (event) => {
    switch (key) {
      case 'routine':
        this.setState({
          tabs: {
            routineTab: true,
            habitTab: false,
            taskTab: false,
          },
        });
        return;
      case 'habit':
        this.setState({
          tabs: {
            routineTab: false,
            habitTab: true,
            taskTab: false,
          },
        });
        return;
      case 'task':
        this.setState({
          tabs: {
            routineTab: false,
            habitTab: false,
            taskTab: true,
          },
        });
        return;
      default:
        return this.state.tabs;
    }
  };

  render() {
    const events = [
      ...this.props.store.googleCalendar,
      ...this.props.store.eventsReducer,
    ];
    // const todaysDate = moment(Date()).format('MMMM Do, YYYY, h:mm:ss a');
    const todaysDate = moment(this.state.time).format(
      'MMMM Do, YYYY, h:mm:ss a'
    );
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

    const activeTab = {
      background: 'linear-gradient(to top, #05c7f2, #9de3ff)',
    };
    const non = {
      background: 'none',
    };

    const tabs = Object.keys(this.state.tabs);
    const openTab = tabs.filter((tab) => {
      return this.state.tabs[tab];
    });

    const eventsList =
      this.props.store &&
      this.props.store.days &&
      events.map((event, index) => {
        const end = moment(event.end).format('HH:mm:ss');
        const start = moment(event.start).format('HH:mm:ss');
        const time = moment(event.end).diff(moment(event.start));
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
            return day.num - 1;
          });
        let rrule;
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
          rrule = event.recurring;
        }
        const endDate = moment(event.end).format('YYYY-MM-DD');
        const startDate = moment(event.start).format('YYYY-MM-DD');
        let endRecur;
        if (endDate !== startDate) {
          endRecur = endDate;
        }
        return {
          id: event.id,
          title: event.title,
          startRecur: moment(event.date).format('YYYY-MM-DD'),
          endRecur,
          startTime: moment(event.start).format('HH:mm:ss'),
          endTime: moment(event.end).format('HH:mm:ss'),
          daysOfWeek: daysOfWeek,
          backgroundColor: type(event.event_type),
          // rrule,
          duration,
          extendedProps: {
            details: event.details,
          },
        };
      });
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
                lg={6}
                md={6}
                sm={12}
                xs={12}
                style={{
                  padding: '5px',
                  // borderRight: '1px solid #888',
                  // borderBottom: '1px solid #888',
                  backgroundColor: '#f2f2f246',
                  borderTopLeftRadius: '4px',
                  placeItems: 'center',
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
                lg={6}
                md={6}
                sm={12}
                xs={12}
                style={{
                  // borderBottom: '1px solid #888',
                  backgroundColor: '#f2f2f246',
                  borderTopRightRadius: '4px',
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  style={{
                    padding: '2.5%',
                    textAlign: 'right',
                    borderRadius: '4px',
                    textDecoration: 'underline',
                  }}
                >
                  Today is {todaysDate}
                </Typography>
              </Grid>
              <Grid
                item
                lg={4}
                md={12}
                sm={12}
                xs={12}
                style={{
                  backgroundColor: '#f2f2f246',
                  borderBottomLeftRadius: '4px',
                }}
                className={styles.sideBar}
              >
                <Box
                  style={{
                    backgroundColor: 'white',
                    padding: '3%',
                    borderRadius: '4px',
                  }}
                >
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    style={{
                      backgroundColor: '#d96055c2',
                      padding: '3%',
                      borderRadius: '4px',
                    }}
                  >
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
                  </Grid>
                  <hr />
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    style={{
                      backgroundColor: '#d96055c2',
                      padding: '3%',
                      borderRadius: '4px',
                    }}
                  >
                    <Grid
                      container
                      justify="center"
                      spacing={0}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '6px',
                        padding: '2%',
                      }}
                    >
                      <Grid
                        item
                        lg={4}
                        md={4}
                        sm={4}
                        xs={4}
                        onClick={this.handleTab('routine')}
                        style={this.state.tabs.routineTab ? activeTab : non}
                      >
                        <Box className={styles.displayEvents}>
                          <Typography variant="overline">Routines</Typography>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        lg={4}
                        md={4}
                        sm={4}
                        xs={4}
                        onClick={this.handleTab('habit')}
                        style={this.state.tabs.habitTab ? activeTab : non}
                      >
                        <Box className={styles.displayEvents}>
                          <Typography variant="overline">Habits</Typography>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        lg={4}
                        md={4}
                        sm={4}
                        xs={4}
                        onClick={this.handleTab('task')}
                        style={this.state.tabs.taskTab ? activeTab : non}
                      >
                        <Box className={styles.displayEvents}>
                          <Typography variant="overline">Tasks</Typography>
                        </Box>
                      </Grid>
                      {/* TODO: conditionally render based on tab selected {this.state.tabs}
                        openTab
                      */}
                      {openTab[0] === 'routineTab' &&
                        eventsList.map((event, index) => {
                          if (event.backgroundColor === 'blue') {
                            return (
                              <Grid
                                item
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                                key={index}
                                // className={styles.itemToday}
                                style={{
                                  borderBottom:
                                    '0.004rem solid rgba(136, 136, 136, 0.693)',
                                  margin: '5px 0',
                                  padding: '5px 0',
                                }}
                              >
                                <Grid item lg={4}>
                                  <Typography
                                    variant="body2"
                                    style={{ display: 'inline-block' }}
                                  >
                                    {event.title}
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  lg={5}
                                  style={{
                                    display: 'inline-block',
                                    textAlign: 'right',
                                  }}
                                >
                                  <Typography variant="caption">
                                    Every day
                                  </Typography>
                                </Grid>
                              </Grid>
                            );
                          }
                        })}
                      {openTab[0] === 'habitTab' &&
                        eventsList.map((event, index) => {
                          const checkstart = moment(event.start).format(
                            'MMM Do, YYYY'
                          );
                          if (event.backgroundColor === 'black') {
                            return (
                              <Grid
                                item
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                                key={index}
                                className={styles.itemToday}
                                style={{
                                  borderBottom:
                                    '0.004rem solid rgba(136, 136, 136, 0.693)',
                                  margin: '5px 0',
                                  padding: '5px 0',
                                }}
                              >
                                <Typography variant="body2">
                                  {event.title}
                                </Typography>
                              </Grid>
                            );
                          }
                        })}
                      {openTab[0] === 'taskTab' &&
                        eventsList.map((event, index) => {
                          const checkstart = moment(event.start).format(
                            'MMM Do, YYYY'
                          );
                          // const today = moment(todaysDate).format('YYYY-MM-DD');
                          console.log(checkstart, todaysDate);
                          if (event.backgroundColor === 'green') {
                            return (
                              <Grid
                                item
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                                key={index}
                                className={styles.itemToday}
                                style={{
                                  borderBottom:
                                    '0.004rem solid rgba(136, 136, 136, 0.693)',
                                  margin: '5px 0',
                                  padding: '5px 0',
                                }}
                              >
                                <Typography variant="body2">
                                  {event.title}
                                </Typography>
                              </Grid>
                            );
                          }
                        })}
                      <Grid item lg={4} style={{ marginTop: '2%' }}>
                        <button
                          className={styles.addBtn}
                          onClick={this.newEvent}
                        >
                          <Grid item lg={12}>
                            <AddIcon
                              fontSize="small"
                              style={{
                                verticalAlign: 'middle',
                                display: 'inline-block',
                              }}
                            />
                            <Typography
                              variant="caption"
                              style={{ verticalAlign: 'middle' }}
                            >
                              Add an Event
                            </Typography>
                          </Grid>
                        </button>
                      </Grid>
                      <Grid item lg={8}>
                        <GoogleBtn style={{ display: 'inline-block' }} />
                      </Grid>
                    </Grid>
                  </Grid>
                  <hr />
                  {/* <Grid
                    item
                    lg={12}
                    style={{
                      backgroundColor: '#d96055c2',
                      padding: '4%',
                      borderRadius: '4px',
                    }}
                  >
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
                      <Typography
                        variant="overline"
                        style={{
                          borderBottom:
                            '0.004rem solid rgba(136, 136, 136, 0.693)',
                        }}
                      >
                        | Today's Habits |
                      </Typography>

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
                      <Typography
                        variant="overline"
                        style={{
                          borderBottom:
                            '0.004rem solid rgba(136, 136, 136, 0.693)',
                        }}
                      >
                        Today's Tasks
                      </Typography>
                      {events.map((event, index) => {
                        const checkstart = moment(event.start).format(
                          'YYYY-MM-DD'
                        );
                        const today = moment(todaysDate).format('YYYY-MM-DD');
                        if (
                          event.event_type === 'Task' &&
                          checkstart === today
                        ) {
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
                  </Grid>
                  <hr /> */}
                  <Grid
                    container
                    justify="center"
                    spacing={0}
                    style={{
                      backgroundColor: '#d96055c2',
                      padding: '3%',
                      borderRadius: '4px',
                    }}
                  >
                    <Grid
                      container
                      justify="center"
                      spacing={0}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '6px',
                        padding: '2%',
                      }}
                    >
                      <Grid item lg={12}>
                        <Typography variant="overline">Key</Typography>
                      </Grid>
                      <Grid item lg={10} className={styles.keyBadge}>
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
                    </Grid>
                  </Grid>
                  <hr />
                  <Grid
                    container
                    justify="center"
                    spacing={0}
                    style={{
                      backgroundColor: '#d96055c2',
                      padding: '3%',
                      borderRadius: '4px',
                    }}
                  >
                    <Grid
                      container
                      justify="center"
                      spacing={0}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '6px',
                        padding: '2%',
                      }}
                    >
                      <Grid item lg={12}>
                        <Grid
                          item
                          lg={12}
                          style={{
                            margin: '5px 0',
                            padding: '5px 0',
                            borderBottom:
                              '0.004rem solid rgba(136, 136, 136, 0.693)',
                          }}
                        >
                          <Typography variant="overline">Resources:</Typography>
                          <br />
                          <a
                            href="https://slowgrowth.com/"
                            className={styles.links}
                          >
                            {' '}
                            Slow Growth Academy by Matt D'Avella
                          </a>
                        </Grid>
                        <Grid
                          item
                          lg={12}
                          style={{
                            margin: '5px 0',
                            padding: '5px 0',
                            borderBottom:
                              '0.004rem solid rgba(136, 136, 136, 0.693)',
                          }}
                        >
                          <a
                            href="https://jamesclear.com/"
                            className={styles.links}
                          >
                            {' '}
                            Atomic Habits & more - James Clear
                          </a>
                        </Grid>
                        <Grid
                          item
                          lg={12}
                          style={{
                            margin: '5px 0',
                            padding: '5px 0',
                            borderBottom:
                              '0.004rem solid rgba(136, 136, 136, 0.693)',
                          }}
                        >
                          <a href="https://tim.blog/" className={styles.links}>
                            {' '}
                            Tim Ferris
                          </a>
                        </Grid>
                      </Grid>
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
                              events={eventsList}
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
