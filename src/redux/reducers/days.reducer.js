const days = (state = [], action) => {
  switch (action.type) {
    case 'SET_EVENT_DAYS':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default days;
