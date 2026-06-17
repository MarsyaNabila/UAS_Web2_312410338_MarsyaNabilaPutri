import BukuComponent from './Buku.js';



export default {

    components: {

        'buku-manager': BukuComponent

    },

    template: `

        <div class="min-h-screen bg-pink-100 p-4 md:p-8 space-y-8 font-sans">

           

            <!-- HEADER: SESUAI GAMBAR (LONJONG & PUTIH) -->

            <div class="bg-white p-8 rounded-[3rem] border-4 border-pink-200 shadow-xl flex justify-between items-center">

                <div>

                    <h1 class="text-4xl font-black text-pink-600 tracking-tighter uppercase">Katalog E-Library Marsya's Digital</h1>

                    <p class="text-pink-400 font-bold text-sm tracking-widest mt-1">Selamat datang! Cari, lihat ketersediaan stok, dan lakukkan simulasi peminjaman komik & buku favoritmu secara langsung.</p>

                </div>

                <div class="hidden md:block">

                    <span class="px-6 py-3 bg-pink-100 text-pink-600 rounded-full text-xs font-black uppercase tracking-widest border-2 border-pink-200">

                        STATUS: ONLINE

                    </span>

                </div>

            </div>



            <!-- STATS GRID: FULL PINK & LONJONG -->

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                <div class="bg-pink-500 p-8 rounded-[3rem] border-4 border-pink-400 shadow-xl flex items-center gap-5 text-white">

                    <div class="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center text-3xl">📚</div>

                    <div>

                        <span class="block text-[10px] font-black text-pink-200 uppercase tracking-widest">Total Judul</span>

                        <span class="text-2xl font-black">{{ totalJudul }} Koleksi</span>

                    </div>

                </div>

                <div class="bg-pink-500 p-8 rounded-[3rem] border-4 border-pink-400 shadow-xl flex items-center gap-5 text-white">

                    <div class="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center text-3xl">📦</div>

                    <div>

                        <span class="block text-[10px] font-black text-pink-200 uppercase tracking-widest">Total Stok</span>

                        <span class="text-2xl font-black">{{ totalStok }} Pcs</span>

                    </div>

                </div>

                <div class="bg-pink-500 p-8 rounded-[3rem] border-4 border-pink-400 shadow-xl flex items-center gap-5 text-white sm:col-span-2 lg:col-span-1">

                    <div class="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center text-3xl">⚠️</div>

                    <div>

                        <span class="block text-[10px] font-black text-pink-200 uppercase tracking-widest">Kosong</span>

                        <span class="text-2xl font-black">{{ totalKosong }} Judul</span>

                    </div>

                </div>

            </div>



            <!-- TABLE SECTION: FULL PINK -->

            <div class="bg-white rounded-[3rem] border-4 border-pink-200 shadow-2xl p-6 overflow-hidden">

                <h3 class="text-xl font-black text-pink-600 mb-6 uppercase p-2 tracking-widest ml-2">Riwayat Peminjaman</h3>

                <div class="overflow-x-auto">

                    <table class="w-full text-left">

                        <thead class="bg-pink-100 text-pink-600 text-[10px] font-black uppercase tracking-widest">

                            <tr>

                                <th class="p-5 rounded-tl-2xl">Peminjam</th>

                                <th class="p-5">Judul Komik & Buku</th>

                                <th class="p-5">Tanggal</th>

                                <th class="p-5 rounded-tr-2xl text-center">Status</th>

                            </tr>

                        </thead>

                        <tbody class="divide-y-2 divide-pink-50">

                            <tr v-for="log in listPeminjam" :key="log.id" class="hover:bg-pink-50">

                                <td class="p-5 font-black text-pink-900">{{ log.nama_peminjam }}</td>

                                <td class="p-5 font-bold text-pink-500">{{ log.judul }}</td>

                                <td class="p-5 font-bold text-pink-400">{{ log.tanggal_pinjam }}</td>

                                <td class="p-5 text-center">

                                    <span class="px-4 py-2 bg-pink-500 text-white rounded-full text-[10px] font-black uppercase">{{ log.status }}</span>

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>



            <buku-manager ref="bukuRef" @data-loaded="updateStatistik"></buku-manager>

        </div>

    `,

    data() {

        return {

            totalJudul: 0,

            totalStok: 0,

            totalKosong: 0,

            listPeminjam: []

        }

    },

    methods: {

        updateStatistik() {

            const listData = this.$refs.bukuRef?.listBuku || [];

            if (listData.length > 0) {

                this.totalJudul = listData.length;

                this.totalStok = listData.reduce((acc, curr) => acc + (parseInt(curr.stok) || 0), 0);

                this.totalKosong = listData.filter(buku => (parseInt(buku.stok) || 0) <= 0).length;

            }

        },

        async fetchLogPeminjaman() {

            try {

                const response = await axios.get('http://localhost:8080/api/peminjaman');

                this.listPeminjam = response.data;

            } catch (error) { console.error("Gagal memuat log:", error); }

        }

    },

    mounted() {

        this.fetchLogPeminjaman();

        setTimeout(this.updateStatistik, 800);

    }

}

