import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import input from "./textInputReducer";
import auth from "./authReducer";
import prompt from "./promptReducer";
import score from "./scoreReducer";
import online from "./onlineReducer";
import duel from "./duelReducer"

export default combineReducers({
  modalReducer,
  input,
  auth,
  prompt,
  score,
  online,
  duel
});
