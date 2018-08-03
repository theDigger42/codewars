import { SUBMIT_SOLUTION, GET_PROMPT, CLEAR_PROMPT } from './types'
import axios from '../../node_modules/axios';

export const submit = (solution) => {
  return dispatch => {
    axios.post('/challenge', solution)
      .then(res => {
        dispatch({
          type: SUBMIT_SOLUTION,
          payload: res.data
        })
      })
  }
}

export const getPrompt = () => {
  return dispatch => {
    axios.get('/randomChallenge')
      .then(res => {
        dispatch({
          type: GET_PROMPT,
          payload: res.data
        })
      })
  }
}

export const clearPrompt = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_PROMPT
    })
  }
}