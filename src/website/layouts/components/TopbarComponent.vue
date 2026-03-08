<template>
  <div class="topbar">
    <div class="container">
      <div class="topbar-content">
        <!-- Left Side - Contact Info -->
        <div class="contact-info">
          <a 
            v-if="systemSettings.phone" 
            :href="`tel:${systemSettings.phone}`" 
            class="contact-item"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>{{ systemSettings.phone }}</span>
          </a>
          <a 
            v-if="systemSettings.email" 
            :href="`mailto:${systemSettings.email}`" 
            class="contact-item"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span>{{ systemSettings.email }}</span>
          </a>
          <a 
            v-if="systemSettings.whatsapp" 
            :href="`https://wa.me/${systemSettings.whatsapp.replace(/[^0-9]/g, '')}`" 
            target="_blank"
            rel="noopener noreferrer"
            class="contact-item"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>

        <!-- Center - Announcements/Offers -->
        <div v-if="offers.length > 0" class="announcement">
          <transition name="fade" mode="out-in">
            <div :key="currentOffer" class="announcement-text">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="announcement-icon">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              {{ offers[currentOffer].offer_details }}
            </div>
          </transition>
        </div>
        <div v-else-if="systemSettings.tagline" class="announcement">
          <div class="announcement-text">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="announcement-icon">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            {{ systemSettings.tagline }}
          </div>
        </div>

        <!-- Right Side - Social & Quick Links -->
        <div class="quick-links">
          <a 
            v-if="systemSettings.facebook" 
            :href="systemSettings.facebook" 
            target="_blank"
            rel="noopener noreferrer"
            class="social-link" 
            aria-label="Facebook"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a 
            v-if="systemSettings.twitter" 
            :href="systemSettings.twitter" 
            target="_blank"
            rel="noopener noreferrer"
            class="social-link" 
            aria-label="Twitter"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
            </svg>
          </a>
          <a 
            v-if="systemSettings.linkedin" 
            :href="systemSettings.linkedin" 
            target="_blank"
            rel="noopener noreferrer"
            class="social-link" 
            aria-label="LinkedIn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a 
            v-if="systemSettings.instagram" 
            :href="systemSettings.instagram" 
            target="_blank"
            rel="noopener noreferrer"
            class="social-link" 
            aria-label="Instagram"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4" fill="white"/>
              <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
            </svg>
          </a>
          <!-- <router-link to="/login" class="login-link">Student Portal</router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';

// API Configuration
const apiBase = ref(process.env.VUE_APP_BASE_API);

// State
const systemSettings = ref({
  phone: '',
  email: '',
  whatsapp: '',
  tagline: '',
  facebook: '',
  twitter: '',
  linkedin: '',
  instagram: ''
});

const offers = ref([]);
const currentOffer = ref(0);
let intervalId = null;

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

const loadOffers = async () => {
  try {
    const response = await axios.get(`${apiBase.value}/offers`);
    if (response.data && response.data.offers) {
      offers.value = response.data.offers;
      if (offers.value.length > 0) {
        startOfferRotation();
      }
    }
  } catch (error) {
    console.error('Failed to load offers:', error);
  }
};

const startOfferRotation = () => {
  if (offers.value.length <= 1) return;
  
  intervalId = setInterval(() => {
    currentOffer.value = (currentOffer.value + 1) % offers.value.length;
  }, 5000); // Change every 5 seconds
};

const stopOfferRotation = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

// Lifecycle
onMounted(() => {
  loadSystemSettings();
  loadOffers();
});

onBeforeUnmount(() => {
  stopOfferRotation();
});
</script>

<style scoped>
.topbar {
  background: #EF4444;
  color: white;
  font-size: 13px;
  border-bottom: 2px solid #DC2626;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.topbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  gap: 20px;
}

.contact-info {
  display: flex;
  gap: 24px;
  align-items: center;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: white;
  text-decoration: none;
  transition: opacity 0.3s ease;
  white-space: nowrap;
}

.contact-item:hover {
  opacity: 0.8;
}

.announcement {
  flex: 1;
  text-align: center;
  overflow: hidden;
  max-width: 500px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.announcement-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.announcement-icon {
  flex-shrink: 0;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.quick-links {
  display: flex;
  align-items: center;
  gap: 16px;
}

.social-link {
  color: white;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  text-decoration: none;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.login-link {
  color: white;
  text-decoration: none;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
  white-space: nowrap;
}

.login-link:hover {
  background: rgba(255, 255, 255, 0.25);
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .contact-info {
    gap: 16px;
  }

  .contact-item span {
    display: none;
  }

  .announcement {
    font-size: 12px;
  }

  .quick-links {
    gap: 12px;
  }
}

@media (max-width: 768px) {
  .topbar-content {
    justify-content: center;
  }

  .contact-info {
    display: none;
  }

  .quick-links {
    display: none;
  }

  .announcement {
    max-width: 100%;
  }

  .announcement-text {
    font-size: 12px;
  }
}
</style>