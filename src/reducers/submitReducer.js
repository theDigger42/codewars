import { SUBMIT_SOLUTION } from '../actions/types'

const initialState = {
    tests: [],
    pass: false
}

const submitReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBMIT_SOLUTION:
            const results = action.payload
            let status = true
            results.forEach(result => {
                if (result.status === 'fail') {
                    status = false
                }
            });
            return {
                ...state,
                tests: results,
                pass: status
            }

        case `${SUBMIT_SOLUTION}_FULFILLED`:
            return {
                ...state,
            }
        
        default:
            return state
    }
}

export default submitReducer