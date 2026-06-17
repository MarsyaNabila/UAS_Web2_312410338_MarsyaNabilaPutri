# Sistem Komik Digital (E-Library Marsya's) - Pemograman Web 2 UAS

Nama: Marsya Nabila Putri

NIM: 312410338

Kelas: I241D

Repositori ini menyimpan source code aplikasi Marsya's Library, sebuah sistem manajemen katalog komik digital yang dibangun sebagai pemenuhan tugas akhir mata kuliah Pemrograman Web 2. Proyek ini mengimplementasikan pola arsitektur Client-Server dengan pendekatan Decoupled, yang memisahkan secara modular antara RESTful API Backend dan Frontend Single Page Application (SPA) untuk mencapai performa sistem yang lebih optimal.

# Arsitektur & Komponen Sistem
- ```backend-api/``` : Berperan sebagai pusat kendali data (RESTful API Server) yang ditenagai oleh framework CodeIgniter 4. Sisi server ini telah dilengkapi dengan sistem keamanan mutakhir menggunakan mekanisme enkripsi berbasis JWT (JSON Web Token) untuk memproteksi lalu lintas data.

- ```frontend-spa/``` : Berperan sebagai lapisan antarmuka pengguna berbasis Single Page Application (SPA) yang dirancang menggunakan kombinasi Vue.js 3 serta framework Tailwind CSS untuk menyajikan desain Ultra-Modern UI. Proses pertukaran data asynchronous dengan server dijembatani secara penuh oleh pustaka Axios.

# Panduan Instalasi dan Menjalankan Project

### 1. Backend

- Masuk ke folder ```backend-api/```.

- Salin file .env dan atur konfigurasi database serta JWT_SECRET_KEY.

- Jalankan server lokal:  ```   php spark serve```

### 2. Frontend

- Buka folder ```frontend-spa/```.

- Pastikan base URL pada pemanggilan Axios sudah mengarah ke port backend yang aktif ```http://localhost:8080```.

- Jalankan file ```index.html``` langsung menggunakan browser atau ekstensi Live Server di VS Code.

# Link Demo dan Presentasi

- Demo Aplikasi: https://uas-web2-312410338-marsya-nabila-pu.vercel.app/

- Presentasi proyek:

# Bukti Dokumentasi Hasil Pengujian

### 1. Database

<img width="953" height="266" alt="Screenshot 2026-06-12 235029" src="https://github.com/user-attachments/assets/5104c25b-277d-4921-a2fd-f3c00e39df8c" />

### 2. Uji Coba Keamanan API (Backend)

<img width="782" height="492" alt="Screenshot 2026-06-12 164551" src="https://github.com/user-attachments/assets/e7501bec-b682-496b-ad21-52c322029b29" />

### 3. Antarmuka Aplikasi (Frontend)

- Login Admin

- (Username: admin) (Password: admin123)

<img width="959" height="462" alt="image" src="https://github.com/user-attachments/assets/c8de8b57-5cda-4e6f-8b75-57dc71172edb" />

- Dashboard Admin

<img width="959" height="448" alt="image" src="https://github.com/user-attachments/assets/1034acd2-a546-42a1-93a5-3102f68d947c" />

<img width="959" height="458" alt="image" src="https://github.com/user-attachments/assets/09c4f776-2c48-4bcd-a659-d01413ef6ac6" />

- Dashboard Admin (Tambah Komik/Buku)
  
<img width="959" height="460" alt="image" src="https://github.com/user-attachments/assets/b53c6e99-65bc-4bdd-a871-18a1089af422" />

- Dashboard Admin (Edit Komik/Buku)
  
<img width="959" height="458" alt="image" src="https://github.com/user-attachments/assets/ff7d4288-1fec-4b50-82c1-5244222b431e" />

- Dashboard Admin (Hapus Komik/Buku) 

<img width="959" height="464" alt="image" src="https://github.com/user-attachments/assets/fbc35ec9-d3b1-46e9-bcca-397e28a171a0" />

- Katalog Tabel Data User

<img width="959" height="463" alt="image" src="https://github.com/user-attachments/assets/f4f8877c-4060-4b13-a3a7-c51cd1999e9d" />

- Peminjaman Buku User

<img width="959" height="458" alt="image" src="https://github.com/user-attachments/assets/ce13335e-a9a6-4cb3-81d0-822e8f25cd70" />





