import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const loggerMiddleware = store => next => action => {
  console.log('dispatching: ', action)
  next(action)
}

const promiseMiddleware = store => next => action => {
  if (action.promise) {
    action.promise
    .then(rawResponse => rawResponse.json())
    .then(response => store.dispatch({type: action.type, payload: response}))
  } else {
    next(action)
  }
}

const socketMiddleware = store => next => action => {
  if (action.socket) {
    action.socket.on('connect', () => {
      console.log('hello');
    })
    next(action)
  } else {
    next(action)
  }
}

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk, 
      loggerMiddleware,
      promiseMiddleware,
      socketMiddleware
    )
  )
);

window.store = store
export default store