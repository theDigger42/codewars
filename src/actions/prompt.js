import { SUBMIT_SOLUTION, GET_PROMPT, CLEAR_PROMPT, CHANGE_ROOM, SET_COMPLETE } from './types'
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

export const changeRoom = (room) => {
  return dispatch => {
    dispatch({
      type: CHANGE_ROOM,
      payload: room
    })
  }
}

export const setComplete = () => {
  return dispatch => {
    dispatch({
      type: SET_COMPLETE,
      payload: true
    })
  }
}