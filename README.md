Berikut adalah versi yang sudah dirapikan dan disusun dengan baik untuk file `README.md` di GitHub Anda, agar lebih profesional dan mudah dibaca:

---

# 📡 Implementasi WebSocket untuk Komunikasi Real-Time

### Studi Kasus: Aplikasi Chat Sederhana

## 🧾 Informasi Proyek

**UTS Pemrograman Web 2**

| Nama          | NIM       | Kelas     | Mata Kuliah       |
| ------------- | --------- | --------- | ----------------- |
| Wawan Suwandi | 312310457 | TI.23.A.5 | Pemrograman Web 2 |

---

## 📝 Deskripsi Singkat

Aplikasi **chat real-time** ini dibangun menggunakan **Node.js**, **Express**, dan **WebSocket (`ws`)**, dengan fitur:

* Login pengguna
* Daftar pengguna online secara real-time
* Pengiriman pesan langsung antar pengguna

---

## ⚙️ Cara Menjalankan Proyek

### 1. Persiapan Folder Proyek

Buat folder baru, misalnya `realtime-chat-app`, lalu buka dengan **VSCode**.

### 2. Instalasi Dependency

Jalankan perintah berikut di terminal:

```bash
npm init -y
npm install express ws
```

### 3. Jalankan Server

```bash
node server.js
```

Akses aplikasi via browser: [http://localhost:3000](http://localhost:3000)

---

## 🗂️ Struktur Direktori

```
realtime-chat-app/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── server.js
```

📷 Contoh struktur folder:
![Struktur folder](https://github.com/user-attachments/assets/9e98769f-68c9-4f09-96f3-412a54a87fd1)

---

## 💻 Cuplikan Antarmuka

### Tampilan Login dan Chat

| Login                                                                                     | Chat                                                                                     |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| ![Login](https://github.com/user-attachments/assets/0daad429-22f8-4fcc-8c71-21132cc30dc0) | ![Chat](https://github.com/user-attachments/assets/2792b8b0-ce63-4cb3-bfed-4214f0b0d5da) |

---

## 📄 Kode Utama

### `index.html`

```html
<!-- Potongan kode tersedia di file public/index.html -->
```

### `script.js`

```javascript
// Potongan kode tersedia di file public/script.js
```

### `server.js`

```javascript
// Kode lengkap tersedia di root project: server.js
```

---

## ✅ Fitur

* Real-time update pengguna online
* Pengiriman pesan 1-on-1
* Desain antarmuka sederhana dan intuitif

---

## 📌 Catatan

* Pastikan port 3000 tidak sedang digunakan oleh aplikasi lain.
* Koneksi WebSocket akan berjalan di alamat yang sama dengan server (`ws://localhost:3000`).


