import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { connect } from 'react-redux';
// import custom styling
import './GoogleBtn.css';
import { Link } from 'react-router-dom';

const CLIENT_ID =
  '129021208394-bp1f5i16igv01sp39vsj7be64ub2mu03.apps.googleusercontent.com';

class GoogleBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: '',
      tokenId: '',
    };

    // this.login = this.login.bind(this);
    // this.handleLoginFailure = this.handleLoginFailure.bind(this);
    // this.logout = this.logout.bind(this);
    // this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  login = (response) => {
    console.log(response);
    if (response.accessToken || response.tokenId) {
      this.setState((state) => ({
        isLogined: true,
        accessToken: response.accessToken,
        authToken: response.tokenId,
      }));
      this.props.dispatch({
        type: 'SET_USER_TOKEN',
        payload: this.state.accessToken,
      });
      this.props.dispatch({
        type: 'GET_GOOGLE_CALENDAR',
        payload: this.state.accessToken,
      });
    }
  };

  logout = (response) => {
    this.setState((state) => ({
      isLogined: false,
      accessToken: '',
    }));
  };

  handleLoginFailure = (response) => {
    alert('Failed to log in');
  };

  handleLogoutFailure = (response) => {
    alert('Failed to log out');
  };

  handleImport = (event) => {
    this.props.history.push('/setup-google');
  };

  render() {
    return (
      <div className="centered-self">
        {this.state.isLogined ? (
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.logout}
            onFailure={this.handleLogoutFailure}
          ></GoogleLogout>
        ) : (
          <GoogleLogin
            accessType="offline"
            clientId={CLIENT_ID}
            buttonText="Login"
            scope="https://www.googleapis.com/auth/calendar.events.readonly"
            onSuccess={this.login}
            onFailure={this.handleLoginFailure}
            cookiePolicy={'single_host_origin'}
            responseType="code,token"
          />
        )}
        {this.state.accessToken ? (
          <h5>
            Login Success! <br />
            <br />
            <Link to="/setup-google">
              <button>Continue to Import</button>
            </Link>
          </h5>
        ) : null}
      </div>
    );
  }
}

export default connect()(GoogleBtn);
