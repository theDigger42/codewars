import { GET_LEADERBOARD, CHANGE_SCOREBOARD } from './types'
import axios from '../../node_modules/axios';

export const getLeaderboard = () => {
  return dispatch => {
    axios.get('/leaderboard')
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