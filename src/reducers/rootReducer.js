import { combineReducers } from 'redux';
import modalReducer from './modalReducer'
import input from './textInputReducer'
import auth from './authReducer'
import submitReducer from './submitReducer'

export default combineReducers({
    modalReducer,
    input,
    auth,
    submitReducer
});