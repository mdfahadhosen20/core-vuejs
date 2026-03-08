<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <router-link to="/" class="logo">
          <!-- If Logo Exists -->
          <template v-if="hasLogo">
            <img 
              :src="`${urlBase}/${systemSettings.logo}`" 
              :alt="systemSettings.brand_name"
              class="logo-img"
              @error="handleLogoError"
            />
          </template>

          <!-- If Logo NOT Exists -->
          <template v-else>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="8" fill="#1E40AF"/>
              <path d="M20 10L28 16V24L20 30L12 24V16L20 10Z" fill="#EF4444"/>
              <path d="M20 15L24 17.5V22.5L20 25L16 22.5V17.5L20 15Z" fill="white"/>
            </svg>

            <span class="logo-text">
              {{ systemSettings.brand_name || 'Edu Nexus BD' }}
            </span>
          </template>
        </router-link>

        <!-- Navigation -->
        <nav class="nav">
          <router-link to="/" class="nav-link">Home</router-link>
          <!-- <router-link to="/countries" class="nav-link">Countries</router-link>
          <router-link to="/services" class="nav-link">Services</router-link>
          <router-link to="/about" class="nav-link">About Us</router-link> -->
          <router-link to="/faq" class="nav-link">FAQ</router-link>
          <router-link to="/contact" class="nav-link">Contact</router-link>
        </nav>

        <!-- CTA Button — now opens modal instead of linking -->
        <button class="cta-button" @click="appointmentModalOpen = true">
          Book An Appointment
        </button>

        <!-- Mobile Menu Toggle -->
        <button class="mobile-menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
          <span :class="['hamburger', { active: menuOpen }]"></span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition name="slide">
        <nav v-if="menuOpen" class="mobile-nav">
          <router-link to="/" class="mobile-nav-link" @click="closeMenu">Home</router-link>
          <!-- <router-link to="/programs" class="mobile-nav-link" @click="closeMenu">Programs</router-link>
          <router-link to="/countries" class="mobile-nav-link" @click="closeMenu">Countries</router-link>
          <router-link to="/services" class="mobile-nav-link" @click="closeMenu">Services</router-link>
          <router-link to="/about" class="mobile-nav-link" @click="closeMenu">About Us</router-link> -->
          <router-link to="/faq" class="mobile-nav-link" @click="closeMenu">FAQ</router-link>
          <router-link to="/contact" class="mobile-nav-link" @click="closeMenu">Contact</router-link>
          
          <!-- Mobile Social Links -->
          <div v-if="hasSocialLinks" class="mobile-social">
            <a 
              v-if="systemSettings.facebook" 
              :href="systemSettings.facebook" 
              target="_blank"
              rel="noopener noreferrer"
              class="mobile-social-link"
              aria-label="Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a 
              v-if="systemSettings.twitter" 
              :href="systemSettings.twitter" 
              target="_blank"
              rel="noopener noreferrer"
              class="mobile-social-link"
              aria-label="Twitter"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
              </svg>
            </a>
            <a 
              v-if="systemSettings.instagram" 
              :href="systemSettings.instagram" 
              target="_blank"
              rel="noopener noreferrer"
              class="mobile-social-link"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4" fill="white"/>
              </svg>
            </a>
            <a 
              v-if="systemSettings.linkedin" 
              :href="systemSettings.linkedin" 
              target="_blank"
              rel="noopener noreferrer"
              class="mobile-social-link"
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>

          <!-- Mobile CTA — opens modal -->
          <button
            class="mobile-cta-button"
            @click="openModalFromMobile"
          >
            Book An Appointment
          </button>
        </nav>
      </transition>
    </div>
  </header>

  <!-- Appointment Modal — teleports to <body> so it sits outside the header -->
  <AppointmentModal v-model="appointmentModalOpen" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import AppointmentModal from '../../components/AppointmentModal.vue';

// API Configuration
const apiBase = ref(process.env.VUE_APP_BASE_API);
const urlBase = ref(process.env.VUE_APP_BASE_URL);

// State
const menuOpen = ref(false);
const appointmentModalOpen = ref(false);

const systemSettings = ref({
  brand_name: '',
  logo: '',
  phone: '',
  facebook: '',
  twitter: '',
  instagram: '',
  linkedin: ''
});

// Computed
const hasSocialLinks = computed(() => {
  return systemSettings.value.facebook || 
         systemSettings.value.twitter || 
         systemSettings.value.instagram || 
         systemSettings.value.linkedin;
});

const hasLogo = computed(() => {
  const logo = systemSettings.value.logo
  return logo && logo.trim() !== ''
})

// Methods
const loadSystemSettings = async () => {
  try {
    const response = await axios.get(`${apiBase.value}/system`);
    if (response.data && response.data.system) {
      systemSettings.value = response.data.system;
    }
  } catch (error) {
    console.error('Failed to load system settings:', error);
  }
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  document.body.style.overflow = menuOpen.value ? 'hidden' : '';
};

const closeMenu = () => {
  menuOpen.value = false;
  document.body.style.overflow = '';
};

const openModalFromMobile = () => {
  closeMenu();
  setTimeout(() => { appointmentModalOpen.value = true; }, 200);
};

const handleLogoError = (event) => {
  console.error('Failed to load logo:', event.target.src);
  event.target.style.display = 'none';
};

// Lifecycle
onMounted(() => {
  loadSystemSettings();
});
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  text-decoration: none;
}

.logo-img {
  width: 100% !important;
  object-fit: contain;
  border-radius: 8px;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  color: white;
  letter-spacing: -0.5px;
}

.nav {
  display: flex;
  gap: 32px;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: #EF4444;
  transition: width 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #FCA5A5;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.cta-button {
  background: #EF4444;
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.cta-button:hover {
  background: #DC2626;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4);
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 1001;
}

.hamburger {
  display: block;
  width: 28px;
  height: 2px;
  background: white;
  position: relative;
  transition: all 0.3s ease;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 28px;
  height: 2px;
  background: white;
  transition: all 0.3s ease;
}

.hamburger::before { top: -8px; }
.hamburger::after  { bottom: -8px; }

.hamburger.active { background: transparent; }
.hamburger.active::before { top: 0; transform: rotate(45deg); }
.hamburger.active::after  { bottom: 0; transform: rotate(-45deg); }

.mobile-nav { display: none; }

/* Transitions */
.slide-enter-active, .slide-leave-active { transition: all 0.3s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-10px); }

/* Responsive */
@media (max-width: 1024px) {
  .nav { gap: 24px; }
  .nav-link { font-size: 14px; }
}

@media (max-width: 768px) {
  .nav,
  .cta-button {
    display: none;
  }

  .mobile-menu-toggle { display: block; }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 20px 0;
    background: #1E3A8A;
    border-radius: 12px;
    margin-top: 12px;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
  }

  .mobile-nav-link {
    color: white;
    text-decoration: none;
    font-weight: 500;
    padding: 12px 20px;
    transition: all 0.3s ease;
    border-radius: 8px;
  }

  .mobile-nav-link:hover,
  .mobile-nav-link.router-link-active {
    background: rgba(239, 68, 68, 0.1);
    color: #FCA5A5;
  }

  .mobile-social {
    display: flex;
    gap: 12px;
    padding: 12px 20px;
    justify-content: center;
    border-top: 1px solid rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.1);
    margin: 8px 0;
  }

  .mobile-social-link {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: all 0.3s ease;
  }

  .mobile-social-link:hover {
    background: #EF4444;
    transform: scale(1.1);
  }

  .mobile-cta-button {
    background: #EF4444;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 600;
    margin: 8px 20px 0;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    font-size: 15px;
  }

  .mobile-cta-button:hover { background: #DC2626; }
}

@media (max-width: 480px) {
  .logo-text { font-size: 18px; }
  .logo-img { width: 32px; height: 32px; }
  .header-content { height: 70px; }
}
</style>

<style scoped>
.header {
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  text-decoration: none;
}

.logo-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 8px;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  color: white;
  letter-spacing: -0.5px;
}

.nav {
  display: flex;
  gap: 32px;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: #EF4444;
  transition: width 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #FCA5A5;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.cta-button {
  background: #EF4444;
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.cta-button:hover {
  background: #DC2626;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4);
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 1001;
}

.hamburger {
  display: block;
  width: 28px;
  height: 2px;
  background: white;
  position: relative;
  transition: all 0.3s ease;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 28px;
  height: 2px;
  background: white;
  transition: all 0.3s ease;
}

.hamburger::before { top: -8px; }
.hamburger::after  { bottom: -8px; }

.hamburger.active { background: transparent; }
.hamburger.active::before { top: 0; transform: rotate(45deg); }
.hamburger.active::after  { bottom: 0; transform: rotate(-45deg); }

.mobile-nav { display: none; }

.slide-enter-active, .slide-leave-active { transition: all 0.3s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-10px); }

@media (max-width: 1024px) {
  .nav { gap: 24px; }
  .nav-link { font-size: 14px; }
}

@media (max-width: 768px) {
  .nav, .cta-button { display: none; }
  .mobile-menu-toggle { display: block; }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 20px 0;
    background: #1E3A8A;
    border-radius: 12px;
    margin-top: 12px;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
  }

  .mobile-nav-link {
    color: white;
    text-decoration: none;
    font-weight: 500;
    padding: 12px 20px;
    transition: all 0.3s ease;
    border-radius: 8px;
  }

  .mobile-nav-link:hover,
  .mobile-nav-link.router-link-active {
    background: rgba(239, 68, 68, 0.1);
    color: #FCA5A5;
  }

  .mobile-social {
    display: flex;
    gap: 12px;
    padding: 12px 20px;
    justify-content: center;
    border-top: 1px solid rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.1);
    margin: 8px 0;
  }

  .mobile-social-link {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: all 0.3s ease;
  }

  .mobile-social-link:hover {
    background: #EF4444;
    transform: scale(1.1);
  }

  .mobile-cta-button {
    background: #EF4444;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 600;
    margin: 8px 20px 0;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    font-size: 15px;
  }

  .mobile-cta-button:hover { background: #DC2626; }
}

@media (max-width: 480px) {
  .logo-text { font-size: 18px; }
  .logo-img { width: 32px; height: 32px; }
  .header-content { height: 70px; }
}
</style>