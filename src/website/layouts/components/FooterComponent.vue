<template>
  <footer class="footer">
    <!-- Main Footer -->
    <div class="footer-main">
      <div class="container">
        <div class="footer-grid">
          <!-- Company Info -->
          <div class="footer-column">
            <div class="footer-logo">
              <img 
                v-if="systemSettings.logo" 
                :src="`${urlBase}/${systemSettings.logo}`" 
                :alt="systemSettings.brand_name"
                class="footer-logo-img"
                @error="handleLogoError"
              />
              <svg v-else width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="8" fill="#1E40AF"/>
                <path d="M20 10L28 16V24L20 30L12 24V16L20 10Z" fill="#EF4444"/>
                <path d="M20 15L24 17.5V22.5L20 25L16 22.5V17.5L20 15Z" fill="white"/>
              </svg>
              <span class="footer-logo-text">{{ systemSettings.brand_name || 'StudentConsult' }}</span>
            </div>
            <p class="footer-description">
              {{ systemSettings.short_description || 'Empowering students to achieve their academic and career goals through expert guidance and personalized consulting services.' }}
            </p>
            <div v-if="hasSocialLinks" class="social-links">
              <a 
                v-if="systemSettings.facebook" 
                :href="systemSettings.facebook" 
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon" 
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
                class="social-icon" 
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
                class="social-icon" 
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="#1E3A8A"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#1E3A8A" stroke-width="2"/>
                </svg>
              </a>
              <a 
                v-if="systemSettings.linkedin" 
                :href="systemSettings.linkedin" 
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon" 
                aria-label="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a 
                v-if="systemSettings.youtube" 
                :href="systemSettings.youtube" 
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon" 
                aria-label="YouTube"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#1E3A8A"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Services -->
          <div class="footer-column">
            <h3 class="footer-title">Our Services</h3>
            <ul class="footer-links">
              <li><router-link to="/services/academic-counseling">Academic Counseling</router-link></li>
              <li><router-link to="/services/career-guidance">Career Guidance</router-link></li>
              <li><router-link to="/services/university-admissions">University Admissions</router-link></li>
              <li><router-link to="/services/visa-assistance">Visa Assistance</router-link></li>
              <li><router-link to="/services/test-preparation">Test Preparation</router-link></li>
              <li><router-link to="/services/scholarship-search">Scholarship Search</router-link></li>
            </ul>
          </div>

          <!-- Quick Links -->
          <div class="footer-column">
            <h3 class="footer-title">Quick Links</h3>
            <ul class="footer-links">
              <li><router-link to="/about">About Us</router-link></li>
              <li><router-link to="/team">Our Team</router-link></li>
              <li><router-link to="/success-stories">Success Stories</router-link></li>
              <li><router-link to="/blog">Blog & Resources</router-link></li>
              <li><router-link to="/faq">FAQ</router-link></li>
              <li><router-link to="/contact">Contact Us</router-link></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div class="footer-column">
            <h3 class="footer-title">Contact Us</h3>
            <ul class="contact-list">
              <li v-if="systemSettings.address || systemSettings.city" class="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>
                  {{ systemSettings.address }}<br v-if="systemSettings.address && systemSettings.city" />
                  <template v-if="systemSettings.city">
                    {{ systemSettings.city }}<template v-if="systemSettings.state">, {{ systemSettings.state }}</template>
                    <template v-if="systemSettings.zip_code"> {{ systemSettings.zip_code }}</template>
                  </template>
                  <br v-if="systemSettings.country" />
                  {{ systemSettings.country }}
                </span>
              </li>
              <li v-if="systemSettings.phone" class="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <div>
                  <a :href="`tel:${systemSettings.phone}`" class="contact-link">{{ systemSettings.phone }}</a>
                  <br v-if="systemSettings.alternate_phone" />
                  <a v-if="systemSettings.alternate_phone" :href="`tel:${systemSettings.alternate_phone}`" class="contact-link">
                    {{ systemSettings.alternate_phone }}
                  </a>
                </div>
              </li>
              <li v-if="systemSettings.email" class="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <a :href="`mailto:${systemSettings.email}`" class="contact-link">{{ systemSettings.email }}</a>
              </li>
              <li v-if="systemSettings.business_hours" class="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span v-html="formatBusinessHours(systemSettings.business_hours)"></span>
              </li>
              <li v-else class="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>Mon - Fri: 9:00 AM - 6:00 PM<br>Sat: 10:00 AM - 4:00 PM</span>
              </li>
              <li v-if="systemSettings.whatsapp" class="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
                <a 
                  :href="`https://wa.me/${systemSettings.whatsapp.replace(/[^0-9]/g, '')}`" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="contact-link"
                >
                  WhatsApp: {{ systemSettings.whatsapp }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Newsletter Section -->
    <div v-if="systemSettings.enable_newsletter" class="newsletter-section">
      <div class="container">
        <div class="newsletter-content">
          <div class="newsletter-text">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for the latest education tips and opportunities</p>
          </div>
          <form class="newsletter-form" @submit.prevent="handleSubscribe">
            <input 
              type="email" 
              v-model="email"
              placeholder="Enter your email address" 
              class="newsletter-input"
              :disabled="submitting"
              required
            />
            <button type="submit" class="newsletter-button" :disabled="submitting">
              <span v-if="submitting">
                <div class="spinner-small"></div>
              </span>
              <span v-else>Subscribe</span>
            </button>
          </form>
        </div>
        <p v-if="subscriptionMessage" :class="['subscription-message', subscriptionType]">
          {{ subscriptionMessage }}
        </p>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <div class="container">
        <div class="footer-bottom-content">
          <p class="copyright">
            {{ systemSettings.copyright || `© ${currentYear} ${systemSettings.brand_name || 'StudentConsult'}. All rights reserved.` }}
          </p>
          <!-- <div class="footer-bottom-links">
            <router-link to="/privacy-policy">Privacy Policy</router-link>
            <span class="divider">|</span>
            <router-link to="/terms-of-service">Terms of Service</router-link>
            <span class="divider">|</span>
            <router-link to="/cookie-policy">Cookie Policy</router-link>
          </div> -->
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// API Configuration
const apiBase = ref(process.env.VUE_APP_BASE_API);
const urlBase = ref(process.env.VUE_APP_BASE_URL);

// State
const systemSettings = ref({
  brand_name: '',
  logo: '',
  short_description: '',
  email: '',
  phone: '',
  alternate_phone: '',
  whatsapp: '',
  address: '',
  city: '',
  state: '',
  zip_code: '',
  country: '',
  facebook: '',
  twitter: '',
  instagram: '',
  linkedin: '',
  youtube: '',
  business_hours: '',
  copyright: '',
  enable_newsletter: false
});

const email = ref('');
const submitting = ref(false);
const subscriptionMessage = ref('');
const subscriptionType = ref('success'); // 'success' or 'error'
const currentYear = new Date().getFullYear();

// Computed
const hasSocialLinks = computed(() => {
  return systemSettings.value.facebook || 
         systemSettings.value.twitter || 
         systemSettings.value.instagram || 
         systemSettings.value.linkedin || 
         systemSettings.value.youtube;
});

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

const handleSubscribe = async () => {
  if (!email.value || submitting.value) return;
  
  submitting.value = true;
  subscriptionMessage.value = '';
  
  try {
    await axios.post(`${apiBase.value}/subscription`, {
      email: email.value
    });
    
    subscriptionMessage.value = 'Thank you for subscribing! Check your email for confirmation.';
    subscriptionType.value = 'success';
    email.value = '';
    
    // Clear message after 5 seconds
    setTimeout(() => {
      subscriptionMessage.value = '';
    }, 5000);
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    if (error.response?.data?.message) {
      subscriptionMessage.value = error.response.data.message;
    } else {
      subscriptionMessage.value = 'Subscription failed. Please try again later.';
    }
    
    subscriptionType.value = 'error';
    
    // Clear error message after 5 seconds
    setTimeout(() => {
      subscriptionMessage.value = '';
    }, 5000);
    
  } finally {
    submitting.value = false;
  }
};

const handleLogoError = (event) => {
  console.error('Failed to load logo:', event.target.src);
  event.target.style.display = 'none';
};

const formatBusinessHours = (hours) => {
  if (!hours) return '';
  // Replace newlines with <br> tags for proper display
  return hours.replace(/\n/g, '<br>');
};

// Lifecycle
onMounted(() => {
  loadSystemSettings();
});
</script>

<style scoped>
.footer {
  background: linear-gradient(180deg, #1E3A8A 0%, #1E40AF 100%);
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Main Footer */
.footer-main {
  padding: 60px 0 40px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 40px;
}

.footer-column {
  display: flex;
  flex-direction: column;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.footer-logo-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 8px;
}

.footer-logo-text {
  font-size: 24px;
  font-weight: 700;
  color: white;
}

.footer-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 24px;
  font-size: 14px;
}

.social-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-icon:hover {
  background: #EF4444;
  transform: translateY(-3px);
}

.footer-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
  color: white;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 14px;
  display: inline-block;
}

.footer-links a:hover {
  color: #FCA5A5;
  padding-left: 5px;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-item {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  line-height: 1.6;
}

.contact-item svg {
  flex-shrink: 0;
  margin-top: 2px;
}

.contact-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #FCA5A5;
}

/* Newsletter Section */
.newsletter-section {
  background: #EF4444;
  padding: 40px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.newsletter-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 16px;
}

.newsletter-text h3 {
  font-size: 24px;
  margin-bottom: 8px;
  font-weight: 700;
}

.newsletter-text p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  margin: 0;
}

.newsletter-form {
  display: flex;
  gap: 12px;
  max-width: 450px;
  width: 100%;
}

.newsletter-input {
  flex: 1;
  padding: 14px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}

.newsletter-input:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}

.newsletter-input::placeholder {
  color: #9CA3AF;
}

.newsletter-button {
  background: #1E40AF;
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.newsletter-button:hover:not(:disabled) {
  background: #1E3A8A;
  transform: translateY(-2px);
}

.newsletter-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner-small {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.subscription-message {
  text-align: center;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  margin-top: 16px;
}

.subscription-message.success {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.subscription-message.error {
  background: rgba(220, 38, 38, 0.2);
  color: white;
  border: 1px solid rgba(220, 38, 38, 0.3);
}

/* Footer Bottom */
.footer-bottom {
  background: rgba(0, 0, 0, 0.2);
  padding: 20px 0;
}

.footer-bottom-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}

.copyright {
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.footer-bottom-links {
  display: flex;
  align-items: center;
  gap: 16px;
}

.footer-bottom-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-bottom-links a:hover {
  color: #FCA5A5;
}

.divider {
  color: rgba(255, 255, 255, 0.4);
}

/* Responsive */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 40px 30px;
  }
}

@media (max-width: 768px) {
  .footer-main {
    padding: 40px 0 30px;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .newsletter-content {
    flex-direction: column;
    text-align: center;
    gap: 24px;
  }

  .newsletter-form {
    flex-direction: column;
    max-width: 100%;
  }

  .newsletter-button {
    width: 100%;
  }

  .footer-bottom-content {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }

  .footer-bottom-links {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>