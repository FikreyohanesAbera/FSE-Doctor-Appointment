
const socketIo = require('socket.io');
let io; 

function initializeWebSocket(server) {
  io = socketIo(server,{
    cors:{
        origin: ['*']

    } 
}); 

  io.on('connection', (socket) => {
    console.log('A user connected');

  });
}

function getIo() {
  if (!io) {
    throw new Error('Socket.io has not been initialized');
  }
  return io;
}

module.exports = {
  initializeWebSocket,
  getIo
};
