const wakeup = (state = {}, action) => {
  switch (action.type) {
    case 'SET_WAKEUP_ROUTINES':
      return action.payload;
    case 'UNSET_WAKEUP':
      return {};
    default:
      return state;
  }
};

// wakeup routine
// state.wakeup
export default wakeup;
