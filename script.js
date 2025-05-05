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
