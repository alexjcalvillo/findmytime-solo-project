const wakeup = (state = { frequency: 'daily' }, action) => {
  switch (action.type) {
    case 'SET_WAKEUP_START_TIME':
      return {
        ...state,
        startTime: action.payload.startTime,
      };
    case 'SET_WAKEUP_END_TIME':
      return {
        ...state,
        endTime: action.payload.endTime,
      };
    case 'SET_WAKEUP_ROUTINE_NOTES':
      return {
        ...state,
        notes: action.payload,
      };
    case 'UNSET_WAKEUP':
      return {};
    default:
      return state;
  }
};

// wakeup routine
// state.wakeup
export default wakeup;
