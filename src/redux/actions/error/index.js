function resetError() {
  return function(dispatch) {
    dispatch({
      type: "ERROR_RESET",
    });
  };
}

function setError(error) {
  return function(dispatch) {
    dispatch({
      type: "ERROR",
      error,
    });
  };
}

export { resetError, setError };
