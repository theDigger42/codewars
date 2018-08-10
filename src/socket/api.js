import ioclient from 'socket.io-client'
import store from '../store/index'
import { getPrompt } from '../actions/prompt'
import { setOffline, initOnlineUsers } from '../actions/online'

const socket = ioclient.connect()
// subscribe to a Socket
// pass in callback that gets run when recieving messages
export const subscribeToSocket = (user, cb) => {
  socket.on('connect', () => {
    socket.emit('userConnected', user);
    console.log('connect', user);
  })
  socket.on('userOnline', (user) => {
    cb(user)
    console.log('userOnline', user);
  })
  socket.on('userOffline', (user) => {
    console.log('userOffline', user);
    store.dispatch(setOffline(user))
  })
  socket.on('connectedUsers', (users) => {
    console.log('connectedUsers', users);
    store.dispatch(initOnlineUsers(users))
  })
};

export const disconnect = (user) => {
  socket.emit('disconnectUser', user)
}

export const connect = (user) => {
  socket.emit('userConnected', user)
}


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