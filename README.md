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

## 3. Antarmuka Aplikasi (Frontend)

- Login Admin

- (Username: admin) (Password: admin123)

<img width="959" height="460" alt="image" src="https://github.com/user-attachments/assets/aba71202-247b-47f9-9ed8-bcde9f74000a" />

###  Dashboard Admin

<img width="959" height="419" alt="image" src="https://github.com/user-attachments/assets/4632ad94-e4a8-4473-ae47-b084d7e7f2bb" />

<img width="959" height="456" alt="image" src="https://github.com/user-attachments/assets/899d75e0-4d3c-49dd-9d90-b4f02f7bc0cc" />

###  Dashboard Admin (Tambah Komik/Buku)

<img width="959" height="457" alt="image" src="https://github.com/user-attachments/assets/f3e3a47c-b244-4428-ac98-82cffa3ebb33" />

###  Dashboard Admin (Edit Komik/Buku)
  
<img width="959" height="451" alt="image" src="https://github.com/user-attachments/assets/54f1f09b-9b26-4595-9ca9-256fcd766f8b" />

###  Dashboard Admin (Hapus Komik/Buku) 

<img width="959" height="437" alt="image" src="https://github.com/user-attachments/assets/82e110d1-53c9-4c10-b62e-6d1099786dab" />

### Tabel Kategori

<img width="959" height="461" alt="image" src="https://github.com/user-attachments/assets/e979fa77-4393-47d9-b2ab-cca393031356" />

### Tambah Kategori

<img width="959" height="455" alt="image" src="https://github.com/user-attachments/assets/2ff90841-65c5-43cd-920d-adde36019a7a" />

### Edit Kategori

<img width="959" height="450" alt="image" src="https://github.com/user-attachments/assets/69ecc185-dc69-4788-8ac3-9a3879556112" />

### Hapus Kategori

<img width="959" height="461" alt="image" src="https://github.com/user-attachments/assets/6537c0cf-b7bb-49e5-b334-6d68394d141b" />

###  Katalog Tabel Data User

<img width="959" height="463" alt="image" src="https://github.com/user-attachments/assets/f4f8877c-4060-4b13-a3a7-c51cd1999e9d" />

###  Peminjaman Buku User

<img width="959" height="458" alt="image" src="https://github.com/user-attachments/assets/ce13335e-a9a6-4cb3-81d0-822e8f25cd70" />

# Arsitektur Teknologi

### Backend (API)
* **Framework**: CodeIgniter 4
* **Database**: MySQL
* **Fitur**: RESTful API, Validation Rules, Filters Auth

### Frontend (UI)
* **Framework**: Vue.js (SPA Component)
* **Styling**: Tailwind CSS
* **HTTP Client**: Axios




