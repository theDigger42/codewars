import { SET_ONLINE_USERS, SET_OFFLINE_USER, INIT_ONLINE_USERS } from '../actions/types'

const inititalState = {
  users: []
}

const online = (state = inititalState, action) => {
  switch (action.type) {
    case SET_ONLINE_USERS: 
      console.log(action.payload);
      return {
        ...state,
        users: action.payload
      }

    case INIT_ONLINE_USERS:
      return {
        ...state,
        users: action.payload
      }

    default:
      return state
  }
}

export default online