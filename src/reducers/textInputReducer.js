import {
    INPUT_CHANGE,
    CLEAR_ALL_INPUTS
} from '../actions/types'

const initialState = {
    username: '',
    password: '',
    solution: '',
}

const textInput = (state = initialState, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                [action.payload.inputType]: action.payload.input
            }

        case CLEAR_ALL_INPUTS:
            return {
                ...initialState
            }

        default:
            return state

    }
}

export default textInput