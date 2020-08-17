import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../pages/AboutPage/AboutPage';
import UserPage from '../pages/UserPage/UserPage';
import InfoPage from '../pages/InfoPage/InfoPage';
import LandingPage from '../pages/LandingPage/LandingPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import SetUp from '../pages/SetUp/SetUp';
import SetUpStep1 from '../pages/SetupSteps/SetUpStep1/SetUpStep1';
import SetUpStep2 from '../pages/SetupSteps/SetUpStep2/SetUpStep2';

import './App.css';
import SetUpConfirm from '../pages/SetupSteps/SetUpConfirm/SetUpConfirm';
import SetUpGoogle from '../pages/SetupSteps/SetUpGoogle/SetUpGoogle';
import GoogleConfirm from '../pages/SetupSteps/GoogleConfirm/GoogleConfirm';
import MainView from '../pages/MainView/MainView';
import SetUpStepTest from '../pages/SetupSteps/SetUpStepTest/SetUpStepTest';
import ProfileBuild from '../pages/ProfileBuild/ProfileBuild';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route exact path="/about" component={AboutPage} />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute exact path="/admin" component={UserPage} />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute exact path="/info" component={InfoPage} />
            <ProtectedRoute
              exact
              path="/setup-profile"
              component={ProfileBuild}
            />
            <ProtectedRoute exact path="/setup" component={SetUp} />
            <ProtectedRoute exact path="/setup-1" component={SetUpStep1} />
            <ProtectedRoute exact path="/setup-2" component={SetUpStep2} />
            <ProtectedRoute
              exact
              path="/setup-confirm"
              component={SetUpConfirm}
            />
            <ProtectedRoute
              exact
              path="/setup-google"
              component={SetUpGoogle}
            />
            <ProtectedRoute
              exact
              path="/google-confirm"
              component={GoogleConfirm}
            />
            <ProtectedRoute exact path="/main-view" component={MainView} />
            <ProtectedRoute exact path="/testing" component={SetUpStepTest} />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will be redirected to the authRedirect path provided. */}
            <ProtectedRoute
              exact
              path="/login"
              authRedirect="/admin"
              component={LoginPage}
            />
            <ProtectedRoute
              exact
              path="/registration"
              authRedirect="/admin"
              component={RegisterPage}
            />
            <ProtectedRoute
              exact
              path="/home"
              authRedirect="/admin"
              component={LandingPage}
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
