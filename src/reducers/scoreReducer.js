import { GET_LEADERBOARD, CHANGE_SCOREBOARD, CLEAR_SCOREBOARD } from '../actions/types'

const initialState = {
  leaderboard: [],
  scoreboard: []
}

const score = (state = initialState, action) => {
  switch (action.type) {
    case GET_LEADERBOARD:
      return {
        ...state,
        leaderboard: action.payload
      }

    case CHANGE_SCOREBOARD:
      return {
        ...state,
        scoreboard: action.payload
      }

    case CLEAR_SCOREBOARD:
      return {
        ...state,
        scoreboard: []
      }

    default:
      return state

  }
}

export default score