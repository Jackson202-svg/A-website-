// Initialize Supabase
const _supabase = supabase.createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

// Sign In Function
async function signInWithGitHub() {
    const { data, error } = await _supabase.auth.signInWithOAuth({
        provider: 'github',
    });
    if (error) console.error('Login error:', error.message);
}

// Sign Out Function
async function signOut() {
    await _supabase.auth.signOut();
    window.location.reload();
}

// Check User Status on Load
async function checkUser() {
    const { data: { user } } = await _supabase.auth.getUser();
    const authSection = document.getElementById('auth-section');
    const userInfo = document.getElementById('user-info');

    if (user) {
        authSection.innerHTML = `<button onclick="signOut()">Logout</button>`;
        userInfo.innerHTML = `
            <img src="${user.user_metadata.avatar_url}" width="50" style="border-radius:50%">
            <p>Welcome back, ${user.user_metadata.full_name}!</p>
        `;
    }
}

checkUser();
