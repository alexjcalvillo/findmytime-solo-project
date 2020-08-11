import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

// import custom styling
import './GoogleBtn.css';

const CLIENT_ID =
  '129021208394-bp1f5i16igv01sp39vsj7be64ub2mu03.apps.googleusercontent.com';

class GoogleBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: '',
    };

    // this.login = this.login.bind(this);
    // this.handleLoginFailure = this.handleLoginFailure.bind(this);
    // this.logout = this.logout.bind(this);
    // this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  login = (response) => {
    if (response.accessToken) {
      this.setState((state) => ({
        isLogined: true,
        accessToken: response.accessToken,
      }));
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
            clientId={CLIENT_ID}
            buttonText="Login"
            onSuccess={this.login}
            onFailure={this.handleLoginFailure}
            cookiePolicy={'single_host_origin'}
            responseType="code,token"
          />
        )}
        {this.state.accessToken ? (
          <h5>
            Your Access Token: <br />
            <br /> {this.state.accessToken}
          </h5>
        ) : null}
      </div>
    );
  }
}

export default GoogleBtn;
