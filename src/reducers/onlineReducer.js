import { SET_ONLINE_USER, SET_OFFLINE_USER } from '../actions/types'

const inititalState = {
  users: []
}

const online = (state = inititalState, action) => {
  switch (action.type) {
    case SET_ONLINE_USER: 
      let users = state.users
      users.push(action.payload)
      return {
        ...state,
        users: users
      }

    case SET_OFFLINE_USER:
      users = state.users
      let index = 0
      users.forEach((user, i) => {
        if (user && user.username === action.payload.username) index = i
      })
      users.splice(index, 1)
      return {
        ...state,
        users: users
      }

    default:
      return state
  }
}

export default online