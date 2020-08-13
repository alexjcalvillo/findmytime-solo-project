import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* postUserRoutines(action) {
  try {
    yield axios.post('/api/calendar/self-add-routine', action.payload);
  } catch (err) {
    console.log(err);
  }
}

function* getUserRoutines(action) {
  try {
    const response = yield axios.get(`/api/calendar/events/${action.payload}`);
    console.log(response.data);
    yield put({
      type: 'SET_INITIAL_ROUTINES',
      payload: response.data,
    });
  } catch (err) {
    console.log(`Nope. ${err}`);
  }
}

function* routineSaga() {
  yield takeLatest('SET_ROUTINES', postUserRoutines);
  yield takeLatest('FETCH_EVENTS', getUserRoutines);
}

export default routineSaga;
