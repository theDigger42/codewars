const io = require("../index").io;
const getUser = require("../../database/index").getUser;

let connectedUsers = {};

const addUser = (userList, user) => {
  let newList = Object.assign({}, userList);
  newList[user.username] = user;
  return newList;
};

const removeUser = (userList, user) => {
  let newList = Object.assign({}, userList);
  if (user) delete newList[user.username];
  return newList;
};

module.exports.io = socket => {
  socket.on("GET_CONNECTED_USERS", () => {
    io.emit("CONNECTED_USERS", connectedUsers);
  });

  socket.on("USER_CONNECTED", user => {
    if (user) {
      getUser(user.username).then(async newUser => {
        connectedUsers = await addUser(connectedUsers, newUser);
        socket.newUser = newUser;
        io.emit("USER_CONNECTED", connectedUsers);
      });
    }
  });

  socket.on("disconnect", () => {
    if ("newUser" in socket) {
      connectedUsers = removeUser(connectedUsers, socket.newUser);
      io.emit("USER_DISCONNECTED", connectedUsers);
    }
  });

  socket.on("LOGOUT", () => {
    connectedUsers = removeUser(connectedUsers, socket.newUser);
    io.emit("USER_DISCONNECTED", connectedUsers);
  });
};
