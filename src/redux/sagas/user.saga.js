import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
    yield put({ type: 'FETCH_USER_PROFILE', payload: response.data.id });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* fetchProfile(action) {
  try {
    const response = yield axios.get(`/api/user/profile/${action.payload}`);
    console.log(response.data);
    yield put({
      type: 'SET_USER_PROFILE',
      payload: response.data,
    });
    yield put({
      type: 'FETCH_EVENTS',
      payload: response.data.id,
    });
    yield put({
      type: 'GET_GOOGLE_EVENTS',
      payload: response.data.id,
    });
    yield put({
      type: 'GET_DAYS_BY_EVENTS',
      payload: response.data.id,
    });
  } catch (err) {
    console.log(err);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('FETCH_USER_PROFILE', fetchProfile);
}

export default userSaga;
