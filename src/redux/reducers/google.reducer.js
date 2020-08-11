const google = (state = '', action) => {
  switch (action.type) {
    case 'SET_USER_TOKEN':
      return action.payload;
    case 'UNSET_USER_TOKEN':
      return '';
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default google;
