export default {
    template: `
        <div class="min-h-screen w-full flex items-center justify-center p-4 bg-[#fff1f2] font-sans bg-[radial-gradient(#fecdd3_1.5px,transparent_1.5px)] [background-size:24px_24px]">
            
            <div class="fixed inset-0 overflow-hidden pointer-events-none">
                <div class="absolute -top-24 -right-24 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-60"></div>
                <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-200 rounded-full blur-3xl opacity-60"></div>
            </div>

            <div class="relative z-10 w-full max-w-sm bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(244,114,182,0.2)] border border-pink-100">
                
                <div class="flex justify-center mb-8">
                    <div class="relative">
                        <div class="w-20 h-20 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full flex items-center justify-center shadow-lg shadow-pink-300/50">
                            <span class="text-3xl">🦋</span>
                        </div>
                        <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-pink-200"></div>
                    </div>
                </div>

                <div class="text-center mb-10">
                    <h2 class="text-2xl font-black text-pink-900 tracking-tight">Marsya’s Library</h2>
                    <p class="text-pink-400 text-xs font-semibold uppercase tracking-widest mt-2">Administrator Access</p>
                </div>

                <form @submit.prevent="submitLogin" class="space-y-5">
                    <div class="space-y-2">
                        <input v-model="username" type="text" 
                               class="w-full px-6 py-4 bg-pink-50/80 border-2 border-pink-300 rounded-2xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 shadow-inner text-pink-900 font-semibold placeholder:text-pink-400/80 transition-all" 
                               placeholder="Username" required>
                    </div>
                    
                    <div class="space-y-2">
                        <input v-model="password" type="password" 
                               class="w-full px-6 py-4 bg-pink-50/80 border-2 border-pink-300 rounded-2xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 shadow-inner text-pink-900 font-semibold placeholder:text-pink-400/80 transition-all" 
                               placeholder="Password" required>
                    </div>
                    
                    <button type="submit" 
                            class="w-full py-4 mt-4 bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl text-white font-bold text-sm hover:shadow-lg hover:shadow-pink-300 transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-wider">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    `,
    data() { return { username: '', password: '' } },
    methods: {
        async submitLogin() {
            try {
                const response = await axios.post('http://localhost:8080/api/auth/login', {
                    username: this.username,
                    password: this.password
                });
                if (response.data.token) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('token', response.data.token);
                    alert('Login Berhasil!');
                    this.$router.push('/dashboard');
                }
            } catch (error) {
                alert('Login Gagal, Coba Lagi.');
            }
        }
    }
}