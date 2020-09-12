import ioclient from "socket.io-client";
import store from "../store/index";
import { getPrompt } from "../actions/prompt";
import { 
  playersJoinedDuel, 
  getDuelPrompt, 
  playerTyping, 
  opponentResults, 
  clearOpponentConsole,
  setDuelRoom,
  clearOpponentPrompt
} from '../actions/duel'

export const socket = ioclient.connect('http://localhost:4000/');

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

const gameSocket = ioclient("http://localhost:4000/game");

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

export const joinWaitingRoom = userInfo => gameSocket.emit("joinWaitingRoom", userInfo);

export const exitWaitingRoom = userInfo => gameSocket.emit("exitWaitingRoom", userInfo);

export const joinDuelRoom = userInfo => duelSocket.emit('joinDuelRoom', userInfo)

export const duelComplete = () => duelSocket.emit('duelComplete')

export const duelTyping = (letter) => {
  duelSocket.emit('duelTyping', letter)
}

export const emitResponse = (response) => {
  duelSocket.emit('userResponse', response)
}

export const resetConsoleForOpponent = () => {
  duelSocket.emit('resetOpponentConsole')
}

export const connectToRoom = (user, room) => {
  duelSocket.emit('joinDuelRoom', {user, room})
}

export const clearPromptForOpponent = () => {
  duelSocket.emit('resetOpponentPrompt')
}

const duelSocket = ioclient("http://localhost:4000/duel");

export const subscribeToDuelSocket = (roomId) => {
  duelSocket.on("connect", () => {
    duelSocket.emit('joinRoom', roomId)
  });

  duelSocket.on('currentRoom', (roomId) => {
    store.dispatch(setDuelRoom(roomId))
  })

  duelSocket.on("challenge", problem => {
    store.dispatch(getDuelPrompt(problem));
  });

  duelSocket.on('duelers', (players) => {
    store.dispatch(playersJoinedDuel(players))
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

  duelSocket.on('clearOpponentPrompt', () => {
    store.dispatch(clearOpponentPrompt())
  })

};