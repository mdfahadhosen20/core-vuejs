<template>
  <div class="country-details-page">
    <!-- Loading Overlay -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <p class="loading-text">Loading country details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="formError && (!countryData || !countryData.name)" class="error-state">
      <div class="container">
        <div class="error-content">
          <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <h2>Failed to Load Country</h2>
          <p>{{ formError }}</p>
          <button @click="fetchCountryData" class="retry-btn">Try Again</button>
        </div>
      </div>
    </div>

    <!-- Main Content - Only show if we have country data -->
    <div v-else-if="countryData && countryData.name">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="container">
          <div class="breadcrumb">
            <a href="#home">Home</a>
            <span class="separator">›</span>
            <a href="#countries">Countries</a>
            <span class="separator">›</span>
            <span class="current">{{ countryData.name || 'Country' }}</span>
          </div>
          <div class="hero-content">
            <div class="hero-text">
              <div class="country-flag-badge" v-if="countryData.flag">
                <img :src="getImageUrl(countryData.flag)" :alt="countryData.name" class="flag-image" />
              </div>
              <h1 class="hero-title">Study in {{ countryData.name || 'Country' }}</h1>
              <p class="hero-description" v-if="countryData.short_description">
                {{ countryData.short_description }}
              </p>
              <div class="hero-stats" v-if="countryData.programs && countryData.programs.length">
                <div class="stat-box">
                  <span class="stat-number">{{ countryData.programs.length }}+</span>
                  <span class="stat-label">Program Types</span>
                </div>
                <div class="stat-box" v-if="totalUniversities > 0">
                  <span class="stat-number">{{ totalUniversities }}+</span>
                  <span class="stat-label">Partner Universities</span>
                </div>
                <div class="stat-box" v-if="totalStudents > 0">
                  <span class="stat-number">{{ formatNumber(totalStudents) }}+</span>
                  <span class="stat-label">International Students</span>
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
                <!-- Globe -->
                <circle cx="200" cy="150" r="80" fill="url(#grad1)" opacity="0.2"/>
                <circle cx="200" cy="150" r="60" fill="url(#grad1)" opacity="0.4"/>
                <circle cx="200" cy="150" r="40" fill="url(#grad1)"/>
                <!-- Graduation Cap -->
                <polygon points="200,100 150,120 200,140 250,120" fill="url(#grad2)"/>
                <rect x="195" y="140" width="10" height="30" fill="url(#grad2)"/>
                <circle cx="200" cy="175" r="6" fill="url(#grad2)"/>
                <!-- Airplane -->
                <path d="M 320 80 L 340 70 L 350 75 L 330 85 Z" fill="url(#grad2)"/>
                <path d="M 340 70 L 345 65 L 350 67 L 345 72 Z" fill="url(#grad2)"/>
                <!-- Decorative circles -->
                <circle cx="80" cy="100" r="25" fill="url(#grad2)" opacity="0.3"/>
                <circle cx="320" cy="220" r="30" fill="url(#grad1)" opacity="0.3"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Program Tabs Section -->
      <div class="programs-section" v-if="countryData.programs && countryData.programs.length">
        <div class="container">
          <div class="section-header">
            <h2 class="section-main-title">Programs Available in {{ countryData.name }}</h2>
            <p class="section-subtitle">Choose your program type to see detailed information</p>
          </div>

          <div class="programs-tabs">
            <button 
              v-for="(program, index) in activePrograms" 
              :key="program.id"
              :class="['program-tab', { active: selectedProgramIndex === index }]"
              @click="selectedProgramIndex = index"
            >
              <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
              </svg>
              <span class="program-name">{{ getProgramName(program.program_id) }}</span>
            </button>
          </div>

          <transition name="fade" mode="out-in">
            <div :key="selectedProgramIndex" class="program-content" v-if="currentProgram">
              <div class="program-header">
                <div class="program-info">
                  <svg class="program-icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  <div>
                    <h3>{{ getProgramName(currentProgram.program_id) }}</h3>
                    <p class="program-tagline" v-if="currentProgram.overview">{{ currentProgram.overview }}</p>
                  </div>
                </div>
                <div class="program-stats-mini">
                  <div class="mini-stat" v-if="currentProgram.partner_university_count">
                    <span class="mini-stat-value">{{ currentProgram.partner_university_count }}+</span>
                    <span class="mini-stat-label">Universities</span>
                  </div>
                  <div class="mini-stat" v-if="currentProgram.duration">
                    <span class="mini-stat-value">{{ currentProgram.duration }}</span>
                    <span class="mini-stat-label">Duration</span>
                  </div>
                  <div class="mini-stat" v-if="currentProgram.success_rate">
                    <span class="mini-stat-value">{{ currentProgram.success_rate }}</span>
                    <span class="mini-stat-label">Success Rate</span>
                  </div>
                </div>
              </div>

              <!-- Program Details Grid -->
              <div class="program-details-grid">
                <div class="detail-card" v-if="currentProgram.average_tution">
                  <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                  <div class="detail-info">
                    <span class="detail-label">Average Tuition</span>
                    <span class="detail-value">{{ currentProgram.average_tution }}</span>
                  </div>
                </div>

                <div class="detail-card" v-if="currentProgram.intake">
                  <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <div class="detail-info">
                    <span class="detail-label">Intake</span>
                    <span class="detail-value">{{ currentProgram.intake }}</span>
                  </div>
                </div>

                <div class="detail-card" v-if="currentProgram.application_deadline">
                  <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <div class="detail-info">
                    <span class="detail-label">Application Deadline</span>
                    <span class="detail-value">{{ currentProgram.application_deadline }}</span>
                  </div>
                </div>

                <div class="detail-card" v-if="currentProgram.visa_processing_time">
                  <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <div class="detail-info">
                    <span class="detail-label">Visa Processing</span>
                    <span class="detail-value">{{ currentProgram.visa_processing_time }}</span>
                  </div>
                </div>

                <div class="detail-card" v-if="currentProgram.work_permit">
                  <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                  <div class="detail-info">
                    <span class="detail-label">Work Permit</span>
                    <span class="detail-value">{{ currentProgram.work_permit }}</span>
                  </div>
                </div>

                <div class="detail-card" v-if="currentProgram.international_students_count">
                  <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  <div class="detail-info">
                    <span class="detail-label">International Students</span>
                    <span class="detail-value">{{ formatNumber(currentProgram.international_students_count) }}+</span>
                  </div>
                </div>
              </div>

              <!-- Services Offered -->
              <div class="services-offered" v-if="currentProgram.services && currentProgram.services.length">
                <h4>Services We Provide</h4>
                <div class="services-grid">
                  <div v-for="service in currentProgram.services" :key="service.id" class="service-card-small">
                    <svg class="service-icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>{{ service.service_details }}</span>
                  </div>
                </div>
              </div>

              <!-- Specializations -->
              <div class="specializations" v-if="currentProgram.specializations && currentProgram.specializations.length">
                <h4>Popular Specializations</h4>
                <div class="spec-tags">
                  <span v-for="spec in currentProgram.specializations" :key="spec.id" class="spec-tag">
                    {{ spec.details }}
                  </span>
                </div>
              </div>

              <!-- Eligibility Requirements -->
              <div class="eligibility-requirements" v-if="currentProgram.eligibilities && currentProgram.eligibilities.length">
                <h4>Eligibility Requirements</h4>
                <div class="requirements-list-program">
                  <div v-for="req in currentProgram.eligibilities" :key="req.id" class="requirement-item-program">
                    <svg class="check-icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>{{ req.details }}</span>
                  </div>
                </div>
              </div>

              <!-- Application Process -->
              <div class="application-process-section" v-if="currentProgram.application_process && currentProgram.application_process.length">
                <h4>Application Process</h4>
                <div class="timeline-program">
                  <div v-for="(step, index) in currentProgram.application_process" :key="step.id" class="timeline-item-program">
                    <div class="timeline-marker-program">
                      <span class="step-number-program">{{ index + 1 }}</span>
                    </div>
                    <div class="timeline-content-program">
                      <h5>{{ step.title }}</h5>
                      <p>{{ step.short_description }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Resources -->
              <div class="resources-section" v-if="currentProgram.resources && currentProgram.resources.length">
                <h4>Download Resources</h4>
                <div class="resources-grid">
                  <a v-for="resource in currentProgram.resources" :key="resource.id" :href="getResourceUrl(resource.file_path)" target="_blank" class="resource-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    <span>{{ resource.file_name || 'Download Resource' }}</span>
                  </a>
                </div>
              </div>

              <!-- Apply Button -->
              <div class="apply-section">
                <button @click="scrollToForm" class="apply-now-btn">
                  Apply for {{ getProgramName(currentProgram.program_id) }}
                </button>
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
              <p>Take the first step towards your dream education in {{ countryData.name }}. Our expert counselors are here to guide you.</p>
              
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
                
                <div v-if="formError && !isLoading" class="error-message">
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
    </div>

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
  name: 'CountryDetailsPage',
  data() {
    return {
      isLoading: false,
      countryData: {
        name: '',
        programs: [],
        id: null
      },
      selectedProgramIndex: 0,
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
      programNameMapping: {
        9: 'Graduate',
        10: 'Undergraduate',
        11: 'Post Graduate',
        3: 'Diploma',
        0: 'General Program'
      }
    }
  },

  computed: {
    countryId() {
      // Get country ID from route params
      return this.$route.params.id || this.$route.params.countryId;
    },
    minDate() {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      return tomorrow.toISOString().split('T')[0]
    },
    currentProgram() {
      if (!this.countryData || !this.activePrograms || !Array.isArray(this.activePrograms)) {
        return null;
      }
      return this.activePrograms[this.selectedProgramIndex] || null;
    },
    activePrograms() {
      if (!this.countryData || !this.countryData.programs) {
        return [];
      }
      return this.countryData.programs.filter(p => p.status === 'active');
    },
    totalUniversities() {
      if (!this.countryData || !this.countryData.programs) return 0;
      return this.countryData.programs.reduce((sum, program) => {
        return sum + (program.partner_university_count || 0);
      }, 0);
    },
    totalStudents() {
      if (!this.countryData || !this.countryData.programs) return 0;
      return this.countryData.programs.reduce((sum, program) => {
        return sum + (program.international_students_count || 0);
      }, 0);
    }
  },

  mounted() {
    this.fetchCountryData();
    this.fetchProgramOptions();
    this.fetchCountryOptions();
  },

  methods: {
    async fetchCountryData() {
      // Validate countryId exists
      if (!this.countryId) {
        console.error('No country ID found in route');
        this.formError = 'Invalid country ID. Please navigate from the countries page.';
        return;
      }

      this.isLoading = true;
      this.formError = null;
      
      try {
        const response = await axios.get(process.env.VUE_APP_BASE_API+`/country/${this.countryId}`);
        
        console.log('API Response:', response.data);
        
        if (response.data && response.data.country) {
          this.countryData = response.data.country;
          
          // Ensure programs array exists
          if (!this.countryData.programs || !Array.isArray(this.countryData.programs)) {
            this.countryData.programs = [];
          }
          
          // Set default country_id in form
          if (this.countryData.id) {
            this.formData.country_id = this.countryData.id;
          }
          
          // Set default program_id if available
          if (this.activePrograms.length > 0 && this.activePrograms[0].program_id) {
            this.formData.program_id = this.activePrograms[0].program_id;
          }
          
          console.log('Country Data loaded successfully:', {
            name: this.countryData.name,
            id: this.countryData.id,
            programsCount: this.countryData.programs.length,
            activeProgramsCount: this.activePrograms.length
          });
        } else {
          console.error('API response missing country data:', response.data);
          this.formError = 'Failed to load country details. Invalid data received.';
        }
      } catch (error) {
        console.error('Error fetching country data:', error);
        if (error.response) {
          console.error('Error response:', error.response.data);
          console.error('Error status:', error.response.status);
          this.formError = `Failed to load country details: ${error.response.status}`;
        } else if (error.request) {
          console.error('No response received:', error.request);
          this.formError = 'Failed to load country details. No response from server.';
        } else {
          console.error('Error message:', error.message);
          this.formError = 'Failed to load country details. Please check your connection.';
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

    getProgramName(programId) {
      return this.programNameMapping[programId] || `Program ${programId}`;
    },

    getImageUrl(path) {
      if (!path) return '';
      return `${process.env.VUE_APP_BASE_URL}/${path}`;
    },

    getResourceUrl(path) {
      if (!path) return '#';
      return `${process.env.VUE_APP_BASE_URL}/${path}`;
    },

    formatNumber(num) {
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      }
      return num;
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
      const countryId = this.countryData && this.countryData.id ? this.countryData.id : '';
      const programId = this.activePrograms.length > 0 && this.activePrograms[0].program_id 
        ? this.activePrograms[0].program_id 
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

.country-flag-badge {
  width: 100px;
  height: 100px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 20px;
  background: white;
  padding: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.flag-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  flex-wrap: wrap;
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

/* Programs Section */
.programs-section {
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

.programs-tabs {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 48px;
  flex-wrap: wrap;
}

.program-tab {
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

.program-tab:hover {
  border-color: #1E40AF;
  color: #1E40AF;
}

.program-tab.active {
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  color: white;
  border-color: transparent;
}

.tab-icon {
  width: 20px;
  height: 20px;
}

.program-content {
  background: #F9FAFB;
  padding: 48px;
  border-radius: 16px;
  border: 2px solid #E5E7EB;
}

.program-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 2px solid #E5E7EB;
}

.program-info {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  flex: 1;
}

.program-icon-large {
  width: 48px;
  height: 48px;
  color: #EF4444;
  flex-shrink: 0;
}

.program-info h3 {
  font-size: 32px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 8px;
}

.program-tagline {
  font-size: 16px;
  color: #6B7280;
  line-height: 1.6;
}

.program-stats-mini {
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

/* Program Details Grid */
.program-details-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.detail-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.detail-icon {
  width: 32px;
  height: 32px;
  color: #1E40AF;
  flex-shrink: 0;
}

.detail-info {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 4px;
}

.detail-value {
  font-size: 16px;
  font-weight: 700;
  color: #1E3A8A;
}

/* Services */
.services-offered {
  margin-bottom: 40px;
}

.services-offered h4 {
  font-size: 22px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 24px;
}

.services-grid {
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

/* Specializations */
.specializations {
  margin-bottom: 40px;
}

.specializations h4 {
  font-size: 22px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 24px;
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

/* Eligibility Requirements */
.eligibility-requirements {
  margin-bottom: 40px;
}

.eligibility-requirements h4 {
  font-size: 22px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 24px;
}

.requirements-list-program {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.requirement-item-program {
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

/* Application Process */
.application-process-section {
  margin-bottom: 40px;
}

.application-process-section h4 {
  font-size: 22px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 24px;
}

.timeline-program {
  position: relative;
  padding-left: 32px;
}

.timeline-program::before {
  content: '';
  position: absolute;
  left: 12px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, #1E40AF 0%, #EF4444 100%);
}

.timeline-item-program {
  position: relative;
  margin-bottom: 24px;
  background: white;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
}

.timeline-item-program:last-child {
  margin-bottom: 0;
}

.timeline-marker-program {
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

.step-number-program {
  font-size: 12px;
  font-weight: 700;
  color: #1E40AF;
}

.timeline-content-program h5 {
  font-size: 16px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 6px;
}

.timeline-content-program p {
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
}

/* Resources */
.resources-section {
  margin-bottom: 40px;
}

.resources-section h4 {
  font-size: 22px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 24px;
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.resource-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: white;
  border-radius: 8px;
  color: #1E40AF;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  border: 1px solid #E5E7EB;
  transition: all 0.3s ease;
}

.resource-link:hover {
  background: #1E40AF;
  color: white;
  border-color: #1E40AF;
}

.resource-link svg {
  width: 20px;
  height: 20px;
}

/* Apply Section */
.apply-section {
  text-align: center;
  padding-top: 20px;
}

.apply-now-btn {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: white;
  border: none;
  padding: 16px 48px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.apply-now-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
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

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
  }

  .program-details-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .resources-grid {
    grid-template-columns: 1fr;
  }

  .form-wrapper {
    grid-template-columns: 1fr;
    padding: 40px;
  }

  .program-header {
    flex-direction: column;
    gap: 24px;
  }

  .program-stats-mini {
    width: 100%;
    justify-content: space-around;
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

  .program-content {
    padding: 24px;
  }

  .program-details-grid {
    grid-template-columns: 1fr;
  }

  .form-wrapper {
    padding: 24px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .programs-tabs {
    flex-direction: column;
  }

  .program-tab {
    width: 100%;
    justify-content: center;
  }

  .modal-content {
    padding: 32px 24px;
  }
}
</style>