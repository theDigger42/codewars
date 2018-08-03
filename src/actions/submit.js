import { SUBMIT_SOLUTION } from './types'
import axios from '../../node_modules/axios';

export const submit = (solution) => {
  return dispatch => {
    axios.post('http://localhost:3000/challenge', solution)
      .then(res => {
        dispatch({
          type: SUBMIT_SOLUTION,
          payload: res.data
        })
      })
  }
}
