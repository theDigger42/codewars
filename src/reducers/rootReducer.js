import { combineReducers } from 'redux';
import modalReducer from './modalReducer'
import input from './textInputReducer'
import auth from './authReducer'
import submit from './submitReducer'

export default combineReducers({
    modalReducer,
    input,
    auth,
    submit
});