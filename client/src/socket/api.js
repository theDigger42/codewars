import ioclient from "socket.io-client";
import store from "../store/index";
import { getPrompt } from "../actions/prompt";

export const socket = ioclient.connect();

export const subscribeToOnlineSocket = callback => {
  socket.on("connect", () => {
    socket.emit("GET_CONNECTED_USERS");
  });
  socket.on("CONNECTED_USERS", users => {
    callback(users);
  });
  socket.on("USER_CONNECTED", users => {
    callback(users);
  });
  socket.on("USER_DISCONNECTED", users => {
    callback(users);
  });
};

const gameSocket = ioclient("/game");

export const subscribeToGameSocket = (onScoreboardChange, onTimerChange) => {
  gameSocket.on("connect", () =>
    console.log("successfully subscribed to game socket")
  );

  gameSocket.on("scoreboardChange", data => {
    onScoreboardChange(data);
  });

  gameSocket.on("challenge", problem => {
    store.dispatch(getPrompt(problem));
  });

  gameSocket.on("timer", count => {
    onTimerChange(count);
  });
};

export const unsubscribe = () => {
  gameSocket.removeAllListeners("challenge");
  gameSocket.removeAllListeners("timer");
};

export const gameComplete = () => {
  gameSocket.emit("gameComplete");
};

export const joinWaitingRoom = userInfo =>
  gameSocket.emit("joinWaitingRoom", userInfo);

export const exitWaitingRoom = userInfo =>
  gameSocket.emit("exitWaitingRoom", userInfo);