<template>
  <CarouselComponentOne :banners="banners" />
  
  <section class="services-section">
    <!-- Program Categories Section -->
    <div v-if="programs.length > 0" class="container">
      <div class="section-header">
        <span class="section-badge">Our Services</span>
        <h2 class="section-title">Study Programs We Specialize In</h2>
        <p class="section-description">
          Expert guidance for every stage of your academic journey. Choose your path and let us help you achieve your dreams.
        </p>
      </div>

      <!-- Loading State for Programs -->
      <div v-if="loadingPrograms" class="loading-container">
        <div class="spinner"></div>
        <p>Loading programs...</p>
      </div>

      <!-- Programs Grid -->
      <div v-else class="programs-grid">
        <router-link 
          v-for="(program, index) in programs" 
          :key="program.id"
          :to="`/program/${program.id}`" 
          class="program-card" 
          :class="{ 'featured': index === featuredIndex }"
          @click="selectProgram(program)"
        >
          <!-- <div v-if="index === featuredIndex" class="featured-badge">Most Popular</div> -->
          <div class="program-image">
            <svg class="program-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              <circle v-if="index === featuredIndex" cx="12" cy="10" r="3"/>
              <template v-else-if="index > featuredIndex">
                <path d="M12 7v10"/>
                <path d="M8 10l4-3 4 3"/>
              </template>
            </svg>
            <div class="program-overlay"></div>
          </div>
          <div class="program-content">
            <h3 class="program-title">{{ program.name }}</h3>
            <p v-if="program.short_description" class="program-description">
              {{ program.short_description }}
            </p>
            <ul v-if="program.services && program.services.length > 0" class="program-features">
              <li v-for="service in program.services.slice(0, 4)" :key="service.id">
                {{ service.service_statement }}
              </li>
            </ul>
            <div class="program-cta">
              <span>Learn More</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Countries Section -->
    <div v-if="countries.length > 0" class="countries-section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Study Destinations</span>
          <h2 class="section-title">Countries We Serve</h2>
          <p class="section-description">
            We have partnerships with top universities across premier study destinations
          </p>
        </div>

        <!-- Loading State for Countries -->
        <div v-if="loadingCountries" class="loading-container">
          <div class="spinner"></div>
          <p>Loading countries...</p>
        </div>

        <!-- Countries Grid -->
        <div v-else class="countries-grid">
          <router-link
            v-for="country in countries"
            :key="country.id"
            :to="`/country/${country.id}`"
            class="country-card"
            @click="selectCountry(country)"
          >
            <div class="country-flag">
              <img 
                v-if="country.flag" 
                :src="`${urlBase}/${country.flag}`" 
                :alt="country.name"
                class="flag-image"
              />
              <div v-else class="flag-placeholder">
                <svg viewBox="0 0 60 30" class="flag-svg">
                  <rect width="60" height="30" fill="#E5E7EB"/>
                  <text x="30" y="18" text-anchor="middle" fill="#6B7280" font-size="8">No Flag</text>
                </svg>
              </div>
            </div>
            <div class="country-content">
              <h3 class="country-name">{{ country.name }}</h3>
              <p v-if="country.short_description" class="country-description">
                {{ country.short_description }}
              </p>
              <p v-else class="country-description">
                Explore amazing educational opportunities in {{ country.name }}
              </p>
              <div class="country-cta">
                <span>Explore Programs</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <CarouselComponentThree />

    <!-- Additional Services -->
    <div class="additional-services">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Complete Support Services</h2>
          <p class="section-description">
            Beyond admissions, we provide comprehensive support throughout your journey
          </p>
        </div>

        <div class="services-grid">
          <div class="service-item">
            <div class="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <h4>Application Assistance</h4>
            <p>Complete guidance on university applications and documentation</p>
          </div>

          <div class="service-item">
            <div class="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <h4>Visa Processing</h4>
            <p>Expert visa consultation and application support</p>
          </div>

          <div class="service-item">
            <div class="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h4>Profile Building</h4>
            <p>SOP, LOR, and CV preparation by experts</p>
          </div>

          <div class="service-item">
            <div class="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <h4>Test Preparation</h4>
            <p>IELTS, TOEFL, GRE, GMAT coaching programs</p>
          </div>

          <div class="service-item">
            <div class="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h4>Scholarship Guidance</h4>
            <p>Find and apply for scholarships and financial aid</p>
          </div>

          <div class="service-item">
            <div class="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <h4>Pre-Departure Support</h4>
            <p>Accommodation, travel, and settling-in assistance</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Ready to Start Your Journey?</h2>
          <p class="cta-description">
            Book a consultation with our expert counselors today and take the first step towards your dream university
          </p>
          <div class="cta-buttons">
            <a 
              v-if="systemSettings.phone" 
              :href="`tel:${systemSettings.phone}`" 
              class="cta-button primary"
            >
              Schedule For Consultation
            </a>
            <a 
              v-if="systemSettings.whatsapp" 
              :href="`https://wa.me/${systemSettings.whatsapp.replace(/[^0-9]/g, '')}`" 
              target="_blank"
              class="cta-button secondary"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import CarouselComponentOne from './component/CarouselComponentOne.vue';
import CarouselComponentThree from './component/CarouselComponentThree.vue';

// API Base URL
const apiBase = ref(process.env.VUE_APP_BASE_API);
const urlBase = ref(process.env.VUE_APP_BASE_URL);

// Data state
const banners = ref([]);
const programs = ref([]);
const countries = ref([]);
const systemSettings = ref({
  enable_newsletter: false,
  phone: null,
  whatsapp: null,
  email: null
});

// Loading states
const loadingPrograms = ref(false);
const loadingCountries = ref(false);
const loadingSystem = ref(false);

// Computed
const featuredIndex = computed(() => {
  // Make the middle program featured, or the second one if there are only a few
  if (programs.value.length === 0) return -1;
  if (programs.value.length <= 2) return 0;
  return Math.floor(programs.value.length / 2);
});

// Methods
const loadLandingPageData = async () => {
  loadingPrograms.value = true;
  loadingCountries.value = true;
  
  try {
    const response = await axios.get(`${apiBase.value}/landing-page`);
    const data = response.data;
    
    // Load banners
    banners.value = data.banner || [];
    
    // Load programs (only active ones)
    programs.value = (data.programs || []).filter(p => p.status === 'active');
    
    // Load countries (only active ones)
    countries.value = (data.countries || []).filter(c => c.status === 'active');
    
  } catch (error) {
    console.error('Failed to load landing page data:', error);
  } finally {
    loadingPrograms.value = false;
    loadingCountries.value = false;
  }
};

const loadSystemSettings = async () => {
  loadingSystem.value = true;
  
  try {
    const response = await axios.get(`${apiBase.value}/system`);
    systemSettings.value = response.data.system || {};
  } catch (error) {
    console.error('Failed to load system settings:', error);
  } finally {
    loadingSystem.value = false;
  }
};

const selectProgram = (program) => {
  console.log('Selected program:', program);
  // Additional handling if needed
};

const selectCountry = (country) => {
  console.log('Selected country:', country);
  // Additional handling if needed
};

// Load data on mount
onMounted(() => {
  loadLandingPageData();
  loadSystemSettings();
});
</script>

<style scoped>
.services-section {
  background: #F9FAFB;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1E40AF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

.spinner-small {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-container p {
  color: #6B7280;
  margin: 0;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 60px;
  padding-top: 80px;
}

.section-badge {
  display: inline-block;
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-title {
  font-size: 42px;
  font-weight: 800;
  color: #1E3A8A;
  margin-bottom: 16px;
  line-height: 1.2;
}

.section-description {
  font-size: 18px;
  color: #6B7280;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Programs Grid */
.programs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 80px;
}

.program-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  text-decoration: none;
}

.program-card.featured {
  transform: scale(1.05);
  box-shadow: 0 20px 40px rgba(30, 58, 138, 0.15);
}

.featured-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: #EF4444;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  z-index: 10;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.program-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(30, 58, 138, 0.15);
}

.program-card.featured:hover {
  transform: scale(1.05) translateY(-8px);
}

.program-image {
  height: 200px;
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.program-icon {
  width: 80px;
  height: 80px;
  color: white;
  z-index: 2;
  position: relative;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.program-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 30%, rgba(239, 68, 68, 0.3) 0%, transparent 70%);
}

.program-content {
  padding: 32px 28px;
}

.program-title {
  font-size: 24px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 12px;
}

.program-description {
  font-size: 15px;
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 20px;
}

.program-features {
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
}

.program-features li {
  padding: 8px 0;
  color: #374151;
  font-size: 14px;
  position: relative;
  padding-left: 24px;
}

.program-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #EF4444;
  font-weight: 700;
}

.program-cta {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1E40AF;
  font-weight: 600;
  font-size: 15px;
  transition: gap 0.3s ease;
}

.program-card:hover .program-cta {
  gap: 12px;
}

.program-cta svg {
  transition: transform 0.3s ease;
}

.program-card:hover .program-cta svg {
  transform: translateX(4px);
}

/* Countries Section */
.countries-section {
  background: white;
  padding: 80px 0;
}

.countries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
  margin-bottom: 40px;
}

.country-card {
  background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%);
  border-radius: 16px;
  padding: 32px;
  border: 2px solid #E5E7EB;
  transition: all 0.4s ease;
  cursor: pointer;
  text-decoration: none;
  display: block;
}

.country-card:hover {
  border-color: #1E40AF;
  box-shadow: 0 12px 32px rgba(30, 64, 175, 0.15);
  transform: translateY(-4px);
}

.country-flag {
  width: 100px;
  /* height: 120px; */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: 24px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.flag-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.flag-placeholder {
  width: 100%;
  height: 100%;
  background: #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flag-svg {
  width: 100%;
  height: 100%;
}

.country-content {
  flex: 1;
}

.country-name {
  font-size: 24px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 12px;
}

.country-description {
  font-size: 15px;
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 20px;
}

.country-cta {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1E40AF;
  font-weight: 600;
  font-size: 15px;
  transition: gap 0.3s ease;
}

.country-card:hover .country-cta {
  gap: 12px;
}

.country-cta svg {
  transition: transform 0.3s ease;
}

.country-card:hover .country-cta svg {
  transform: translateX(4px);
}

/* Additional Services */
.additional-services {
  background: #F9FAFB;
  padding: 80px 0;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.service-item {
  background: white;
  padding: 32px 24px;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.service-item:hover {
  border-color: #EF4444;
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(239, 68, 68, 0.15);
}

.service-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
}

.service-icon svg {
  width: 32px;
  height: 32px;
}

.service-item h4 {
  font-size: 18px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 12px;
}

.service-item p {
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
}


.input-group {
  display: flex;
  gap: 12px;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(30%, -30%);
}

.cta-content {
  text-align: center;
  position: relative;
  z-index: 2;
}

.cta-title {
  font-size: 42px;
  font-weight: 800;
  color: white;
  margin-bottom: 16px;
}

.cta-description {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  max-width: 700px;
  margin: 0 auto 40px;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  padding: 16px 36px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  text-decoration: none;
  display: inline-block;
}

.cta-button.primary {
  background: #EF4444;
  color: white;
  border-color: #EF4444;
}

.cta-button.primary:hover {
  background: #DC2626;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
}

.cta-button.secondary {
  background: transparent;
  color: white;
  border-color: white;
}

.cta-button.secondary:hover {
  background: white;
  color: #1E40AF;
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .programs-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .program-card.featured {
    transform: scale(1);
  }

  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .countries-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 32px;
  }

  .section-description {
    font-size: 16px;
  }

  .programs-grid,
  .countries-grid,
  .services-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .program-card.featured {
    transform: scale(1);
  }

  .newsletter-title {
    font-size: 28px;
  }

  .input-group {
    flex-direction: column;
  }

  .newsletter-button {
    width: 100%;
  }

  .cta-title {
    font-size: 32px;
  }

  .cta-description {
    font-size: 16px;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .cta-button {
    width: 100%;
  }
}
</style>