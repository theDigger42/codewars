import { SET_ONLINE_USER, SET_OFFLINE_USER } from './types'

export const setOnline = (user) => {
  return dispatch => {
    dispatch({
      type: SET_ONLINE_USER,
      payload: user
    })
  }
}

export const setOffline = (user) => {
  return {
    type: SET_OFFLINE_USER,
    payload: user
  }
}