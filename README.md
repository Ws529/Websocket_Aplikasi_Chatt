# "Implementasi WebSocket untuk Komunikasi Real-Time: Studi Kasus Aplikasi Chat Sederhana"

# UTS.Pemrograman-Web
|**Nama**|**NIM**|**Kelas**|**Matkul**|
|----|---|-----|------|
|Wawan Suwandi|312310457|TI.23.A.5|Pemrograman Web 2|

# Membuat aplikasi chatt sederhana secara realtime
Aplikasi chat real-time menggunakan Node.js, Express, dan WebSocket (ws) dengan fitur login, daftar pengguna online, dan pesan langsung antar pengguna.
Setup di VSCode:
- Buat folder baru misalnya realtime-chat-app, lalu buka dengan VSCode.
Jalankan terminal dan ketik:
npm init -y
npm install express ws

Jalankan server:
node server.js
Buka browser ke http://localhost:3000

![Cuplikan layar 2025-05-05 233153](https://github.com/user-attachments/assets/69c9b010-9e7a-4c80-8ec1-d28fda944ab8)

- buat diraktori file nya seperti ini:

![Cuplikan layar 2025-05-05 233208](https://github.com/user-attachments/assets/9e98769f-68c9-4f09-96f3-412a54a87fd1)

dengan code index.html 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat Real-Time</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="login">
    <h2>Login</h2>
    <input type="text" id="username" placeholder="Masukkan nama pengguna">
    <button onclick="login()">Masuk</button>
  </div>

  <div id="chat" class="hidden">
    <div id="sidebar">
      <h3>Pengguna Online</h3>
      <ul id="users"></ul>
    </div>

    <div id="chat-area">
      <!-- Header chat -->
      <div id="chat-header">
        <h3>Chat dengan <span id="chat-with">-</span></h3>
      </div>

      <!-- Gelembung pesan -->
      <div id="messages"></div>

      <!-- Input area -->
      <div id="input-area">
        <input type="text" id="message" placeholder="Ketik pesan...">
        <button onclick="sendMessage()">Kirim</button>
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>


dan code script.js
let ws;
let currentUser = null;
let chattingWith = null;

function login() {
  const usernameInput = document.getElementById('username');
  const username = usernameInput.value.trim();
  if (!username) return alert('Nama pengguna wajib diisi!');

  ws = new WebSocket(`ws://${window.location.host}`);
  ws.onopen = () => {
    ws.send(JSON.stringify({ type: 'login', username }));
    currentUser = username;
    document.getElementById('login').classList.add('hidden');
    document.getElementById('chat').classList.remove('hidden');
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === 'users') {
      const userList = data.users.filter(u => u !== currentUser);
      const usersUl = document.getElementById('users');
      usersUl.innerHTML = '';
      userList.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        li.onclick = () => {
          chattingWith = user;
          document.getElementById('chat-with').textContent = user;
          document.getElementById('messages').innerHTML = '';
        };
        usersUl.appendChild(li);
      });
    } else if (data.from) {
      const messagesDiv = document.getElementById('messages');
      const msg = document.createElement('div');
      msg.className = data.from === currentUser ? 'message me' : 'message other';
      msg.textContent = `${data.from}: ${data.text}`;
      messagesDiv.appendChild(msg);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
  };
}

function sendMessage() {
  const msgInput = document.getElementById('message');
  const text = msgInput.value.trim();
  if (!text || !chattingWith) return;

  // Kirim pesan ke server
  ws.send(JSON.stringify({ type: 'message', to: chattingWith, text }));

  // Tampilkan pesan kita sendiri
  const messagesDiv = document.getElementById('messages');
  const msg = document.createElement('div');
  msg.className = 'message me';
  msg.textContent = `Saya: ${text}`;
  messagesDiv.appendChild(msg);

  // Scroll ke bawah dan kosongkan input
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  msgInput.value = '';
}


code server.js
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


maka akan mengasilkan tampilan seperti ini:

![Cuplikan layar 2025-05-05 233045](https://github.com/user-attachments/assets/0daad429-22f8-4fcc-8c71-21132cc30dc0)

![Cuplikan layar 2025-05-05 233056](https://github.com/user-attachments/assets/2792b8b0-ce63-4cb3-bfed-4214f0b0d5da)

