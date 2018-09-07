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
  CLEAR_OPPONENT_CONSOLE,
  CLEAR_DUEL_PROMPT,
  SET_DUEL_ROOM,
  SET_DUEL_COMPLETE,
  CLEAR_OPPONENT_PROMPT
} from "./types";

import axios from "../../node_modules/axios";

export const setDuelComplete = () => {
  return {
    type: SET_DUEL_COMPLETE
  }
}

export const setDuelRoom = (roomId) => {
  return {
    type: SET_DUEL_ROOM,
    payload: roomId
  }
}

export const resetConsoleResults = () => {
  return {
    type: RESET_CONSOLE_RESULTS
  }
}

export const clearDuelPrompt = () => {
  return {
    type: CLEAR_DUEL_PROMPT
  }
}

export const clearOpponentConsole = () => {
  return {
    type: CLEAR_OPPONENT_CONSOLE
  }
}

export const clearOpponentPrompt = () => {
  return {
    type: CLEAR_OPPONENT_PROMPT
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

export const playersJoinedDuel = (players) => {
  return {
    type: PLAYER_JOINED_DUEL,
    payload: players
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