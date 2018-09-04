import {
  SUBMIT_SOLUTION,
  GET_PROMPT,
  CLEAR_PROMPT,
  CHANGE_ROOM,
  SET_COMPLETE,
  USER_SUBMITION,
  SOLUTION_CHANGE,
  TIMER_CHANGE,
  RESET_TIMER,
  RESET_RESULTS
} from "./types";
import axios from "../../node_modules/axios";

export const addSolution = function(inputType, input, e) {
  if (e) {
    e.preventDefault();
  }
  return {
    type: SOLUTION_CHANGE,
    payload: {
      inputType,
      input
    }
  };
};

export const submit = solution => {
  return dispatch => {
    axios.post("/challenge", solution).then(res => {
      dispatch({
        type: SUBMIT_SOLUTION,
        payload: res.data
      });
    });
    dispatch({
      type: RESET_RESULTS
    })
  };
};

export const userSubmition = solution => {
  return dispatch => {
    axios.post("/userChallenge", solution).then(res => {
      dispatch({
        type: USER_SUBMITION,
        payload: res.data
      });
    });
  };
};

export const getPrompt = problem => {
  return {
    type: GET_PROMPT,
    payload: problem
  };
};

export const clearPrompt = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_PROMPT
    });
  };
};

export const changeRoom = room => {
  return dispatch => {
    dispatch({
      type: CHANGE_ROOM,
      payload: room
    });
  };
};

export const setComplete = () => {
  return dispatch => {
    dispatch({
      type: SET_COMPLETE,
      payload: true
    });
  };
};

export const onTimerChange = count => {
  return dispatch => {
    dispatch({
      type: TIMER_CHANGE,
      payload: count
    });
  };
};

export const resetTimer = () => {
  return dispatch => {
    dispatch({
      type: RESET_TIMER
    });
  };
};