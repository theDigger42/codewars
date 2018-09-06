import {
  SUBMIT_SOLUTION_DUEL,
  GET_PROMPT_DUEL,
  RESET_RESULTS_DUEL,
  PLAYER_JOINED_DUEL,
  DUEL_SOLUTION_CHANGE,
  PLAYER_TYPING,
  OPPONENT_RESULTS,
  SET_CONSOLE_RESULTS,
  RESET_CONSOLE_RESULTS,
  CLEAR_OPPONENT_CONSOLE
} from "./types";
import axios from "../../node_modules/axios";

export const resetConsoleResults = () => {
  return {
    type: RESET_CONSOLE_RESULTS
  }
}

export const clearOpponentConsole = () => {
  return {
    type: CLEAR_OPPONENT_CONSOLE
  }
}

export const setConsoleResults = (results) => {
  return {
    type: SET_CONSOLE_RESULTS,
    payload: results
  }
}

export const addDuelSolution = (input) => {
  return {
    type: DUEL_SOLUTION_CHANGE,
    payload: input
  };
};

export const opponentResults = (results) => {
  return {
    type: OPPONENT_RESULTS,
    payload: results.data
  };
};

export const getDuelPrompt = problem => {
  return {
    type: GET_PROMPT_DUEL,
    payload: problem
  };
};

export const playerJoinedDuel = (player) => {
  return {
    type: PLAYER_JOINED_DUEL,
    payload: player
  }
}

export const playerTyping = (array) => {
  let newArray = []
  newArray[1] = array[0]
  newArray[0] = array[1]
  return {
    type: PLAYER_TYPING,
    payload: newArray
  }
}

export const submitDuelSolution = solution => {
  return dispatch => {
    axios.post("/challenge", solution).then(res => {
      dispatch({
        type: SUBMIT_SOLUTION_DUEL,
        payload: res.data
      });
    });
    dispatch({
      type: RESET_RESULTS_DUEL
    })
  };
}; 