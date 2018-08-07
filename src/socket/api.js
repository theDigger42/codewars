import ioclient from 'socket.io-client'
import store from '../store/index'
import { getPrompt } from '../actions/prompt'

const socket = ioclient.connect();
// subscribe to a Socket
// pass in callback that gets run when recieving messages
export const subscribeToSocket = (name, cb) => {
  // subscribe to messages
  socket.on('message', (message) => cb(message));
  // now tell server we want to subscribe
  socket.on('connect', (data) => {
    socket.emit('subscribeToMessage', name);
  })

};

export const sendMessage = (message) => {
  socket.emit('message', message);
};

//timer 
const timerSocket = ioclient('/timer')

export const subscribeToTimerSocket = (cb) => {
  timerSocket.on('date', (date) => {
    cb(date)
  })
}

export const getDateTimerSocket = () => {
  timerSocket.emit('getDate');
}

const gameSocket = ioclient('/game');

export const subscribeToGameSocket = (onScoreboardChange) => {

  gameSocket.on('connect', () => console.log('successfully subscribed to game socket'));

  gameSocket.on('scoreboardChange', (data) => {
    onScoreboardChange(data);
  });

  gameSocket.on('challenge', (problem) => {
    store.dispatch(getPrompt(problem))
  })
};

export const unsubscribe = () => {
  gameSocket.removeAllListeners('challenge')
  gameSocket.removeAllListeners('gameStart')
}

export const gameComplete = () => {
  gameSocket.emit('gameComplete');
};

export const joinWaitingRoom = (userInfo) => gameSocket.emit('joinWaitingRoom', userInfo);

export const exitWaitingRoom = (userInfo) => gameSocket.emit('exitWaitingRoom', userInfo)