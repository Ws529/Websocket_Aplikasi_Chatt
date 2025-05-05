const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

let users = {}; // username => ws connection

wss.on('connection', (ws) => {
  let username = null;

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === 'login') {
        username = data.username;
        users[username] = ws;
        broadcastUserList();
      } else if (data.type === 'message') {
        const { to, text } = data;
        const target = users[to];
        if (target) {
          target.send(JSON.stringify({ from: username, text }));
        }
      }
    } catch (err) {
      console.error('Invalid message', err);
    }
  });

  ws.on('close', () => {
    if (username && users[username]) {
      delete users[username];
      broadcastUserList();
    }
  });
});

function broadcastUserList() {
  const userList = Object.keys(users);
  const payload = JSON.stringify({ type: 'users', users: userList });
  Object.values(users).forEach((ws) => ws.send(payload));
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));