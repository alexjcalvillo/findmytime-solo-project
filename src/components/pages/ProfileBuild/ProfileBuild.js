import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../../LogOutButton/LogOutButton';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import SetupBtn from '../../SetupBtn/SetupBtn';

// import styles from './UserPage.module.css';
import { Grid, Container, Typography } from '@material-ui/core/';

import RRuleSelector from '../../RRuleSelector/RRuleSelector';
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class ProfileBuild extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_USER_PROFILE',
      payload: this.props.store.user.id,
    });
    this.props.dispatch({
      type: 'FETCH_EVENTS',
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
          <Typography variant="h2" component="h1">
            Let's get started
          </Typography>
          <Grid item>
            <SetupBtn className="log-in" />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(ProfileBuild);
