import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

import './LandingPage.css';
import logo from '../LandingPage/watchblue.png';
import { Grid, Container, Typography, Box } from '@material-ui/core/';

// CUSTOM COMPONENTS
import RegisterForm from '../../RegisterForm/RegisterForm';

class LandingPage extends Component {
  state = {
    heading: 'Class Component',
  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div className="container">
        <div className="grid">
          <div className="grid-col grid-col_8">
            {/* <img src={logo} className="icon" /> */}
            <center
              style={{
                textAlign: 'left',
                color: 'white',
                borderRadius: '4px',
                border: '2px solid #d96055',
                background: 'linear-gradient(to top, white 50%, #05c7f2 50%)',
                height: '500px',
                padding: '6%',
              }}
            >
              <Typography variant="h3">
                A simple tool to help you do the things you've always wanted to,
                <br />
                but have been too{' '}
                <span style={{ color: '#d96055', textDecoration: 'italicize' }}>
                  "busy"
                </span>{' '}
                to do.
              </Typography>
              <Typography variant="h6">
                A calendar that breaks things down for you. Your time is yours!
              </Typography>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1490724500206-cd5482e02b9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                  className="stock"
                />
              </div>
            </center>
          </div>
          <div className="grid-col grid-col_4">
            <RegisterForm />

            <center>
              <h4>Already a Member?</h4>
              <button className="log-in" onClick={this.onLogin}>
                Login
              </button>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
