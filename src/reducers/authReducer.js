import {
  LOGIN,
  LOGOUT
} from "../actions/types"

import isEmpty from 'lodash/isEmpty'

const intialState = {
  user: {},
  isAuthenticated: false,
  loginError: '',
  signupError: ''
}

const auth = (state = intialState, action) => {
  switch (action.type) {

    case `${LOGIN}`:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      }

    case 'LOGIN_ERROR':
      return {
        ...state,
        loginError: action.payload
      }

    case 'SIGN_UP_ERROR':
      return {
        ...state,
        signupError: action.payload
      }

    case `${LOGOUT}`:
      return {
        user: {},
        isAuthenticated: false
      }

    default:
      return state
  }
}

export default auth