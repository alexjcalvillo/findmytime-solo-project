import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import wakeup from './wakeup.reducer';
import winddown from './winddown.reducer';
import google from './google.reducer';
import googleCalendar from './googleCalendar.reducer';
import eventsReducer from './events.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  wakeup, // will hold wakeup routine info from Step 1 of form
  winddown, // will hold winddown routine infor from Step 2 of SetUp form
  google, // holds accessToken of user connecting with Google
  googleCalendar, // holds imported calendar events
  eventsReducer, // for now holds initial routines
});

export default rootReducer;
