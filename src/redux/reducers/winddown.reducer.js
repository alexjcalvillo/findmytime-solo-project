const winddown = (state = {}, action) => {
  switch (action.type) {
    case 'SET_WINDDOWN_ROUTINES':
      return action.payload;
    case 'UNSET_WINDDOWN':
      return {};
    default:
      return state;
  }
};

// winddown routine
// store.winddown
export default winddown;
