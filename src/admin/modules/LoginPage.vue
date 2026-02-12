<template>
  <div class="admin-login">
    <div class="login-card">
      <!-- Logo -->
      <div class="login-header">
        <svg width="48" height="48" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="8" fill="#1E40AF"/>
          <path d="M20 10L28 16V24L20 30L12 24V16L20 10Z" fill="#EF4444"/>
        </svg>
        <h1>Admin Panel</h1>
        <p>Secure access for authorized staff only</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="login">
        <div class="form-group">
          <label>Email</label>
          <input
            type="email"
            v-model="form.email"
            placeholder="admin@domain.com"
            required
          />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            v-model="form.password"
            placeholder="••••••••"
            required
          />
        </div>

        <button class="login-btn" :disabled="loading">
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <div class="login-footer">
        <router-link to="/">← Back to website</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const loading = ref(false)

const form = reactive({
  email: '',
  password: ''
})

const login = async () => {
  loading.value = true
  try {
    // API call here
    // await axios.post('/admin/login', form)

    console.log('Logging in', form)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.admin-login {
  min-height: 100vh;
  background: linear-gradient(135deg, #1E40AF, #1E3A8A);
  /* background-color: #e3eaff; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: 16px;
  padding: 40px 36px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-header h1 {
  margin: 16px 0 6px;
  font-size: 24px;
  font-weight: 700;
  color: #1E3A8A;
}

.login-header p {
  font-size: 14px;
  color: #64748b;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #334155;
}

.form-group input {
  width: 100%;
  padding: 14px 16px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 14px;
  outline: none;
}

.form-group input:focus {
  border-color: #1E40AF;
  box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
}

.login-btn {
  width: 100%;
  padding: 14px;
  background: #EF4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover {
  background: #DC2626;
  transform: translateY(-1px);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-footer {
  margin-top: 24px;
  text-align: center;
}

.login-footer a {
  font-size: 13px;
  color: #64748b;
  text-decoration: none;
}

.login-footer a:hover {
  color: #1E40AF;
}
</style>
