import { SUBMIT_SOLUTION } from '../actions/types'

const initialState = {
    tests: []
}

const submitReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBMIT_SOLUTION:
            const results = action.payload
            return {
                ...state,
                tests: results
            }
        
        default:
            return state
    }
}

export default submitReducer