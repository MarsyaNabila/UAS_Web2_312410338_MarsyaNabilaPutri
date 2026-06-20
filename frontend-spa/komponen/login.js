export default {
    template: `
        <div class="min-h-screen w-full flex items-center justify-center p-4 bg-[#fff1f2] font-sans relative overflow-hidden bg-[radial-gradient(#fecdd3_1.5px,transparent_1.5px)] [background-size:24px_24px]">
            
            <div class="fixed inset-0 overflow-hidden pointer-events-none">
                <div class="absolute -top-24 -right-24 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-60"></div>
                <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-200 rounded-full blur-3xl opacity-60"></div>
            </div>

            <div class="relative z-10 w-full max-w-[370px] bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-[3rem] shadow-[0_25px_60px_rgba(244,114,182,0.22)] border-2 border-white/80 text-center transform transition-all duration-300">
                
                <div class="flex justify-center mb-6">
                    <div class="relative inline-block group">
                        <div class="absolute inset-0 bg-gradient-to-tr from-pink-400 to-rose-400 rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity"></div>
                        
                        <div class="relative w-20 h-20 bg-gradient-to-tr from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-md border-4 border-white transform transition-transform duration-500 group-hover:rotate-[360deg]">
                            <span class="text-3xl filter drop-shadow">🦋</span>
                        </div>
                        <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-full flex items-center justify-center shadow-md border-2 border-white">
                            <span class="text-[10px] animate-spin" style="animation-duration: 3s;">✨</span>
                        </div>
                    </div>
                </div>

                <div class="text-center mb-8">
                    <h2 class="text-2xl font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent tracking-tight">Marsya’s Library</h2>
                    <div class="inline-flex items-center gap-1.5 mt-2 px-3 py-0.5 bg-pink-500/10 rounded-full border border-pink-500/20">
                        <span class="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse"></span>
                        <p class="text-pink-600 text-[9px] font-black uppercase tracking-widest">Administrator Access</p>
                    </div>
                </div>

                <div v-if="errorMessage" class="mb-5 p-3.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-xs font-bold text-left flex items-start gap-2 shadow-sm animate-fadeIn">
                    <span class="mt-0.5">⚠️</span> 
                    <span>{{ errorMessage }}</span>
                </div>

                <form @submit.prevent="submitLogin" class="space-y-4 text-left">
                    <div class="relative group">
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-base text-pink-400 group-focus-within:text-pink-600 transition-colors">👤</span>
                        <input v-model="username" type="text" 
                               class="w-full pl-11 pr-5 py-3.5 bg-pink-50/40 border-2 border-pink-200 rounded-2xl outline-none focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100 font-bold text-pink-900 placeholder:text-pink-300 transition-all text-sm shadow-inner" 
                               placeholder="Username" required>
                    </div>
                    
                    <div class="relative group">
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-base text-pink-400 group-focus-within:text-pink-600 transition-colors">🔑</span>
                        <input v-model="password" type="password" 
                               class="w-full pl-11 pr-5 py-3.5 bg-pink-50/40 border-2 border-pink-200 rounded-2xl outline-none focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100 font-bold text-pink-900 placeholder:text-pink-300 transition-all text-sm shadow-inner" 
                               placeholder="Password" required>
                    </div>
                    
                    <button type="submit" :disabled="isLoading"
                            class="w-full py-4 mt-4 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 rounded-2xl text-white font-black text-sm shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300/60 active:scale-[0.97] hover:-translate-y-0.5 transition-all duration-200 uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50">
                        <span v-if="isLoading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>{{ isLoading ? 'Memproses...' : 'Log In Masuk' }}</span>
                    </button>
                </form>

                <div class="mt-8 pt-4 border-t border-pink-50">
                    <p class="text-pink-300 text-[9px] font-black tracking-widest uppercase">&copy; 2026 E-Library System</p>
                </div>
            </div>
        </div>
    `,
    data() { 
        return { 
            username: '', 
            password: '',
            errorMessage: '', // State penampung error
            isLoading: false  // State loading spinner
        } 
    },
    mounted() {
        // Injeksi animasi fade-in sederhana untuk memunculkan pesan error secara smooth
        const styleId = 'login-essential-animation';
        if (!document.getElementById(styleId)) {
            const styleEl = document.createElement('style');
            styleEl.id = styleId;
            styleEl.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-4px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 0.25s ease-out forwards; }
            `;
            document.head.appendChild(styleEl);
        }
    },
    methods: {
        async submitLogin() {
            this.errorMessage = '';
            this.isLoading = true;
            try {
                const response = await axios.post('http://localhost:8080/api/auth/login', {
                    username: this.username,
                    password: this.password
                });
                if (response.data.token) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('token', response.data.token);
                    this.$router.push('/dashboard');
                }
            } catch (error) {
                // Mengambil pesan error dari backend CodeIgniter, jika gagal pakai fallback default
                this.errorMessage = error.response?.data?.messages?.error || 'Login gagal! Username atau password salah.';
            } finally {
                this.isLoading = false;
            }
        }
    }
}