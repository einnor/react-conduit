export default (state = {}, action) => {
  switch(action.type) {
    case 'SETTINGS_SAVED':
      return {
        ...state,
        inProgess: false,
        errors: action.error ? action.payload.errors : null
      };
    case 'ASYNC_START':
      return {
        ...state,
        inProgress: true
      };
    default:
      return state;
  }
};
