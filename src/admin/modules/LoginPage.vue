<template>
  <div class="admin-login">
    <div class="login-card">
      <!-- Logo -->
      <div class="login-header">
        <div class="logo-container" v-if="systemData && systemData.logo">
          <img :src="getLogoUrl(systemData.logo)" :alt="systemData.brand_name" class="brand-logo" />
        </div>
        <svg v-else width="48" height="48" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="8" fill="#1E40AF"/>
          <path d="M20 10L28 16V24L20 30L12 24V16L20 10Z" fill="#EF4444"/>
        </svg>
        <h1>{{ systemData?.brand_name || 'Admin Panel' }}</h1>
        <p>{{ systemData?.tagline || 'Secure access for authorized staff only' }}</p>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="error-alert">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="success-alert">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <span>{{ successMessage }}</span>
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
            :disabled="loading"
          />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            v-model="form.password"
            placeholder="••••••••"
            required
            :disabled="loading"
          />
        </div>
        <button class="login-btn" type="submit" :disabled="loading">
          <span v-if="!loading">Sign In</span>
          <span v-else class="loading-spinner">
            <svg class="spinner" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="4" fill="none"/>
            </svg>
            Signing in...
          </span>
        </button>
      </form>
      <div class="login-footer">
        <router-link to="/">← Back to website</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import axios from 'axios'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const systemData = ref(null)

const form = reactive({
  email: '',
  password: ''
})

// Fetch system settings for logo and brand name
const fetchSystemSettings = async () => {
  try {
    const response = await axios.get(process.env.VUE_APP_BASE_API+'/system')
    if (response.data && response.data.system) {
      systemData.value = response.data.system
    }
  } catch (error) {
    console.error('Error fetching system settings:', error)
  }
}

const getLogoUrl = (path) => {
  if (!path) return ''
  return process.env.VUE_APP_BASE_URL+`/${path}`
}

const login = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await axios.post(process.env.VUE_APP_BASE_API+'/login', {
      email: form.email,
      password: form.password
    })

    console.log('Login Response:', response.data)

    if (response.data && response.data.token) {
      // Store token and user data
      authStore.login(response.data.token)
      
      // Show success message
      successMessage.value = response.data.message || 'Login successful!'
      
      // Redirect to admin dashboard after a short delay
      setTimeout(() => {
        router.push('/admin/dashboard')
      }, 1000)
    } else {
      errorMessage.value = 'Invalid response from server. Please try again.'
    }
  } catch (error) {
    console.error('Login Error:', error)
    
    if (error.response) {
      // Server responded with error
      if (error.response.status === 401) {
        errorMessage.value = 'Invalid email or password. Please try again.'
      } else if (error.response.status === 422) {
        // Validation errors
        const errors = error.response.data.errors
        if (errors) {
          const errorMessages = Object.values(errors).flat()
          errorMessage.value = errorMessages.join(', ')
        } else {
          errorMessage.value = error.response.data.message || 'Validation failed.'
        }
      } else {
        errorMessage.value = error.response.data.message || 'Login failed. Please try again.'
      }
    } else if (error.request) {
      errorMessage.value = 'Unable to connect to server. Please check your connection.'
    } else {
      errorMessage.value = 'An unexpected error occurred. Please try again.'
    }
  } finally {
    loading.value = false
  }
}

// Check if user is already authenticated
onMounted(() => {
  fetchSystemSettings()
  
  // If already logged in, redirect to dashboard
  if (authStore.isAuthenticated) {
    router.push('/admin/dashboard')
  }
})
</script>

<style scoped>
.admin-login {
  min-height: 100vh;
  background: linear-gradient(135deg, #1E40AF, #1E3A8A);
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

.logo-container {
  display: inline-block;
  margin-bottom: 16px;
}

.brand-logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
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

/* Alert Messages */
.error-alert,
.success-alert {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
}

.error-alert {
  background: #FEE2E2;
  border: 1px solid #EF4444;
  color: #DC2626;
}

.success-alert {
  background: #D1FAE5;
  border: 1px solid #10B981;
  color: #059669;
}

.error-alert svg,
.success-alert svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* Form */
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
  transition: all 0.3s ease;
}

.form-group input:focus {
  border-color: #1E40AF;
  box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
}

.form-group input:disabled {
  background: #f1f5f9;
  cursor: not-allowed;
}

.login-btn {
  width: 100%;
  padding: 14px;
  background: #EF4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover:not(:disabled) {
  background: #DC2626;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.spinner {
  width: 18px;
  height: 18px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.login-footer {
  margin-top: 24px;
  text-align: center;
}

.login-footer a {
  font-size: 13px;
  color: #64748b;
  text-decoration: none;
  transition: color 0.3s ease;
}

.login-footer a:hover {
  color: #1E40AF;
}

/* Responsive */
@media (max-width: 480px) {
  .login-card {
    padding: 32px 24px;
  }

  .login-header h1 {
    font-size: 20px;
  }

  .brand-logo {
    width: 64px;
    height: 64px;
  }
}
</style>