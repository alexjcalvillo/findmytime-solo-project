import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGOUT" actions
function* getDays(action) {
  try {
    const response = yield axios.get(`/api/calendar/days/${action.payload}`);
    console.log(response.data);
    yield put({ type: 'SET_EVENT_DAYS', payload: response.data });
  } catch (err) {
    console.log(err);
  }
}

function* daysSaga() {
  yield takeLatest('GET_DAYS_BY_EVENTS', getDays);
}

export default daysSaga;
