import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { setAuthorizationToken } from "../utils/setAuthorizationToken";
import { setCurrentUser } from "../actions/auth";
import axios from "axios";
import jwt from "jsonwebtoken";

// const loggerMiddleware = store => next => action => {
//   console.log('dispatching: ', action)
//   next(action)
// }

const promiseMiddleware = store => next => action => {
  if (action.promise) {
    action.promise
      .then(response => {
        if (response.data.error) {
          store.dispatch({
            type: `${action.type}_ERROR`,
            payload: response.data.error
          });
        }
      })
      .then(() => axios.post(`http://localhost:3000/api/auth`, action.credentials))
      .then(res => {
        const token = res.data.token;
        localStorage.setItem("jwtToken", token);
        setAuthorizationToken(token);
        store.dispatch(setCurrentUser(jwt.decode(token)));
      })
      .catch(err => console.log(err));
  } else {
    next(action);
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, promiseMiddleware))
);

window.store = store;
export default store;
