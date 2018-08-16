import { GET_LEADERBOARD, CHANGE_SCOREBOARD, CLEAR_SCOREBOARD } from './types'
import axios from '../../node_modules/axios';

export const getLeaderboard = () => {
  return dispatch => {
    axios.get('http://localhost:3000/leaderboardByDay')
      .then(res => {
        dispatch({
          type: GET_LEADERBOARD,
          payload: res.data
        })
      })
  }
}

export const onScoreboardChange = (scoreboard) => {
  return dispatch => {
    dispatch({
      type: CHANGE_SCOREBOARD,
      payload: scoreboard
    })
  }
}

export const clearScoreboard = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_SCOREBOARD
    })
  }
}