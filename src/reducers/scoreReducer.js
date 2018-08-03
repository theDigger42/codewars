import { GET_LEADERBOARD, CHANGE_SCOREBOARD } from '../actions/types'

const initialState = {
  users: [],
  scoreboard: []
}

const score = (state = initialState, action) => {
  switch (action.type) {
    case GET_LEADERBOARD:
      return {
        ...state,
        users: action.payload
      }

    case CHANGE_SCOREBOARD:
      return {
        ...state,
        scoreboard: action.payload
      }

    default:
      return state

  }
}

export default score