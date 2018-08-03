import { GET_LEADERBOARD } from '../actions/types'

const initialState = {
  users: []
}

const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LEADERBOARD:
      const results = action.payload
      return {
        ...state,
        users: results
      }

    default:
      return state
  }
}

export default scoreReducer