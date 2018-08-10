const ioTimer = require('./index').ioTimer

module.exports.ioTimer = (socket) => {
  socket.on('getDate', () => {
    ioTimer.emit('date', new Date())
  })
}