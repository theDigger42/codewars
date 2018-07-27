import { combineReducers } from 'redux';
import modalReducer from './modalReducer'
import input from './textInputReducer'

export default combineReducers({
    modalReducer,
    input
});