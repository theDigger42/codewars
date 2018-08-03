import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SIGN_UP,
  LOGIN
} from '../actions/types'

const initialState = {
  signup: false,
  login: false,
  ask: false,
  message: ''
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        [action.payload.modal]: true,
        message: action.payload.message
      }

    case CLOSE_MODAL:
      return initialState

    case SIGN_UP:
      return initialState

    case LOGIN:
      return initialState

    default:
      return state
  }
}

export default modalReducer