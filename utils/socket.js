const socket_io = require("socket.io");
const io = socket_io();

var Socket = {
  emit: function(event, data) {
    io.sockets.emit(event, data);
  }
};

io.on("connection", function(socket) {
  console.log("A user connected");
});

module.exports = {
  Socket,
  io
};
