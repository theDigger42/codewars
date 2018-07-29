import { combineReducers } from 'redux';
import modalReducer from './modalReducer'
import input from './textInputReducer'
import auth from './authReducer'
import submitReducer from './submitReducer'
import score from './scoreReducer'

export default combineReducers({
    modalReducer,
    input,
    auth,
    submitReducer,
    score
});