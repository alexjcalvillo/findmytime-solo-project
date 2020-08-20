import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

// navigation purposes
import { Link } from 'react-router-dom';

// import Material UI components
import { Grid, Container, Typography } from '@material-ui/core/';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Google Import option starts here
import GoogleBtn from '../../GoogleBtn/GoogleBtn';

import './SetUp.css';
import google from '../../../redux/reducers/google.reducer';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class SetUp extends Component {
  state = {
    fname: '',
    lname: '',
    email: '',
    setupNeeded: false,
    setOpen: false,
  };

  componentDidMount() {
    if (this.props.store.user.profile) {
      this.setState({
        setupNeeded: true,
        setOpen: true,
      });
    }
  }

  handleInput = (input) => (event) => {
    this.setState({
      [input]: event.target.value,
    });
  };

  saveProfile = () => {
    console.log('Saving');
    if (this.state.fname === '' || undefined) {
      alert('Please complete the profile information');
      return;
    } else if (this.state.lname === '' || undefined) {
      alert('Please complete the profile information');
      return;
    } else if (this.state.email === '' || undefined) {
      alert('Please complete the profile information');
      return;
    }
    const data = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      id: this.props.store.user.id,
    };
    this.props.dispatch({
      type: 'REGISTER_PROFILE',
      payload: data,
    });
    this.props.history.push('setup-1');
  };

  startGuided = () => {
    this.props.history.push('setup-1');
  };

  handleClickOpen = () => {
    this.setState({
      setOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      setOpen: false,
    });
  };

  render() {
    return (
      <Container maxWidth="md" className="setupForm">
        <Typography
          variant="h2"
          component="h1"
          style={{ textDecoration: 'underline', marginBottom: '3.5%' }}
        >
          Let's get started...
        </Typography>
        <Grid container spacing={2}>
          <Grid
            item
            lg={6}
            className="innerForm"
            style={{ borderBottom: '1px solid #888' }}
          >
            {this.props.store.user.profile ? (
              <Dialog
                open={this.state.setOpen}
                onClose={this.handleClose}
                disableBackdropClick={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{ border: '1px solid #d96055' }}
              >
                <DialogTitle id="alert-dialog-title">
                  {
                    'Your profile has been created. How would you like to start scheduling?'
                  }
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    We can guide you through some basic initial routines so you
                    can learn how we schedule events.
                  </DialogContentText>
                  <br />
                  <DialogActions>
                    <button className="log-in" onClick={this.startGuided}>
                      Begin Guided Setup
                    </button>
                  </DialogActions>
                  <hr />
                  <DialogContentText id="alert-dialog-description">
                    Or let Google work to import your data from your calendar.
                    Don't worry, if you still want to schedule some basic
                    routines, we'll walk you through it afterwards!
                  </DialogContentText>

                  <DialogActions>
                    <Typography variant="overline">
                      Or let Google do the work:
                    </Typography>
                    <br />
                    <GoogleBtn />
                  </DialogActions>
                </DialogContent>
              </Dialog>
            ) : (
              // <Typography variant="overline">
              //   Your Profile is all set! Start with either our guided setup or
              //   import your Google Events!
              // </Typography>
              <Typography variant="overline">Account Setup</Typography>
            )}
            <br />
            <label htmlFor="fname">
              <Typography variant="body2">First Name</Typography>{' '}
            </label>
            <input
              id="fname"
              type="text"
              className="inputItems"
              disabled={this.state.setupNeeded}
              onChange={this.handleInput('fname')}
            />
            <br />
            <label htmlFor="lname">
              <Typography variant="body2">Last Name</Typography>{' '}
            </label>
            <input
              id="lname"
              type="text"
              className="inputItems"
              disabled={this.state.setupNeeded}
              onChange={this.handleInput('lname')}
            />
            <br />
            <label htmlFor="email">
              <Typography variant="body2">Email</Typography>{' '}
            </label>
            <input
              id="email"
              type="text"
              className="inputItems"
              disabled={this.state.setupNeeded}
              onChange={this.handleInput('email')}
            />
            {/* TO-DO add profile picture input */}
          </Grid>
          <Grid item lg={6} style={{ borderBottom: '1px solid #888' }}>
            {this.props.store.google.profileObj ? (
              <div style={{ display: 'inline' }}>
                <Typography variant="overline">First Name: </Typography>
                <Typography variant="body2">
                  {this.props.store.google.profileObj.givenName}
                </Typography>
                <br />
                <Typography variant="overline">Last Name: </Typography>
                <Typography variant="body2">
                  {this.props.store.google.profileObj.familyName}
                </Typography>
                <br />
                <Typography variant="overline">Email Address: </Typography>
                <Typography variant="body2">
                  {this.props.store.google.profileObj.email}
                </Typography>
                <br />
                <Typography variant="overline">Profile Image: </Typography>
                <img
                  src={this.props.store.google.profileObj.imageUrl}
                  alt="profile photo from google"
                  className="profilePic"
                />
              </div>
            ) : (
              <></>
            )}
          </Grid>
          <Grid item lg={6} style={{ borderRight: '1px solid #888' }}>
            <Typography variant="overline">Let's get your schedule:</Typography>
            <br />
            {this.props.store.user.profile ? (
              <button className="log-in" onClick={this.startGuided}>
                Begin Guided Setup
              </button>
            ) : (
              <button className="log-in" onClick={this.saveProfile}>
                Begin Guided Setup
              </button>
            )}
          </Grid>
          <Grid item lg={6}>
            <Typography variant="overline">
              Or let Google do the work:
            </Typography>
            <br />
            <GoogleBtn />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(SetUp);
