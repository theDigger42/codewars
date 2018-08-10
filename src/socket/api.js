import ioclient from 'socket.io-client'
import store from '../store/index'
import { getPrompt } from '../actions/prompt'
import { setOffline, initOnlineUsers } from '../actions/online'

export const socket = ioclient.connect()

export const subscribeToOnlineSocket = (callback) => {
  socket.on('connect', () => {
    console.log('connected');
  })
  socket.on('USER_CONNECTED', (users) => {
    callback(users)
  })
  socket.on('USER_DISCONNECTED', (users) => {
    callback(users)
  })
}

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