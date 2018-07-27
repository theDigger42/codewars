import {
    LOGIN,
    LOGOUT
} from "../actions/types"

import isEmpty from 'lodash/isEmpty'

const intialState = {
    user: {},
    isAuthenticated: false
}

const auth = (state = intialState, action) => {
    switch (action.type) {

        case `${LOGIN}`:
            return {
                isAuthenticated: !isEmpty(action.user),
                user: action.user
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