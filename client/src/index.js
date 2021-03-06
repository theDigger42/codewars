import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Root from "./Root";
import setAuthorizationToken from "./utils/setAuthorizationToken";
import { setCurrentUser } from "./actions/auth";
import store from "./store/index";
import jwt from "jsonwebtoken";

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("root")
);
