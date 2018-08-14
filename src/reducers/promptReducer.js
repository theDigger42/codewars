import { GET_PROMPT, SUBMIT_SOLUTION, CLEAR_PROMPT, CHANGE_ROOM, SET_COMPLETE, USER_SUBMITION, SOLUTION_CHANGE, CLEAR_ALL_INPUTS, TIMER_CHANGE } from '../actions/types'

const initialState = {
  title: 'You up for a challenge?',
  body: 'Click join and wait for the next game to start',
  solution: '',
  tests: [],
  testDescriptions: [],
  testResults: [],
  results: [],
  timer: null,
  message: '',
  isComplete: false,
  room: 'lobby',
  submition_status: ''
}

const prompt = (state = initialState, action) => {
  switch (action.type) {

    case TIMER_CHANGE:
      return {
        ...state,
        timer: action.payload
      }
    
    case GET_PROMPT:
      return {
        ...state,
        title: action.payload.title,
        body: action.payload.body,
        solution: action.payload.solution,
        tests: action.payload.tests,
        testDescriptions: action.payload.testDescriptions,
        isComplete: false,
        room: ''
      }

    case CLEAR_PROMPT: 
      return {
        ...state,
        title: 'Get ready to code!',
        body: 'Wait for the next game to begin',
        solution: '',
        results: [],
        testDescriptions: [],
        testResults: [],
        message: '',
        isComplete: false,
        room: 'waiting'
      }

    case SUBMIT_SOLUTION:
      return {
        ...state,
        results: action.payload.results,
        testResults: action.payload.testResults,
        message: action.payload.message
      }

    case USER_SUBMITION:
      return {
        ...state,
        submition_status: action.payload
      }

    case SET_COMPLETE: 
      return {
        ...state,
        isComplete: action.payload
      }

    case CHANGE_ROOM:
      return {
        ...state,
        room: action.payload
      }

    case SOLUTION_CHANGE: 
      return {
        ...state,
        [action.payload.inputType]: action.payload.input
      }

    case CLEAR_ALL_INPUTS:
      return {
        ...state,
        submition_status: ''
      }

    default:
      return state

  }
}

export default prompt