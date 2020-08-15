const recurring = (state = '', action) => {
  switch (action.type) {
    case 'SET_RECURRING_RULE':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default recurring;
