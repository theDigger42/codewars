const io = require('./index').io

let connectedUsers = {}

const addUser = (userList, user) => {
  if (user === null || user.username === null) {
    let newList = Object.assign({}, userList)
    newList['guest'] = 'guest'
    return
  }
  let newList = Object.assign({}, userList)
  newList[user.username] = user.username
  return newList
}

const removeUser = (userList, user) => {
  if (user === null || user.username === null) {
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
    io.emit('CONNECTED_USERS', connectedUsers)
  })

  socket.on('USER_CONNECTED', (user) => {
    //user.socketId = socket.id
    connectedUsers = addUser(connectedUsers, user) 
    socket.user = user

    io.emit('USER_CONNECTED', connectedUsers)
    console.log(connectedUsers)
  })

  socket.on('disconnect', () => {
    if ('user' in socket) {
      connectedUsers = removeUser(connectedUsers, socket.user)

      io.emit('USER_DISCONNECTED', connectedUsers)
      console.log('disconnect', connectedUsers)
    }
  })

  socket.on('LOGOUT', () => {
    connectedUsers = removeUser(connectedUsers, socket.user)
    io.emit('USER_DISCONNECTED', connectedUsers)
    console.log('Disconnect', connectedUsers)
  }) 
}