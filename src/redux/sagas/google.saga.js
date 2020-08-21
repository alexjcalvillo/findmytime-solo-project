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
        orderBy: 'startTime',
        singleEvents: true,
      }
    );
    console.log(response);
    yield put({
      type: 'SET_GOOGLE_EVENTS',
      payload: response.data.items,
    });
  } catch (err) {
    console.log(`Error with GET ${err}`);
  }
}

function* postGoogleEvent(action) {
  try {
    yield axios.post('/api/calendar/google_calendar/add-event', {
      event: action.payload,
    });
  } catch (err) {
    console.log(`yikes: ${err}`);
  }
}

function* getGoogleEvents(action) {
  try {
    const response = yield axios.get(
      `/api/calendar/google_calendar/${action.payload}`
    );
    console.log(response.data);
    yield put({
      type: 'UNSET_GOOGLE_EVENTS',
    });
    yield put({
      type: 'SET_GOOGLE_EVENTS',
      payload: response.data,
    });
  } catch (err) {
    console.log(`Getting nada here ${err}`);
  }
}

function* googleSaga() {
  yield takeLatest('GET_GOOGLE_CALENDAR', pullGoogleEvents);
  yield takeLatest('ADD_GOOGLE_EVENT', postGoogleEvent);
  yield takeLatest('GET_GOOGLE_EVENTS', getGoogleEvents);
}

export default googleSaga;
