import {
  GET_DAILY_LEADERBOARD,
  GET_LEADERBOARD,
  CHANGE_SCOREBOARD,
  CLEAR_SCOREBOARD
} from "./types";
import axios from "../../node_modules/axios";

export const getDailyLeaderboard = () => {
  return dispatch => {
    axios.get("/leaderboardByDay").then(res => {
      dispatch({
        type: GET_DAILY_LEADERBOARD,
        payload: res.data
      });
    });
  };
};

export const getLeaderboard = () => {
  return dispatch => {
    axios.get("/leaderboard").then(res => {
      dispatch({
        type: GET_LEADERBOARD,
        payload: res.data
      });
    });
  };
};

export const onScoreboardChange = scoreboard => {
  return dispatch => {
    dispatch({
      type: CHANGE_SCOREBOARD,
      payload: scoreboard
    });
  };
};

export const clearScoreboard = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_SCOREBOARD
    });
  };
};
