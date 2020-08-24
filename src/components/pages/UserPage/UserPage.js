import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../../LogOutButton/LogOutButton';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import SetupBtn from '../../SetupBtn/SetupBtn';

import styles from './UserPage.module.css';
// import Material UI components
import { Grid, Container, Typography, Box } from '@material-ui/core/';
import LaunchIcon from '@material-ui/icons/Launch';

import RRuleSelector from '../../RRuleSelector/RRuleSelector';
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_USER_PROFILE',
      payload: this.props.store.user.id,
    });
  }

  launchApp = () => {
    this.props.history.push('/main-view');
  };
  render() {
    return (
      <Container
        maxWidth="md"
        spacing={2}
        className={styles.profile}
        justify="center"
      >
        <Grid
          item
          lg={12}
          xs={8}
          style={{ padding: '1.75%', textAlign: 'center' }}
        >
          <Typography variant="h2" component="h1" id="welcome">
            Account
          </Typography>
        </Grid>

        <Grid container spacing={4} className={styles.innerUser}>
          <Grid item lg={6} md={6}></Grid>
          {/* TODO: Conditionally render setup based on if user has events saved (first login) */}
          {this.props.store.user.profile ? (
            <>
              <Grid item lg={12} sm={12} xs={12} className={styles.infoBadge}>
                <Box
                  style={{
                    paddingLeft: '10%',
                    display: 'inline-block',
                  }}
                >
                  <img
                    src={this.props.user.profile.profile_pic_path}
                    alt="visual display of the user as chosen by the user"
                    style={{
                      borderRadius: '50%',
                      display: 'inline-block',
                      verticalAlign: 'middle',
                    }}
                  />
                  <Typography
                    variant="h5"
                    style={{ display: 'inline', paddingLeft: '15px' }}
                  >
                    {this.props.store.user.profile.first_name}{' '}
                    {this.props.store.user.profile.last_name}
                  </Typography>
                </Box>
                {this.props.store.eventsReducer.length > 1 &&
                this.props.store.user.profile ? (
                  <Box
                    style={{
                      display: 'inline',
                      textAlign: 'right',
                      paddingLeft: '30%',
                    }}
                  >
                    <button className="log-in" onClick={this.launchApp}>
                      <LaunchIcon
                        fontSize="small"
                        style={{ verticalAlign: 'middle' }}
                      />{' '}
                      Launch FindMyTime
                    </button>
                  </Box>
                ) : (
                  <Box
                    style={{
                      display: 'inline',
                      textAlign: 'right',
                      paddingLeft: '40%',
                    }}
                  >
                    <SetupBtn className="log-in" />
                  </Box>
                )}
                <hr />
                <Box className={styles.profileInfo}>
                  <Typography variant="h6" component="h5">
                    Personal Info
                  </Typography>
                  <hr />
                  <Typography variant="caption">Email</Typography>
                  <Typography variant="body1">
                    {this.props.store.user.profile.email}
                  </Typography>
                  <Typography variant="caption">First name</Typography>
                  <Typography variant="body1">
                    {this.props.store.user.profile.first_name}
                  </Typography>
                  <Typography variant="caption">Last name</Typography>
                  <Typography variant="body1">
                    {this.props.store.user.profile.last_name}
                  </Typography>
                  <Typography variant="caption">Your ID is:</Typography>
                  <Typography variant="body1">
                    {this.props.store.user.id}
                  </Typography>
                </Box>
              </Grid>
            </>
          ) : (
            <>
              <Typography variant="body1">
                Must be your first time here! Let's help you get situated and
                set up your profile
              </Typography>
              {this.props.store.eventsReducer.length > 1 &&
              this.props.store.user.profile ? (
                <button className="log-in" onClick={this.launchApp}>
                  Launch FindMyTime
                </button>
              ) : (
                <SetupBtn className="log-in" />
              )}
            </>
          )}

          <br />
        </Grid>
      </Container>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
