import axios from "axios"
import { LOGIN, LOGOUT, SIGN_UP } from "../actions/types"
import setAuthorizationToken from '../utils/setAuthorizationToken'
import jwt from 'jsonwebtoken'
import { socket } from '../socket/api'

export const setCurrentUser = (user) => {
  return {
    type: LOGIN,
    socket: socket.emit('USER_CONNECTED', user),
    user
  }
}

export const login = (data) => {
  return dispatch => {
    return axios.post(`/api/auth`, data).then(res => {
      const token = res.data.token
      localStorage.setItem('jwtToken', token)
      setAuthorizationToken(token)
      dispatch(setCurrentUser(jwt.decode(token)))
    })
  }
}

export const logout = (user) => {
  localStorage.setItem('jwtToken', null)
  return {
    type: LOGOUT,
    subscribe: socket.emit('LOGOUT', user)
  }
}

export const signup = (credentials) => ({
  type: SIGN_UP,
  payload: axios.post(`/api/signup`, credentials)
})