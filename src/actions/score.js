import { GET_LEADERBOARD } from './types'
import axios from '../../node_modules/axios';

export const getLeaderboard = () => {
  return dispatch => {
    axios.get('http://localhost:3000/leaderboard')
      .then(res => {
        dispatch({
          type: GET_LEADERBOARD,
          payload: res.data
        })
      })
  }
}