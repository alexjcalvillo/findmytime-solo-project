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

function* routineSaga() {
  yield takeLatest('SET_ROUTINES', postUserRoutines);
}

export default routineSaga;
