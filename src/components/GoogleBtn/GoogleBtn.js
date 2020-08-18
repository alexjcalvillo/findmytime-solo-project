import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { connect } from 'react-redux';
// import custom styling
import './GoogleBtn.css';
import { Link } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';

const CLIENT_ID =
  '129021208394-bp1f5i16igv01sp39vsj7be64ub2mu03.apps.googleusercontent.com';

class GoogleBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: '',
      tokenId: '',
      profileObj: {},
    };
  }

  login = (response) => {
    console.log(response);
    if (response.accessToken || response.tokenId) {
      this.setState((state) => ({
        isLogined: true,
        accessToken: response.accessToken,
        authToken: response.tokenId,
        profileObj: response.profileObj,
      }));
      this.props.dispatch({
        type: 'SET_USER_DATA',
        payload: {
          accessToken: this.state.accessToken,
          profileObj: this.state.profileObj,
        },
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

  saveGoogleProfile = () => {
    if (this.props.store.user.profile !== '') {
      return;
    } else {
      const data = {
        fname: this.state.profileObj.givenName,
        lname: this.state.profileObj.familyName,
        email: this.state.profileObj.email,
        id: this.props.store.user.id,
        profilePic: this.props.store.google.profileObj.imageUrl,
      };
      this.props.dispatch({
        type: 'REGISTER_PROFILE',
        payload: data,
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.isLogined && this.props.store.googleCalendar.length > 1 ? (
          <h5>
            <Link to="/setup-google">
              <button className="log-in" onClick={this.saveGoogleProfile}>
                Continue to Import
              </button>
            </Link>
            <br />
            Login Success!
            <br />
          </h5>
        ) : (
          <GoogleLogin
            accessType="offline"
            clientId={CLIENT_ID}
            buttonText="Login to Import Your Calendar"
            scope="https://www.googleapis.com/auth/calendar.events.readonly"
            onSuccess={this.login}
            onFailure={this.handleLoginFailure}
            cookiePolicy={'single_host_origin'}
            responseType="code,token"
          />
        )}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(GoogleBtn);
