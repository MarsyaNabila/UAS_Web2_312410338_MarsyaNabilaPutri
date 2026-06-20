export default {
    template: `
        <div class="min-h-screen bg-pink-50 p-6 md:p-12 space-y-12">
            
            <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4">
                <div class="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-5 rounded-[2rem] shadow-xl shadow-pink-200 flex items-center space-x-4 border-4 border-white min-w-0">
                    <div class="bg-white/20 p-3.5 rounded-2xl text-2xl flex-shrink-0">📚</div>
                    <div class="min-w-0">
                        <p class="text-[10px] font-black uppercase tracking-widest text-pink-100 truncate">Total Judul</p>
                        <h3 class="text-xl md:text-2xl font-black mt-0.5 whitespace-nowrap truncate">{{ totalJudul }} Koleksi</h3>
                    </div>
                </div>

                <div class="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-5 rounded-[2rem] shadow-xl shadow-pink-200 flex items-center space-x-4 border-4 border-white min-w-0">
                    <div class="bg-white/20 p-3.5 rounded-2xl text-2xl flex-shrink-0">📦</div>
                    <div class="min-w-0">
                        <p class="text-[10px] font-black uppercase tracking-widest text-pink-100 truncate">Total Stok</p>
                        <h3 class="text-xl md:text-2xl font-black mt-0.5 whitespace-nowrap truncate">{{ totalStok }} Pcs</h3>
                    </div>
                </div>

                <div class="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-5 rounded-[2rem] shadow-xl shadow-pink-200 flex items-center space-x-4 border-4 border-white min-w-0">
                    <div class="bg-white/20 p-3.5 rounded-2xl text-2xl flex-shrink-0">⚠️</div>
                    <div class="min-w-0">
                        <p class="text-[10px] font-black uppercase tracking-widest text-pink-100 truncate">Kosong</p>
                        <h3 class="text-xl md:text-2xl font-black mt-0.5 whitespace-nowrap truncate">{{ totalKosong }} Judul</h3>
                    </div>
                </div>

                <div class="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-5 rounded-[2rem] shadow-xl shadow-pink-200 flex items-center space-x-4 border-4 border-white min-w-0">
                    <div class="bg-white/20 p-3.5 rounded-2xl text-2xl flex-shrink-0">🗂️</div>
                    <div class="min-w-0">
                        <p class="text-[10px] font-black uppercase tracking-widest text-pink-100 truncate">Kategori</p>
                        <h3 class="text-xl md:text-2xl font-black mt-0.5 whitespace-nowrap truncate">{{ totalKategori }} Kategori</h3>
                    </div>
                </div>
            </div>

            <div v-if="activeTab === 'buku'" class="max-w-6xl mx-auto bg-white p-10 rounded-[3rem] shadow-2xl shadow-pink-200 border-4 border-pink-100 animate-fadeIn">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h2 class="text-4xl font-black text-pink-600 tracking-tighter">Manajemen Koleksi Komik & Buku</h2>
                        <p class="text-pink-400 font-bold mt-1 uppercase tracking-widest text-xs">Sirkulasi Data Koleksi Komik & Buku digital disini.</p>
                    </div>
                    <button @click="openModal('add')" class="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-2xl text-sm font-black shadow-lg shadow-pink-300 transition-all">
                        <span>➕</span> Tambah Buku Baru
                    </button>
                </div>

                <div class="overflow-hidden rounded-[2rem] border-2 border-pink-100">
                    <table class="w-full text-left">
                        <thead>
                            <tr class="bg-pink-100 text-pink-600 text-[10px] font-black uppercase tracking-widest">
                                <th class="p-6">Judul</th>
                                <th class="p-6">Penulis</th>
                                <th class="p-6">Genre ID</th>
                                <th class="p-6">Stok</th>
                                <th class="p-6 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-pink-50">
                            <tr v-for="buku in listBuku" :key="buku.id">
                                <td class="p-6 font-black">{{ buku.judul }}</td>
                                <td class="p-6">{{ buku.penulis }}</td>
                                <td class="p-6">
                                    <span class="bg-pink-50 text-pink-600 px-3 py-1.5 rounded-full text-xs font-bold border border-pink-100">
                                        ID {{ buku.kategori_id }}
                                    </span>
                                </td>
                                <td class="p-6">
                                    <span :class="buku.stok === 0 ? 'text-rose-600 font-black bg-rose-50 px-3 py-1 rounded-full' : 'text-gray-700'">
                                        {{ buku.stok }}
                                    </span>
                                </td>
                                <td class="p-6 text-center space-x-3">
                                    <button @click="openModal('edit', buku)" class="text-pink-500 font-black hover:underline">EDIT</button>
                                    <button @click="deleteBuku(buku.id)" class="text-rose-500 font-black hover:underline">HAPUS</button>
                                </td>
                            </tr>
                            <tr v-if="listBuku.length === 0">
                                <td colspan="5" class="p-6 text-center text-gray-400 font-bold italic">Belum ada data koleksi buku.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div v-if="activeTab === 'kategori'" class="max-w-6xl mx-auto bg-white p-10 rounded-[3rem] shadow-2xl shadow-pink-200 border-4 border-pink-100 animate-fadeIn">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h2 class="text-4xl font-black text-pink-600 tracking-tighter uppercase">Kelola Kategori</h2>
                        <p class="text-pink-400 font-bold mt-1 uppercase tracking-widest text-xs">Grup dan klasifikasi jenis komik di library.</p>
                    </div>
                    <button @click="openModalKategori('add')" class="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-2xl text-sm font-black shadow-lg shadow-pink-300 transition-all">
                        <span>➕</span> Tambah Kategori
                    </button>
                </div>

                <div class="overflow-hidden rounded-[2rem] border-2 border-pink-100">
                    <table class="w-full text-left">
                        <thead>
                            <tr class="bg-pink-100 text-pink-600 text-[10px] font-black uppercase tracking-widest">
                                <th class="p-6">ID</th>
                                <th class="p-6">Nama Kategori</th>
                                <th class="p-6 text-center">Opsi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-pink-50 text-sm font-semibold text-slate-700">
                            <tr v-for="kat in listKategori" :key="kat.id" class="hover:bg-pink-50/30 transition-colors">
                                <td class="p-6 font-bold text-slate-400">#{{ kat.id }}</td>
                                <td class="p-6 font-black text-pink-600 text-base">{{ kat.nama_kategori }}</td>
                                <td class="p-6 text-center space-x-3">
                                    <button @click="openModalKategori('edit', kat)" class="px-4 py-1.5 border-2 border-slate-200 hover:border-slate-400 text-slate-600 rounded-xl text-xs font-black transition-all">Edit</button>
                                    <button @click="deleteKategori(kat.id)" class="px-4 py-1.5 border-2 border-rose-100 hover:border-rose-400 text-rose-500 hover:bg-rose-50 rounded-xl text-xs font-black transition-all">Hapus</button>
                                </td>
                            </tr>
                            <tr v-if="listKategori.length === 0">
                                <td colspan="3" class="p-8 text-center text-gray-400 font-bold italic">Belum ada data kategori di database.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div v-if="activeTab !== 'kategori'" class="max-w-6xl mx-auto bg-white p-10 rounded-[3rem] shadow-2xl shadow-pink-200 border-4 border-pink-100">
                <div class="mb-6">
                    <h2 class="text-3xl font-black text-pink-600 tracking-tighter uppercase">Riwayat Peminjaman</h2>
                </div>
                <div class="overflow-hidden rounded-[2rem] border-2 border-pink-100">
                    <table class="w-full text-left">
                        <thead>
                            <tr class="bg-pink-100 text-pink-600 text-[10px] font-black uppercase tracking-widest">
                                <th class="p-6">Peminjam</th>
                                <th class="p-6">Judul Komik & Buku</th>
                                <th class="p-6">Tanggal</th>
                                <th class="p-6">Status</th>
                                <th class="p-6 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-pink-50">
                            <tr v-for="log in listPeminjaman" :key="log.id">
                                <td class="p-6 font-bold text-gray-800">{{ log.nama_peminjam }}</td>
                                <td class="p-6 font-medium text-pink-600">{{ log.judul }}</td>
                                <td class="p-6 text-pink-400">{{ log.tanggal_pinjam }}</td>
                                <td class="p-6">
                                    <span class="bg-pink-500 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider">
                                        {{ log.status }}
                                    </span>
                                </td>
                                <td class="p-6 text-center">
                                    <button v-if="log.status === 'Dipinjam'" @click="kembalikanBuku(log.id)" class="text-blue-500 font-black hover:underline">
                                        Kembalikan
                                    </button>
                                    <span v-else class="text-gray-400 text-sm font-bold">-</span>
                                </td>
                            </tr>
                            <tr v-if="listPeminjaman.length === 0">
                                <td colspan="5" class="p-6 text-center text-gray-400 font-bold">Belum ada riwayat peminjaman.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div v-if="showModal" class="fixed inset-0 bg-pink-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div class="bg-white w-full max-w-md p-10 rounded-[3rem] shadow-2xl">
                    <h3 class="text-2xl font-black text-pink-600 mb-6">{{ modalMode === 'add' ? 'Tambah' : 'Edit' }} Buku</h3>
                    <form @submit.prevent="saveBuku" class="space-y-4">
                        <input v-model="form.judul" placeholder="Judul" class="w-full px-5 py-4 bg-pink-50/70 border-2 border-pink-200 rounded-2xl outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 font-medium text-slate-700 placeholder:text-slate-400 text-sm transition-all shadow-inner" required>
                        <input v-model="form.penulis" placeholder="Penulis" class="w-full px-5 py-4 bg-pink-50/70 border-2 border-pink-200 rounded-2xl outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 font-medium text-slate-700 placeholder:text-slate-400 text-sm transition-all shadow-inner" required>
                        
                        <select v-model.number="form.kategori_id" class="w-full px-5 py-4 bg-pink-50/70 border-2 border-pink-200 rounded-2xl outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 font-bold text-slate-600 text-sm transition-all shadow-inner" required>
                            <option value="" disabled>Pilih Kategori / Genre</option>
                            <option v-for="kat in listKategori" :key="kat.id" :value="kat.id">
                                ID {{ kat.id }} - {{ kat.nama_kategori }}
                            </option>
                        </select>

                        <input v-model.number="form.stok" type="number" placeholder="Stok" class="w-full px-5 py-4 bg-pink-50/70 border-2 border-pink-200 rounded-2xl outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 font-medium text-slate-700 placeholder:text-slate-400 text-sm transition-all shadow-inner" required>
                        <div class="flex justify-end gap-5 pt-4 items-center">
                            <button @click="showModal = false" type="button" class="font-bold text-sm text-slate-400 hover:text-slate-600 tracking-wider uppercase">BATAL</button>
                            <button type="submit" class="px-8 py-3.5 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-bold text-sm shadow-md shadow-pink-200 transition-transform active:scale-95 tracking-wider uppercase">SIMPAN</button>
                        </div>
                    </form>
                </div>
            </div>

            <div v-if="showModalKategori" class="fixed inset-0 bg-pink-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div class="bg-white w-full max-w-md p-10 rounded-[3rem] shadow-2xl">
                    <h3 class="text-2xl font-black text-pink-600 mb-6">{{ modalKategoriMode === 'add' ? 'Tambah' : 'Edit' }} Kategori</h3>
                    <form @submit.prevent="saveKategori" class="space-y-4">
                        <input v-model="formKategori.nama_kategori" placeholder="Nama Kategori (Contoh: Romance, Action)" class="w-full px-5 py-4 bg-pink-50/70 border-2 border-pink-200 rounded-2xl outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 font-medium text-slate-700 placeholder:text-slate-400 text-sm transition-all shadow-inner" required>
                        <div class="flex justify-end gap-5 pt-4 items-center">
                            <button @click="showModalKategori = false" type="button" class="font-bold text-sm text-slate-400 hover:text-slate-600 tracking-wider uppercase">BATAL</button>
                            <button type="submit" class="px-8 py-3.5 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-bold text-sm shadow-md shadow-pink-200 transition-transform active:scale-95 tracking-wider uppercase">SIMPAN</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    `,
    data() {
        return { 
            listBuku: [], 
            listPeminjaman: [], 
            listKategori: [], 
            activeTab: 'buku', 
            showModal: false, 
            showModalKategori: false, 
            modalMode: 'add', 
            modalKategoriMode: 'add',
            form: { id: null, judul: '', penulis: '', kategori_id: '', stok: 0 },
            formKategori: { id: null, nama_kategori: '' }
        }
    },
    computed: {
        totalJudul() {
            return this.listBuku.length;
        },
        totalStok() {
            return this.listBuku.reduce((accum, item) => accum + (parseInt(item.stok) || 0), 0);
        },
        totalKosong() {
            return this.listBuku.filter(item => parseInt(item.stok) === 0).length;
        },
        totalKategori() {
            return this.listKategori.length;
        }
    },
    watch: {
        '$route.query.tab': {
            immediate: true,
            handler(newTab) {
                if (newTab === 'kategori') {
                    this.activeTab = 'kategori';
                } else {
                    this.activeTab = 'buku';
                }
            }
        }
    },
    mounted() { 
        this.fetchBuku(); 
        this.fetchRiwayatPeminjaman(); 
        this.fetchKategori(); 
    },
    methods: {
        // --- PROSES OLAH DATA BUKU ---
        async fetchBuku() {
            try {
                const res = await axios.get('http://localhost:8080/api/buku', {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                });
                this.listBuku = res.data;
            } catch (err) { console.error(err); }
        },
        async fetchRiwayatPeminjaman() {
            try {
                const res = await axios.get('http://localhost:8080/api/peminjaman', {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                });
                this.listPeminjaman = res.data;
            } catch (err) { console.error("Gagal mengambil log peminjaman:", err); }
        },
        openModal(mode, data = null) {
            this.modalMode = mode;
            this.form = data ? { ...data } : { id: null, judul: '', penulis: '', kategori_id: '', stok: 0 };
            this.showModal = true;
        },
        async saveBuku() {
            try {
                const isEdit = this.modalMode === 'edit';
                const url = isEdit ? 'http://localhost:8080/api/buku/' + this.form.id : 'http://localhost:8080/api/buku';
                const method = isEdit ? 'put' : 'post'; 
                
                await axios[method](url, this.form, {
                    headers: { 
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json' 
                    }
                });
                
                this.showModal = false;
                this.fetchBuku();
            } catch (err) {
                console.error("Error Detail:", err.response?.data);
                alert('Gagal: ' + (err.response?.data?.messages?.error || 'Periksa koneksi/token'));
            }
        },
        async deleteBuku(id) {
            if (confirm('Yakin ingin menghapus komik/buku?')) {
                try {
                    await axios.delete('http://localhost:8080/api/buku/' + id, {
                        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                    });
                    this.fetchBuku();
                } catch (err) { alert('Gagal menghapus'); }
            }
        },
        async kembalikanBuku(id) {
            try {
                await axios.put('http://localhost:8080/api/peminjaman/' + id, { status: 'Dikembalikan' }, {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                });
                this.fetchRiwayatPeminjaman();
                this.fetchBuku(); 
            } catch (err) { 
                alert('Gagal mengupdate status!'); 
                console.error(err);
            }
        },

        // --- PROSES OLAH DATA KATEGORI ---
        async fetchKategori() {
            try {
                const res = await axios.get('http://localhost:8080/api/kategori', {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                });
                this.listKategori = res.data;
            } catch (err) { console.error("Gagal memuat list kategori backend:", err); }
        },
        openModalKategori(mode, data = null) {
            this.modalKategoriMode = mode;
            this.formKategori = data ? { ...data } : { id: null, nama_kategori: '' };
            this.showModalKategori = true;
        },
        async saveKategori() {
            try {
                const isEdit = this.modalKategoriMode === 'edit';
                const url = isEdit ? 'http://localhost:8080/api/kategori/' + this.formKategori.id : 'http://localhost:8080/api/kategori';
                const method = isEdit ? 'put' : 'post';

                await axios[method](url, this.formKategori, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                });

                this.showModalKategori = false;
                this.fetchKategori();
            } catch (err) {
                console.error("Gagal memproses data kategori:", err.response?.data);
                alert('Gagal memproses data kategori.');
            }
        },
        async deleteKategori(id) {
            if (confirm('Yakin ingin menghapus kategori ini?')) {
                try {
                    await axios.delete('http://localhost:8080/api/kategori/' + id, {
                        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                    });
                    this.fetchKategori();
                } catch (err) { alert('Gagal menghapus kategori.'); }
            }
        }
    }
}