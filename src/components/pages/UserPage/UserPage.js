import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../../LogOutButton/LogOutButton';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import SetupBtn from '../../SetupBtn/SetupBtn';

import styles from './UserPage.module.css';
import { Grid, Container, Typography } from '@material-ui/core/';

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
      <Container maxWidth="lg" spacing={2} className="setupForm">
        <Grid item lg={12}>
          <Typography variant="h4" component="h4" id="welcome">
            Welcome, {this.props.store.user.username}!
          </Typography>
        </Grid>

        <Grid item lg={8} className={styles.innerUser}>
          <Typography variant="body1">
            Your ID is: {this.props.store.user.id}
          </Typography>
          {/* TODO: Conditionally render setup based on if user has events saved (first login) */}
          {this.props.store.user.profile ? (
            <Grid item>
              <Typography variant="h3" component="h3">
                Your information:
              </Typography>
              <Typography variant="body1">
                Name: {this.props.store.user.profile.first_name}{' '}
                {this.props.store.user.profile.last_name}
              </Typography>
              <Typography variant="body1">
                Email:
                {this.props.store.user.profile.email}
              </Typography>
            </Grid>
          ) : (
            <Typography variant="body1">
              Must be your first time here! Let's help you get situated and set
              up your profile
            </Typography>
          )}
          {this.props.store.eventsReducer.length > 1 &&
          this.props.store.user.profile ? (
            <button className="log-in" onClick={this.launchApp}>
              Launch FindMyTime
            </button>
          ) : (
            <SetupBtn className="log-in" />
          )}
          <br />
        </Grid>
      </Container>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
