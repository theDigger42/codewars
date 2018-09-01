import { SET_ONLINE_USERS, GET_ONLINE_USER } from "../actions/types";

const inititalState = {
  users: [],
  user: {}
};

const online = (state = inititalState, action) => {
  switch (action.type) {
    case SET_ONLINE_USERS:
      return {
        ...state,
        users: action.payload
      };

    case GET_ONLINE_USER:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
};

export default online;
