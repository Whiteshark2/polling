const socketIo = require('socket.io');

const socketHandler = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('vote', (pollId) => {
      io.emit('updateResults', pollId);
    });

    socket.on('comment', (pollId) => {
      io.emit('updateComments', pollId);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

module.exports = socketHandler;
