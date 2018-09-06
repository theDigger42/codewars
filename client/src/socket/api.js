import ioclient from "socket.io-client";
import store from "../store/index";
import { getPrompt } from "../actions/prompt";
import { playerJoinedDuel, getDuelPrompt, playerTyping, opponentResults, clearOpponentConsole } from '../actions/duel'

export const socket = ioclient.connect('/');

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

export const joinDuelRoom = userInfo => duelSocket.emit('joinDuelRoom', userInfo)

export const duelComplete = () => duelSocket.emit('duelComplete')

export const duelTyping = (letter) => {
  console.log('typing');
  duelSocket.emit('duelTyping', letter)
}

export const emitResponse = (response) => {
  console.log(response);
  duelSocket.emit('userResponse', response)
}

export const resetConsoleForOpponent = () => {
  duelSocket.emit('resetOpponentConsole')
}

const duelSocket = ioclient("/duel");

export const subscribeToDuelSocket = () => {
  duelSocket.on("connect", () =>
    console.log("successfully subscribed to duel socket")
  );

  duelSocket.on("challenge", problem => {
    store.dispatch(getDuelPrompt(problem));
  });

  duelSocket.on('playerJoined', (player) => {
    console.log(player);
    store.dispatch(playerJoinedDuel(player))
  })

  duelSocket.on('playerTyping', (letter) => {
    store.dispatch(playerTyping(letter));
  })

  duelSocket.on('opponentResults', (response) => {
    store.dispatch(opponentResults(response));
  })

  duelSocket.on('clearOpponentConsole', () => {
    store.dispatch(clearOpponentConsole())
  })

};