import {
  SUBMIT_SOLUTION_DUEL,
  GET_PROMPT_DUEL,
  RESET_RESULTS_DUEL,
  PLAYER_JOINED_DUEL,
  DUEL_SOLUTION_CHANGE,
  PLAYER_TYPING,
  OPPONENT_RESULTS,
  SET_CONSOLE_RESULTS,
  RESET_CONSOLE_RESULTS,
  CLEAR_OPPONENT_CONSOLE
} from "../actions/types";

const intialState = {
  opponent: {},
  opponentConsole: [],
  opponentPassing: false,
  title: '',
  body: '',
  solution: [],
  console: [],
  tests: [],
  testDescriptions: [],
  testResults: [],
  loading: false,
  results: []
};

const duel = (state = intialState, action) => {
  switch (action.type) {
    case `${PLAYER_JOINED_DUEL}`:
      return {
        ...state,
        opponent: action.payload
      };

    case GET_PROMPT_DUEL:
      return {
        ...state,
        title: action.payload.title,
        body: action.payload.body,
        solution: [action.payload.solution, action.payload.solution],
        tests: action.payload.tests,
        testDescriptions: action.payload.testDescriptions,
      }
    
    case PLAYER_TYPING:
      console.log(action.payload);
      return {
        ...state,
        solution: action.payload
      }

    case OPPONENT_RESULTS:
      let passing = true
      action.payload.testResults.filter(result => {
        if (result.passing === false) {
          passing = false;
        }
      })
      return {
        ...state,
        opponentConsole: action.payload.testResults,
        opponentPassing: passing
      }
    
    case DUEL_SOLUTION_CHANGE:
      return {
        ...state,
        solution: [action.payload[0], state.solution[1]]
      };

    case RESET_RESULTS_DUEL:
      return {
        ...state,
        console: []
      }

    case SET_CONSOLE_RESULTS:
      return {
        ...state,
        console: action.payload
      }

    case RESET_CONSOLE_RESULTS:
      return {
        ...state,
        console: []
      }

    case CLEAR_OPPONENT_CONSOLE:
      return {
        ...state,
        opponentConsole: []
      }

    default:
      return {
        ...state
      }
  }
}

export default duel