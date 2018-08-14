import { SET_ONLINE_USERS, GET_ONLINE_USER } from './types'
import axios from 'axios'

export const setOnline = (users) => {
  return dispatch => {
    dispatch({
      type: SET_ONLINE_USERS,
      payload: users
    })
  }
}

export const getOnlineUser = (username) => {
  return dispatch => {
    axios.get(`/users:${username}`)
      .then(res => {
        dispatch({
          type: GET_ONLINE_USER,
          payload: res.data
        })
      })
  }
}