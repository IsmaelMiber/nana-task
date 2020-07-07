import errorReducer from "./error";
import { combineReducers } from "redux";

export default combineReducers({
  error: errorReducer,
});
