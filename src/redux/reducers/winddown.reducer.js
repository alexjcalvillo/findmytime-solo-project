const winddown = (state = { frequency: 'daily' }, action) => {
  switch (action.type) {
    case 'SET_WINDDOWN_START_TIME':
      return {
        ...state,
        startTime: action.payload.startTime,
      };
    case 'SET_WINDDOWN_END_TIME':
      return {
        ...state,
        endTime: action.payload.endTime,
      };
    case 'SET_WINDDOWN_ROUTINE_NOTES':
      return {
        ...state,
        notes: action.payload,
      };
    case 'UNSET_WINDDOWN':
      return {};
    default:
      return state;
  }
};

// winddown routine
// store.winddown
export default winddown;
