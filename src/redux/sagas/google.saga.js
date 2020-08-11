import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// const API_KEY = 'AIzaSyBlgNuGbplqSIBBSWHlGQaCCKVZU7PyoL0';
// fires on login of Google user when setting up account
function* pullGoogleEvents(action) {
  try {
    const response = yield axios(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${action.payload}`,
        },
        scopes: [
          'https://www.googleapis.com/auth/calendar.readonly',
          'https://www.googleapis.com/auth/calendar.events.readonly',
        ],
      }
    );
    console.log(response);
    // yield put({
    //   type: 'SET_GOOGLE_EVENTS',
    //   payload: response.data,
    // });
  } catch (err) {
    console.log(`Error with GET ${err}`);
  }
}

function* googleSaga() {
  yield takeLatest('GET_GOOGLE_CALENDAR', pullGoogleEvents);
}

export default googleSaga;
