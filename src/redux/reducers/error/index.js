function errorReducer(state = "1", action) {
  switch (action.type) {
    case "ERROR_RESET":
      return "";
    case "ERROR":
      return action.error;
    default:
      return state;
  }
}

export default errorReducer;
