const googleCalendar = (state = [], action) => {
  switch (action.type) {
    case 'SET_GOOGLE_EVENTS':
      return action.payload;
    case 'UNSET_GOOGLE_EVENTS':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default googleCalendar;
