import Login from './komponen/Login.js';
import Dashboard from './komponen/Dashboard.js';

const Home = {
    template: `
        <div class="min-h-screen bg-pink-50 bg-[radial-gradient(#fecdd3_1px,transparent_1px)] [background-size:20px_20px]">
            <div class="space-y-12 max-w-7xl mx-auto mt-10 px-6 pb-20 animate-in fade-in duration-700">
                
                <div class="relative overflow-hidden bg-gradient-to-r from-pink-500 to-rose-500 p-12 rounded-[2.5rem] text-white shadow-2xl shadow-rose-300/50">
                    <h2 class="text-5xl font-black tracking-tighter mb-3">🎀 Marsya's Library</h2>
                    <p class="text-pink-50 text-lg font-medium opacity-90 max-w-lg">
                        Jelajahi koleksi komik & Buku eksklusif kami. Pinjam dengan mudah dan nikmati tanpa batas.
                    </p>
                </div>

                <div class="max-w-full px-1">
                    <div class="relative bg-white rounded-2xl border-2 border-pink-200 shadow-md shadow-pink-100/60 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-100 transition-all duration-300">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-xl drop-shadow-sm">
                            🔍
                        </div>
                        <input 
                            v-model="searchQuery" 
                            type="text" 
                            placeholder="Cari komik atau penulis favoritmu di sini..." 
                            class="w-full pl-14 pr-12 py-4 bg-transparent text-slate-700 placeholder-pink-300 font-bold rounded-2xl outline-none text-base"
                        />
                        <button 
                            v-if="searchQuery" 
                            @click="searchQuery = ''" 
                            class="absolute inset-y-0 right-0 flex items-center pr-5 text-pink-400 hover:text-pink-600 transition-colors font-black text-lg"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" v-if="filteredBuku.length > 0">
                    <div v-for="buku in filteredBuku" :key="buku.id" 
                         class="group bg-white p-7 rounded-[2rem] border border-pink-100 shadow-lg shadow-pink-100/50 hover:shadow-2xl hover:shadow-pink-200 transition-all duration-500 flex flex-col justify-between hover:-translate-y-2">
                        
                        <div>
                            <div class="w-16 h-16 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner">📚</div>
                            <h3 class="font-bold text-slate-800 text-xl mb-1 leading-tight">{{ buku.judul }}</h3>
                            <p class="text-pink-500 text-sm font-bold mb-6">{{ buku.penulis }}</p>
                        </div>

                        <div>
                            <div class="flex justify-between items-center mb-6 text-[11px] font-black uppercase tracking-wider">
                                <span :class="parseInt(buku.stok) > 0 ? 'text-pink-600 bg-pink-100 px-3 py-1 rounded-full' : 'text-rose-500 bg-rose-50 px-3 py-1 rounded-full'">
                                    {{ parseInt(buku.stok) > 0 ? '● Tersedia' : '● Habis' }}
                                </span>
                                <span class="text-slate-400">{{ buku.stok }} Unit</span>
                            </div>

                            <!-- Diarahkan ke fungsi buka modal baru -->
                            <button @click="bukaModalPinjam(buku)" 
                                    :disabled="parseInt(buku.stok) <= 0"
                                    class="w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 shadow-md active:scale-95"
                                    :class="parseInt(buku.stok) > 0 ? 'bg-pink-500 hover:bg-pink-600 text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed'">
                                {{ parseInt(buku.stok) > 0 ? 'Pinjam Sekarang' : 'Stok Kosong' }}
                            </button>
                        </div>
                    </div>
                </div>

                <div v-else-if="listBuku.length > 0" class="text-center py-16 bg-white rounded-[2rem] border border-dashed border-pink-200 max-w-md mx-auto p-8">
                    <p class="text-4xl animate-bounce">❌</p>
                    <h4 class="font-bold text-slate-700 text-lg mt-3">Buku Tidak Ditemukan</h4>
                    <p class="text-sm text-slate-400 mt-1">Tidak ada koleksi komik bernama "{{ searchQuery }}".</p>
                </div>
            </div>

            <!-- ================= KOTAK FORM MODAL PEMINJAMAN KUSTOM (Sesuai Gaya Gambar 2) ================= -->
            <div v-if="showModalPinjam" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
                <div class="bg-white w-full max-w-sm p-8 rounded-[2rem] shadow-2xl border border-pink-100 space-y-6">
                    <div>
                        <h3 class="text-xl font-black text-pink-600">Form Pinjam Buku</h3>
                        <p class="text-xs font-bold text-slate-400 mt-1 truncate">Komik: {{ bukuDipilih.judul }}</p>
                    </div>

                    <form @submit.prevent="eksekusiPinjam" class="space-y-4">
                        <!-- Kolom Isian Nama -->
                        <div>
                            <input v-model="inputForm.nama" type="text" 
                                   class="w-full px-5 py-3.5 bg-pink-50/50 border border-pink-100 rounded-2xl focus:outline-none focus:border-pink-400 text-slate-700 font-medium placeholder:text-slate-400 text-sm" 
                                   placeholder="Nama Lengkap Peminjam" required>
                        </div>

                        <!-- Kolom Isian Tanggal Pinjam -->
                        <div>
                            <input v-model="inputForm.tanggal" type="date" 
                                   class="w-full px-5 py-3.5 bg-pink-50/50 border border-pink-100 rounded-2xl focus:outline-none focus:border-pink-400 text-slate-700 font-medium text-sm" 
                                   required>
                        </div>
                        
                        <!-- Tombol Menu Sesuai Desain Gambar 2 -->
                        <div class="flex items-center justify-end space-x-6 pt-2">
                            <button type="button" @click="tutupModalPinjam"
                                    class="font-bold text-sm text-slate-400 hover:text-slate-600 tracking-wider uppercase">
                                BATAL
                            </button>
                            <button type="submit" 
                                    class="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm rounded-xl transition-transform active:scale-95 tracking-wider uppercase">
                                SIMPAN
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <!-- ============================================================================================== -->

        </div>
    `,
    data() { 
        return { 
            listBuku: [],
            searchQuery: '',
            // State Tambahan untuk mengontrol Form Pop-Up
            showModalPinjam: false,
            bukuDipilih: {},
            inputForm: {
                nama: '',
                tanggal: ''
            }
        } 
    },
    computed: {
        filteredBuku() {
            const query = this.searchQuery.toLowerCase().trim();
            if (!query) {
                return this.listBuku;
            }
            return this.listBuku.filter(buku => {
                const judul = buku.judul ? buku.judul.toLowerCase() : '';
                const penulis = buku.penulis ? buku.penulis.toLowerCase() : '';
                return judul.includes(query) || penulis.includes(query);
            });
        }
    },
    methods: {
        async fetchKatalog() {
            try {
                const response = await axios.get('http://localhost:8080/api/buku');
                this.listBuku = response.data;
            } catch (error) { console.error(error); }
        },
        // Metode memunculkan modal & set data awal
        bukaModalPinjam(buku) {
            this.bukuDipilih = buku;
            this.inputForm.nama = '';
            // Otomatis deteksi & isi tanggal hari ini ke kolom format YYYY-MM-DD
            this.inputForm.tanggal = new Date().toISOString().split('T')[0];
            this.showModalPinjam = true;
        },
        tutupModalPinjam() {
            this.showModalPinjam = false;
            this.bukuDipilih = {};
        },
        // Pengganti fungsi axios.post lama
        eksekusiPinjam() {
            if (!this.inputForm.nama.trim()) return;

            axios.post('http://localhost:8080/api/peminjaman', { 
                buku_id: this.bukuDipilih.id, 
                nama_peminjam: this.inputForm.nama,
                tanggal_pinjam: this.inputForm.tanggal // Menambahkan parameter tanggal ke backend payload
            })
            .then(() => { 
                alert("Sukses Peminjaman!"); 
                this.bukuDipilih.stok = parseInt(this.bukuDipilih.stok) - 1; 
                this.tutupModalPinjam();
            })
            .catch(() => alert("Gagal meminjam."));
        }
    },
    mounted() { this.fetchKatalog(); }
};

const router = VueRouter.createRouter({ history: VueRouter.createWebHashHistory(), routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } }
]});

const app = Vue.createApp({
    data() { return { isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' } },
    methods: {
        logout() {
            localStorage.clear();
            this.isLoggedIn = false;
            window.location.reload(); 
        }
    }
});

app.use(router);
app.mount('#app');