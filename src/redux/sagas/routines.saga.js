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
      type: 'SET_EVENTS',
      payload: response.data,
    });
  } catch (err) {
    console.log(`Nope. ${err}`);
  }
}

function* getEventsWithDays(action) {
  try {
    const response = yield axios(`/api/calendar/days/${action.payload}`);
    console.log(response.data);
    // const days = response.data.map((num, index) => {

    //   return num.num;
    // });
    // console.log(days);
    yield put({
      type: 'SET_EVENT_DAYS',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

function* routineSaga() {
  yield takeLatest('SET_ROUTINES', postUserRoutines);
  yield takeLatest('FETCH_EVENTS', getUserRoutines);
  yield takeLatest('GET_EVENT_BY_DAYS', getEventsWithDays);
}

export default routineSaga;
