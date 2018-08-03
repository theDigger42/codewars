import { GET_PROMPT, INPUT_CHANGE, SUBMIT_SOLUTION, CLEAR_PROMPT } from '../actions/types'

const initialState = {
  title: 'Get ready',
  body: 'Click join and wait for the challenge to begin :)',
  solution: '',
  funcName: '',
  tests: [],
  results: [],
  isComplete: false
}

const prompt = (state = initialState, action) => {
  switch (action.type) {

    case GET_PROMPT:
      return {
        ...state,
        title: action.payload.title,
        body: action.payload.body,
        solution: 'function ' + action.payload.funcName + '(' + action.payload.params + ') {\n\n}',
        funcName: action.payload.funcName,
        tests: action.payload.tests,
        results: '',
        isComplete: false
      }

    case CLEAR_PROMPT: 
      return {
        ...state,
        title: 'Get ready',
        body: 'Wait for next game to begin',
        solution: '',
        funcName: '',
        tests: [],
        results: '',
        isComplete: false
      }

    case SUBMIT_SOLUTION:
      return {
        ...state,
        tests: action.payload
      }

    case INPUT_CHANGE: 
      return {
        ...state,
        [action.payload.inputType]: action.payload.input
      }

    default:
      return state

  }
}

export default prompt