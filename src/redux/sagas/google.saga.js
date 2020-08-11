import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// fires on login of Google user when setting up account
function* pullGoogleEvents() {
  try {
    const response = yield axios.get(
      'https://www.googleapis.com/calendar/v3/calendars/calendarId/events'
    );
    console.log(response);
  } catch (err) {
    console.log(`Error with GET ${err}`);
  }
}

function* googleSaga() {
  yield takeLatest('GET_GOOGLE_CALENDAR', pullGoogleEvents);
}

export default googleSaga;
