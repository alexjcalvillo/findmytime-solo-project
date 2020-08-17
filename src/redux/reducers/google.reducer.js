const google = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return action.payload;
    case 'UNSET_USER_DATA':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default google;
