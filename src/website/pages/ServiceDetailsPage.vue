<template>
  <div class="program-details-page">
    <!-- Loading Overlay -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <p class="loading-text">Loading program details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="formError && (!programData || !programData.name)" class="error-state">
      <div class="container">
        <div class="error-content">
          <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <h2>Failed to Load Program</h2>
          <p>{{ formError }}</p>
          <button @click="fetchProgramData" class="retry-btn">Try Again</button>
        </div>
      </div>
    </div>

    <!-- Main Content - Only show if we have program data -->
    <div v-else-if="programData && programData.name">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="container">
        <div class="breadcrumb">
          <a href="#home">Home</a>
          <span class="separator">›</span>
          <a href="#services">Services</a>
          <span class="separator">›</span>
          <span class="current">{{ programData.name || 'Program' }}</span>
        </div>
        <div class="hero-content">
          <div class="hero-text">
            <div class="program-badge" v-if="programData.name">{{ programData.name }}</div>
            <h1 class="hero-title">{{ programData.name || 'Program' }} Programs</h1>
            <p class="hero-description" v-if="currentCountryProgram && currentCountryProgram.overview">
              {{ currentCountryProgram.overview }}
            </p>
            <div class="hero-stats" v-if="currentCountryProgram">
              <div class="stat-box" v-if="currentCountryProgram.duration">
                <span class="stat-number">{{ currentCountryProgram.duration }}</span>
                <span class="stat-label">Duration</span>
              </div>
              <div class="stat-box" v-if="currentCountryProgram.partner_university_count">
                <span class="stat-number">{{ currentCountryProgram.partner_university_count }}+</span>
                <span class="stat-label">Partner Universities</span>
              </div>
              <div class="stat-box" v-if="currentCountryProgram.success_rate">
                <span class="stat-number">{{ currentCountryProgram.success_rate }}</span>
                <span class="stat-label">Success Rate</span>
              </div>
            </div>
          </div>
          <div class="hero-image">
            <svg viewBox="0 0 400 300" class="illustration">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#1E40AF;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#1E3A8A;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#EF4444;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#DC2626;stop-opacity:1" />
                </linearGradient>
              </defs>
              <!-- Books -->
              <rect x="80" y="180" width="60" height="80" rx="4" fill="url(#grad1)"/>
              <rect x="150" y="160" width="60" height="100" rx="4" fill="url(#grad2)"/>
              <rect x="220" y="170" width="60" height="90" rx="4" fill="url(#grad1)"/>
              <!-- Graduation Cap -->
              <polygon points="200,80 140,110 200,140 260,110" fill="url(#grad1)"/>
              <rect x="195" y="140" width="10" height="40" fill="url(#grad2)"/>
              <circle cx="200" cy="185" r="8" fill="url(#grad2)"/>
              <!-- Decorative circles -->
              <circle cx="320" cy="100" r="30" fill="url(#grad2)" opacity="0.3"/>
              <circle cx="60" cy="120" r="20" fill="url(#grad1)" opacity="0.3"/>
              <circle cx="340" cy="220" r="25" fill="url(#grad1)" opacity="0.2"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Overview Section -->
    <div class="overview-section" v-if="currentCountryProgram">
      <div class="container">
        <div class="content-grid">
          <div class="main-content">
            <section class="content-section">
              <h2 class="section-title">Program Overview</h2>
              <p class="section-text">{{ currentCountryProgram.overview }}</p>
              
              <div class="highlights-grid">
                <div class="highlight-box">
                  <svg class="highlight-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  <h4>Top Universities</h4>
                  <p>Access to world-renowned institutions</p>
                </div>
                <div class="highlight-box">
                  <svg class="highlight-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                  <h4>Flexible Timeline</h4>
                  <p>Multiple intake options throughout the year</p>
                </div>
                <div class="highlight-box">
                  <svg class="highlight-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <h4>Expert Counselors</h4>
                  <p>Dedicated support from application to visa</p>
                </div>
                <div class="highlight-box">
                  <svg class="highlight-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                  </svg>
                  <h4>Scholarship Support</h4>
                  <p>Assistance in finding financial aid opportunities</p>
                </div>
              </div>
            </section>
          </div>

          <!-- Sidebar -->
          <div class="sidebar">
            <div class="sticky-sidebar">
              <div class="info-card" v-if="currentCountryProgram">
                <h3>Quick Information</h3>
                <div class="info-list">
                  <div class="info-item" v-if="programData && programData.name">
                    <span class="info-label">Program Level:</span>
                    <span class="info-value">{{ programData.name }}</span>
                  </div>
                  <div class="info-item" v-if="currentCountryProgram.duration">
                    <span class="info-label">Duration:</span>
                    <span class="info-value">{{ currentCountryProgram.duration }}</span>
                  </div>
                  <div class="info-item" v-if="currentCountryProgram.intake">
                    <span class="info-label">Intake:</span>
                    <span class="info-value">{{ currentCountryProgram.intake }}</span>
                  </div>
                  <div class="info-item" v-if="currentCountryProgram.average_tution">
                    <span class="info-label">Average Tuition:</span>
                    <span class="info-value">{{ currentCountryProgram.average_tution }}</span>
                  </div>
                  <div class="info-item" v-if="currentCountryProgram.application_deadline">
                    <span class="info-label">Application Deadline:</span>
                    <span class="info-value">{{ formatDate(currentCountryProgram.application_deadline) }}</span>
                  </div>
                </div>
                <button class="quick-apply-btn" @click="scrollToForm">Apply Now</button>
              </div>

              <div class="info-card" v-if="currentCountryProgram && currentCountryProgram.resources && currentCountryProgram.resources.length">
                <h3>Download Resources</h3>
                <a v-for="resource in currentCountryProgram.resources" :key="resource.id" :href="resource.file_url" target="_blank" class="download-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  {{ resource.title || 'Download Resource' }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Country-Wise Services -->
    <div class="country-services-section" v-if="programData && programData.countries && programData.countries.length">
      <div class="container">
        <div class="section-header">
          <h2 class="section-main-title">Country-Wise Services</h2>
          <p class="section-subtitle">Specialized support for your chosen destination</p>
        </div>

        <div class="countries-tabs">
          <button 
            v-for="(countryProgram, index) in programData.countries" 
            :key="countryProgram.id"
            :class="['country-tab', { active: selectedCountryIndex === index }]"
            @click="selectedCountryIndex = index"
          >
            <span class="flag-icon">{{ getCountryFlag(countryProgram.country_id) }}</span>
            <span class="country-name">{{ getCountryName(countryProgram.country_id) }}</span>
          </button>
        </div>

        <transition name="fade" mode="out-in">
          <div :key="selectedCountryIndex" class="country-content" v-if="currentCountryProgram">
            <div class="country-header">
              <div class="country-info">
                <span class="flag-large">{{ getCountryFlag(currentCountryProgram.country_id) }}</span>
                <div>
                  <h3>{{ getCountryName(currentCountryProgram.country_id) }}</h3>
                  <p class="country-tagline" v-if="programData && programData.name">Study {{ programData.name }} programs</p>
                </div>
              </div>
              <div class="country-stats-mini">
                <div class="mini-stat" v-if="currentCountryProgram.partner_university_count">
                  <span class="mini-stat-value">{{ currentCountryProgram.partner_university_count }}+</span>
                  <span class="mini-stat-label">Universities</span>
                </div>
                <div class="mini-stat" v-if="currentCountryProgram.average_tution">
                  <span class="mini-stat-value">{{ currentCountryProgram.average_tution }}</span>
                  <span class="mini-stat-label">Avg. Tuition</span>
                </div>
              </div>
            </div>

            <div class="services-offered" v-if="currentCountryProgram.services && currentCountryProgram.services.length">
              <h4>Services We Provide for {{ getCountryName(currentCountryProgram.country_id) }}</h4>
              <div class="services-grid-country">
                <div v-for="service in currentCountryProgram.services" :key="service.id" class="service-card-small">
                  <svg class="service-icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>{{ service.service_details }}</span>
                </div>
              </div>
            </div>

            <div class="specializations" v-if="currentCountryProgram.specializations && currentCountryProgram.specializations.length">
              <h4>Popular Specializations</h4>
              <div class="spec-tags">
                <span v-for="spec in currentCountryProgram.specializations" :key="spec.id" class="spec-tag">
                  {{ spec.details }}
                </span>
              </div>
            </div>

            <div class="eligibility-requirements" v-if="currentCountryProgram.eligibilities && currentCountryProgram.eligibilities.length">
              <h4>Eligibility Requirements</h4>
              <div class="requirements-list-country">
                <div v-for="req in currentCountryProgram.eligibilities" :key="req.id" class="requirement-item-country">
                  <svg class="check-icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>{{ req.details }}</span>
                </div>
              </div>
            </div>

            <div class="application-process-section" v-if="currentCountryProgram.application_process && currentCountryProgram.application_process.length">
              <h4>Application Process</h4>
              <div class="timeline-country">
                <div v-for="(step, index) in currentCountryProgram.application_process" :key="step.id" class="timeline-item-country">
                  <div class="timeline-marker-country">
                    <span class="step-number-country">{{ index + 1 }}</span>
                  </div>
                  <div class="timeline-content-country">
                    <h5>{{ step.title }}</h5>
                    <p>{{ step.short_description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="important-info">
              <h4>Important Information</h4>
              <div class="info-boxes">
                <div class="info-box-item" v-if="currentCountryProgram.application_deadline">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <div>
                    <strong>Application Deadline</strong>
                    <p>{{ formatDate(currentCountryProgram.application_deadline) }}</p>
                  </div>
                </div>
                <div class="info-box-item" v-if="currentCountryProgram.visa_processing_time">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <div>
                    <strong>Visa Processing Time</strong>
                    <p>{{ currentCountryProgram.visa_processing_time }}</p>
                  </div>
                </div>
                <div class="info-box-item" v-if="currentCountryProgram.work_permit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <div>
                    <strong>Work Permit</strong>
                    <p>{{ currentCountryProgram.work_permit }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Appointment Form Section -->
    <div ref="formSection" class="appointment-section">
      <div class="container">
        <div class="form-wrapper">
          <div class="form-info">
            <h2>Book Your Free Consultation</h2>
            <p>Take the first step towards your dream education. Our expert counselors are here to guide you.</p>
            
            <div class="form-benefits">
              <div class="benefit-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Personalized counseling session</span>
              </div>
              <div class="benefit-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>University & program recommendations</span>
              </div>
              <div class="benefit-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Financial aid & scholarship guidance</span>
              </div>
              <div class="benefit-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Application timeline planning</span>
              </div>
            </div>

            <div class="contact-info-box">
              <h4>Or Contact Us Directly</h4>
              <div class="contact-method">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>+1 (234) 567-890</span>
              </div>
              <div class="contact-method">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>info@studentconsult.com</span>
              </div>
            </div>
          </div>

          <div class="form-container">
            <form @submit.prevent="submitForm" class="appointment-form">
              <h3>Fill in Your Details</h3>
              
              <div v-if="formError" class="error-message">
                {{ formError }}
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">First Name *</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    v-model="formData.first_name" 
                    required
                    placeholder="John"
                  />
                </div>
                <div class="form-group">
                  <label for="lastName">Last Name *</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    v-model="formData.last_name" 
                    required
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="formData.email"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div class="form-group">
                  <label for="phone">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    v-model="formData.phone" 
                    required
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="program">Interested Program *</label>
                  <select id="program" v-model="formData.program_id" required>
                    <option value="">Select a program</option>
                    <option v-for="program in programOptions" :key="program.value" :value="program.value">
                      {{ program.label }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="country">Preferred Country *</label>
                  <select id="country" v-model="formData.country_id" required>
                    <option value="">Select a country</option>
                    <option v-for="country in countryOptions" :key="country.value" :value="country.value">
                      {{ country.label }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="fieldOfStudy">Field of Study</label>
                <input 
                  type="text" 
                  id="fieldOfStudy" 
                  v-model="formData.field_of_study"
                  placeholder="e.g., Computer Science, Business Administration"
                />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="currentEducation">Current Education Level</label>
                  <select id="currentEducation" v-model="formData.current_education">
                    <option value="">Select your level</option>
                    <option value="high-school">High School</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="intakeYear">Preferred Intake</label>
                  <select id="intakeYear" v-model="formData.preferred_intake">
                    <option value="">Select intake</option>
                    <option value="2025-fall">Fall 2025</option>
                    <option value="2026-spring">Spring 2026</option>
                    <option value="2026-fall">Fall 2026</option>
                    <option value="2027-spring">Spring 2027</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="appointmentDate">Preferred Appointment Date</label>
                <input 
                  type="date" 
                  id="appointmentDate" 
                  v-model="formData.preferred_appointment_date"
                  :min="minDate"
                />
              </div>

              <div class="form-group">
                <label for="appointmentTime">Preferred Time</label>
                <select id="appointmentTime" v-model="formData.preferred_appointment_slot">
                  <option value="">Select a time slot</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="17:00">05:00 PM</option>
                </select>
              </div>

              <div class="form-group">
                <label for="message">Additional Information</label>
                <textarea 
                  id="message" 
                  v-model="formData.appointment_information" 
                  rows="4"
                  placeholder="Tell us about your goals, concerns, or any specific questions you have..."
                ></textarea>
              </div>

              <div class="form-group checkbox-group">
                <input 
                  type="checkbox" 
                  id="terms" 
                  v-model="formData.terms_conditions" 
                  required
                  true-value="1"
                  false-value="0"
                />
                <label for="terms">
                  I agree to the <a href="#terms">Terms & Conditions</a> and <a href="#privacy">Privacy Policy</a> *
                </label>
              </div>

              <button type="submit" class="submit-btn" :disabled="isSubmitting">
                <span v-if="!isSubmitting">Book Free Consultation</span>
                <span v-else>Submitting...</span>
              </button>

              <p class="form-note">* Required fields. We'll contact you within 24 hours to confirm your appointment.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div><!-- Close main content wrapper -->

    <!-- Success Modal -->
    <transition name="modal">
      <div v-if="showSuccessModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h3>Appointment Booked Successfully!</h3>
          <p>Thank you for choosing StudentConsult. We've received your consultation request and will contact you shortly to confirm your appointment.</p>
          <p class="confirmation-details" v-if="formData.email">
            A confirmation email has been sent to <strong>{{ formData.email }}</strong>
          </p>
          <button @click="closeModal" class="modal-close-btn">Close</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProgramDetailsPage',
  data() {
    return {
      isLoading: false,
      programData: {
        name: '',
        countries: [],
        id: null
      },
      selectedCountryIndex: 0,
      programOptions: [],
      countryOptions: [],
      formData: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        program_id: '',
        country_id: '',
        field_of_study: '',
        current_education: '',
        preferred_intake: '',
        preferred_appointment_date: '',
        preferred_appointment_slot: '',
        appointment_information: '',
        terms_conditions: '0'
      },
      isSubmitting: false,
      showSuccessModal: false,
      formError: null,
      countryMapping: {
        3: { name: 'USA', flag: '🇺🇸' },
        2: { name: 'UK', flag: '🇬🇧' },
        4: { name: 'Canada', flag: '🇨🇦' },
        5: { name: 'Malaysia', flag: '🇲🇾' }
      }
    }
  },

  computed: {
    programId() {
      // Get program ID from route params
      return this.$route.params.id || this.$route.params.programId;
    },
    minDate() {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      return tomorrow.toISOString().split('T')[0]
    },
    currentCountryProgram() {
      if (!this.programData || !this.programData.countries || !Array.isArray(this.programData.countries)) {
        return null;
      }
      return this.programData.countries[this.selectedCountryIndex] || null;
    }
  },

  mounted() {
    this.fetchProgramData();
    this.fetchProgramOptions();
    this.fetchCountryOptions();
  },

  methods: {
    async fetchProgramData() {
      // Validate programId exists
      if (!this.programId) {
        console.error('No program ID found in route');
        this.formError = 'Invalid program ID. Please navigate from the programs page.';
        return;
      }

      this.isLoading = true;
      this.formError = null; // Clear any previous errors
      
      try {
        const response = await axios.get(process.env.VUE_APP_BASE_API+`/program/${this.programId}`);
        
        console.log('API Response:', response.data); // Debug log
        
        // The API returns { program: { ... } }
        if (response.data && response.data.program) {
          this.programData = response.data.program;
          
          // Ensure countries array exists (it should from the API)
          if (!this.programData.countries || !Array.isArray(this.programData.countries)) {
            this.programData.countries = [];
          }
          
          // Set default program_id in form
          if (this.programData.id) {
            this.formData.program_id = this.programData.id;
          }
          
          // Set default country_id if available
          if (this.programData.countries.length > 0) {
            const firstCountry = this.programData.countries[0];
            if (firstCountry && firstCountry.country_id) {
              this.formData.country_id = firstCountry.country_id;
            }
          }
          
          console.log('Program Data loaded successfully:', {
            name: this.programData.name,
            id: this.programData.id,
            countriesCount: this.programData.countries.length
          });
        } else {
          console.error('API response missing program data:', response.data);
          this.formError = 'Failed to load program details. Invalid data received.';
        }
      } catch (error) {
        console.error('Error fetching program data:', error);
        if (error.response) {
          console.error('Error response:', error.response.data);
          console.error('Error status:', error.response.status);
          this.formError = `Failed to load program details: ${error.response.status}`;
        } else if (error.request) {
          console.error('No response received:', error.request);
          this.formError = 'Failed to load program details. No response from server.';
        } else {
          console.error('Error message:', error.message);
          this.formError = 'Failed to load program details. Please check your connection.';
        }
      } finally {
        this.isLoading = false;
      }
    },

    async fetchProgramOptions() {
      try {
        const response = await axios.get(process.env.VUE_APP_BASE_API+'/system/programs');
        this.programOptions = response.data.programs;
      } catch (error) {
        console.error('Error fetching program options:', error);
      }
    },

    async fetchCountryOptions() {
      try {
        const response = await axios.get(process.env.VUE_APP_BASE_API+'/system/countries');
        this.countryOptions = response.data.countries;
      } catch (error) {
        console.error('Error fetching country options:', error);
      }
    },

    getCountryName(countryId) {
      return this.countryMapping[countryId]?.name || 'Country';
    },

    getCountryFlag(countryId) {
      return this.countryMapping[countryId]?.flag || '🌍';
    },

    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    },

    scrollToForm() {
      this.$refs.formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    async submitForm() {
      this.isSubmitting = true;
      this.formError = null;

      try {
        const response = await axios.post(process.env.VUE_APP_BASE_API+'/appointment', this.formData);
        
        if (response.status === 200) {
          this.showSuccessModal = true;
          this.resetForm();
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        
        if (error.response && error.response.status === 422) {
          // Validation errors
          const errors = error.response.data.errors;
          const errorMessages = Object.values(errors).flat();
          this.formError = errorMessages.join(', ');
        } else {
          this.formError = error.response?.data?.message || 'Failed to submit appointment. Please try again.';
        }
      } finally {
        this.isSubmitting = false;
      }
    },

    resetForm() {
      const programId = this.programData && this.programData.id ? this.programData.id : '';
      const countryId = this.programData && this.programData.countries && this.programData.countries.length > 0 
        ? this.programData.countries[0].country_id 
        : '';
        
      this.formData = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        program_id: programId,
        country_id: countryId,
        field_of_study: '',
        current_education: '',
        preferred_intake: '',
        preferred_appointment_date: '',
        preferred_appointment_slot: '',
        appointment_information: '',
        terms_conditions: '0'
      };
    },

    closeModal() {
      this.showSuccessModal = false;
    }
  }
}
</script>

<style scoped>
/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  padding: 40px 0 80px;
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.breadcrumb {
  font-size: 14px;
  margin-bottom: 32px;
  opacity: 0.9;
}

.breadcrumb a {
  color: white;
  text-decoration: none;
  transition: opacity 0.3s;
}

.breadcrumb a:hover {
  opacity: 0.7;
}

.separator {
  margin: 0 8px;
}

.current {
  opacity: 0.7;
}

.hero-content {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 60px;
  align-items: center;
}

.program-badge {
  display: inline-block;
  background: #EF4444;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.hero-title {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-description {
  font-size: 18px;
  line-height: 1.6;
  opacity: 0.95;
  margin-bottom: 40px;
}

.hero-stats {
  display: flex;
  gap: 40px;
}

.stat-box {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 36px;
  font-weight: 800;
  color: #FCA5A5;
  line-height: 1;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.9;
}

.hero-image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.illustration {
  width: 100%;
  max-width: 400px;
}

/* Overview Section */
.overview-section {
  padding: 80px 0;
  background: #F9FAFB;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 60px;
}

.content-section {
  margin-bottom: 60px;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 24px;
}

.section-text {
  font-size: 16px;
  line-height: 1.8;
  color: #4B5563;
  margin-bottom: 32px;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.highlight-box {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 2px solid #E5E7EB;
  transition: all 0.3s ease;
}

.highlight-box:hover {
  border-color: #1E40AF;
  box-shadow: 0 8px 24px rgba(30, 64, 175, 0.1);
}

.highlight-icon {
  width: 40px;
  height: 40px;
  color: #EF4444;
  margin-bottom: 16px;
}

.highlight-box h4 {
  font-size: 18px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 8px;
}

.highlight-box p {
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
}

/* Requirements */
.requirements-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.requirement-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 16px;
  color: #374151;
}

.check-icon {
  width: 24px;
  height: 24px;
  color: #EF4444;
  flex-shrink: 0;
  margin-top: 2px;
}

/* Timeline */
.timeline {
  position: relative;
  padding-left: 40px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, #1E40AF 0%, #EF4444 100%);
}

.timeline-item {
  position: relative;
  margin-bottom: 32px;
}

.timeline-marker {
  position: absolute;
  left: -40px;
  top: 0;
  width: 32px;
  height: 32px;
  background: white;
  border: 3px solid #1E40AF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-number {
  font-size: 14px;
  font-weight: 700;
  color: #1E40AF;
}

.timeline-content h4 {
  font-size: 18px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 8px;
}

.timeline-content p {
  font-size: 15px;
  color: #6B7280;
  line-height: 1.6;
}

/* Sidebar */
.sticky-sidebar {
  position: sticky;
  top: 100px;
}

.info-card {
  background: white;
  padding: 28px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
}

.info-card h3 {
  font-size: 20px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 20px;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 16px;
  border-bottom: 1px solid #E5E7EB;
}

.info-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.info-label {
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
}

.info-value {
  font-size: 14px;
  color: #1E3A8A;
  font-weight: 600;
  text-align: right;
}

.quick-apply-btn {
  width: 100%;
  background: #EF4444;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-apply-btn:hover {
  background: #DC2626;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(239, 68, 68, 0.3);
}

.download-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  color: #1E40AF;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

.download-link:last-child {
  margin-bottom: 0;
}

.download-link:hover {
  background: #1E40AF;
  color: white;
}

.download-link svg {
  width: 20px;
  height: 20px;
}

/* Country Services Section */
.country-services-section {
  background: white;
  padding: 80px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-main-title {
  font-size: 42px;
  font-weight: 800;
  color: #1E3A8A;
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 18px;
  color: #6B7280;
}

.countries-tabs {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 48px;
  flex-wrap: wrap;
}

.country-tab {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 28px;
  background: white;
  border: 2px solid #E5E7EB;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.3s ease;
}

.country-tab:hover {
  border-color: #1E40AF;
  color: #1E40AF;
}

.country-tab.active {
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  color: white;
  border-color: transparent;
}

.flag-icon {
  font-size: 24px;
}

.country-content {
  background: #F9FAFB;
  padding: 48px;
  border-radius: 16px;
  border: 2px solid #E5E7EB;
}

.country-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 2px solid #E5E7EB;
}

.country-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.flag-large {
  font-size: 60px;
}

.country-info h3 {
  font-size: 32px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 4px;
}

.country-tagline {
  font-size: 16px;
  color: #6B7280;
}

.country-stats-mini {
  display: flex;
  gap: 32px;
}

.mini-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mini-stat-value {
  font-size: 24px;
  font-weight: 800;
  color: #EF4444;
}

.mini-stat-label {
  font-size: 13px;
  color: #6B7280;
}

.services-offered,
.specializations,
.important-info {
  margin-bottom: 40px;
}

.services-offered h4,
.specializations h4,
.important-info h4 {
  font-size: 22px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 24px;
}

.services-grid-country {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.service-card-small {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  font-size: 15px;
  color: #374151;
  border: 1px solid #E5E7EB;
}

.service-icon-small {
  width: 24px;
  height: 24px;
  color: #EF4444;
  flex-shrink: 0;
}

.spec-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.spec-tag {
  background: white;
  color: #1E40AF;
  padding: 10px 20px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  border: 2px solid #1E40AF;
}

/* Eligibility Requirements in Country Tab */
.eligibility-requirements {
  margin-bottom: 40px;
}

.eligibility-requirements h4 {
  font-size: 22px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 24px;
}

.requirements-list-country {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.requirement-item-country {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px;
  background: white;
  border-radius: 8px;
  font-size: 15px;
  color: #374151;
  border: 1px solid #E5E7EB;
}

.check-icon-small {
  width: 20px;
  height: 20px;
  color: #EF4444;
  flex-shrink: 0;
  margin-top: 2px;
}

/* Application Process in Country Tab */
.application-process-section {
  margin-bottom: 40px;
}

.application-process-section h4 {
  font-size: 22px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 24px;
}

.timeline-country {
  position: relative;
  padding-left: 32px;
}

.timeline-country::before {
  content: '';
  position: absolute;
  left: 12px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, #1E40AF 0%, #EF4444 100%);
}

.timeline-item-country {
  position: relative;
  margin-bottom: 24px;
  background: white;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
}

.timeline-item-country:last-child {
  margin-bottom: 0;
}

.timeline-marker-country {
  position: absolute;
  left: -32px;
  top: 16px;
  width: 26px;
  height: 26px;
  background: white;
  border: 2px solid #1E40AF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-number-country {
  font-size: 12px;
  font-weight: 700;
  color: #1E40AF;
}

.timeline-content-country h5 {
  font-size: 16px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 6px;
}

.timeline-content-country p {
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
}

.info-boxes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.info-box-item {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
}

.info-box-item svg {
  width: 32px;
  height: 32px;
  color: #EF4444;
  flex-shrink: 0;
}

.info-box-item strong {
  display: block;
  font-size: 15px;
  color: #1E3A8A;
  margin-bottom: 4px;
}

.info-box-item p {
  font-size: 14px;
  color: #6B7280;
}

/* Appointment Section */
.appointment-section {
  background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%);
  padding: 80px 0;
}

.form-wrapper {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 60px;
  background: white;
  padding: 60px;
  border-radius: 20px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
}

.form-info h2 {
  font-size: 36px;
  font-weight: 800;
  color: #1E3A8A;
  margin-bottom: 16px;
  line-height: 1.2;
}

.form-info > p {
  font-size: 16px;
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 32px;
}

.form-benefits {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  color: #374151;
}

.benefit-item svg {
  width: 24px;
  height: 24px;
  color: #EF4444;
  flex-shrink: 0;
}

.contact-info-box {
  background: #F9FAFB;
  padding: 24px;
  border-radius: 12px;
  border-left: 4px solid #EF4444;
}

.contact-info-box h4 {
  font-size: 18px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 16px;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 15px;
  color: #374151;
}

.contact-method:last-child {
  margin-bottom: 0;
}

.contact-method svg {
  width: 20px;
  height: 20px;
  color: #1E40AF;
}

.form-container h3 {
  font-size: 24px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 28px;
}

.appointment-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.error-message {
  background: #FEE2E2;
  border: 1px solid #EF4444;
  color: #DC2626;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px 16px;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #1E40AF;
  box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.checkbox-group {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.checkbox-group input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.checkbox-group label {
  margin: 0;
  font-size: 14px;
  color: #6B7280;
  cursor: pointer;
}

.checkbox-group a {
  color: #1E40AF;
  text-decoration: none;
  font-weight: 600;
}

.checkbox-group a:hover {
  text-decoration: underline;
}

.submit-btn {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-note {
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  margin-top: 8px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.modal-content {
  background: white;
  padding: 48px;
  border-radius: 20px;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.success-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

.success-icon svg {
  width: 48px;
  height: 48px;
  color: white;
}

.modal-content h3 {
  font-size: 28px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 16px;
}

.modal-content p {
  font-size: 16px;
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 16px;
}

.confirmation-details {
  background: #F9FAFB;
  padding: 16px;
  border-radius: 8px;
  font-size: 14px;
}

.modal-close-btn {
  background: #1E40AF;
  color: white;
  border: none;
  padding: 14px 36px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 24px;
}

.modal-close-btn:hover {
  background: #1E3A8A;
}

/* Loading Overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  gap: 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #E5E7EB;
  border-top-color: #1E40AF;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-text {
  font-size: 16px;
  color: #6B7280;
  font-weight: 500;
}

/* Error State */
.error-state {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F9FAFB;
  padding: 40px 20px;
}

.error-content {
  text-align: center;
  max-width: 500px;
}

.error-icon {
  width: 80px;
  height: 80px;
  color: #EF4444;
  margin: 0 auto 24px;
}

.error-content h2 {
  font-size: 28px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 16px;
}

.error-content p {
  font-size: 16px;
  color: #6B7280;
  margin-bottom: 32px;
  line-height: 1.6;
}

.retry-btn {
  background: #1E40AF;
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: #1E3A8A;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(30, 64, 175, 0.3);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Responsive */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .sticky-sidebar {
    position: static;
  }

  .hero-content {
    grid-template-columns: 1fr;
  }

  .highlights-grid {
    grid-template-columns: 1fr;
  }

  .services-grid-country {
    grid-template-columns: 1fr;
  }

  .info-boxes {
    grid-template-columns: 1fr;
  }

  .form-wrapper {
    grid-template-columns: 1fr;
    padding: 40px;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }

  .hero-stats {
    gap: 24px;
  }

  .stat-number {
    font-size: 28px;
  }

  .section-main-title {
    font-size: 32px;
  }

  .country-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }

  .country-stats-mini {
    width: 100%;
    justify-content: space-around;
  }

  .form-wrapper {
    padding: 24px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .countries-tabs {
    flex-direction: column;
  }

  .country-tab {
    width: 100%;
    justify-content: center;
  }

  .country-content {
    padding: 24px;
  }

  .modal-content {
    padding: 32px 24px;
  }
}
</style>