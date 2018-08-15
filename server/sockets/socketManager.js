const io = require('../index').io

let connectedUsers = {}

const addUser = (userList, user) => {
  if (user === null || user.username === null) {
    let newList = Object.assign({}, userList)
    newList['guest'] = 'guest'
    return
  }
  let newList = Object.assign({}, userList)
  newList[user.username] = user
  return newList
}

const removeUser = (userList, user) => {
  if (user === null) {
    let newList = Object.assign({}, userList)
    delete newList['guest']
    return
  }
  let newList = Object.assign({}, userList)
  delete newList[user.username]
  return newList
}

module.exports.io = (socket) => {

  socket.on('GET_CONNECTED_USERS', () => {
    console.log(connectedUsers);
    io.emit('CONNECTED_USERS', connectedUsers)
  })

  socket.on('USER_CONNECTED', (user) => {
    connectedUsers = addUser(connectedUsers, user) 
    socket.user = user
    io.emit('USER_CONNECTED', connectedUsers)
  })

  socket.on('disconnect', () => {
    if ('user' in socket) {
      connectedUsers = removeUser(connectedUsers, socket.user)
      io.emit('USER_DISCONNECTED', connectedUsers)
    }
  })

  socket.on('LOGOUT', () => {
    connectedUsers = removeUser(connectedUsers, socket.user)
    io.emit('USER_DISCONNECTED', connectedUsers)
  }) 
}