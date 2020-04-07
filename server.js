const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.onevent = (event) => {
    const IS_EMIT_TYPE = 2;
    const MESSAGE_CONTENT = 1;

    if(event.type === IS_EMIT_TYPE) {
      console.log('client emitted a data: ', event.data);
      socket.send(event.data[MESSAGE_CONTENT]);
    }
  }

  socket.on('disconnect', () => {
    console.log('User disconnected')
  });
});

server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
