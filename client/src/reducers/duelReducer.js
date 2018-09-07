import {
  GET_PROMPT_DUEL,
  RESET_RESULTS_DUEL,
  PLAYER_JOINED_DUEL,
  DUEL_SOLUTION_CHANGE,
  PLAYER_TYPING,
  OPPONENT_RESULTS,
  SET_CONSOLE_RESULTS,
  RESET_CONSOLE_RESULTS,
  CLEAR_OPPONENT_CONSOLE,
  CLEAR_DUEL_PROMPT,
  SET_DUEL_ROOM,
  SET_DUEL_COMPLETE,
  CLEAR_OPPONENT_PROMPT
} from "../actions/types";

const intialState = {
  players: [{}, {}],
  opponentConsole: [],
  opponentPassing: false,
  passing: false,
  title: '',
  body: '',
  solution: ['//Wait for another player to join.', ''],
  console: [],
  tests: [],
  testDescriptions: [],
  testResults: [],
  loading: false,
  results: [],
  roomId: ''
};

const duel = (state = intialState, action) => {
  switch (action.type) {

    case CLEAR_OPPONENT_PROMPT:
      return {
        ...state,
        solution: [],
        console: [],
        title: ''
      }

    case SET_DUEL_COMPLETE:
      return {
        ...state,
        passing: true,
        title: ''
      }

    case SET_DUEL_ROOM:
      return {
        ...state,
        roomId: action.payload
      }

    case CLEAR_DUEL_PROMPT:
      return {
        ...state,
        solution: [],
        opponentConsole: [],
        title: ''
      }

    case PLAYER_JOINED_DUEL:
      return {
        ...state,
        players: action.payload
      };

    case GET_PROMPT_DUEL:
      return {
        ...state,
        title: action.payload.title,
        body: action.payload.body,
        solution: [action.payload.solution, action.payload.solution],
        tests: action.payload.tests,
        testDescriptions: action.payload.testDescriptions,
        console: [],
        opponentConsole: [],
        passing: false,
        opponentPassing: false
      }
    
    case PLAYER_TYPING:
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