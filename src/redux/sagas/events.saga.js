import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGOUT" actions
function* postEvent(action) {
  try {
    yield axios.post('/api/calendar/new-event', action.payload);
    const response = yield axios.get(
      `/api/calendar/events/${action.payload.profile_id}`
    );
    console.log(response.data);
    yield axios.post('/api/calendar/create-freq', {
      days: action.payload.daysOfWeek,
      id: response.data[0].id,
    });
  } catch (err) {
    console.log(err);
  }
}

function* eventsSaga() {
  yield takeLatest('POST_EVENT', postEvent);
}

export default eventsSaga;
