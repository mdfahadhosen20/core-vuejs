<template>
  <div class="program-details-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="container">
        <div class="breadcrumb">
          <a href="#home">Home</a>
          <span class="separator">›</span>
          <a href="#services">Services</a>
          <span class="separator">›</span>
          <span class="current">{{ programData.name }}</span>
        </div>
        <div class="hero-content">
          <div class="hero-text">
            <div class="program-badge">{{ programData.level }}</div>
            <h1 class="hero-title">{{ programData.name }}</h1>
            <p class="hero-description">{{ programData.description }}</p>
            <div class="hero-stats">
              <div class="stat-box">
                <span class="stat-number">{{ programData.duration }}</span>
                <span class="stat-label">Duration</span>
              </div>
              <div class="stat-box">
                <span class="stat-number">{{ programData.universities }}</span>
                <span class="stat-label">Partner Universities</span>
              </div>
              <div class="stat-box">
                <span class="stat-number">{{ programData.successRate }}</span>
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

    <!-- Program Overview -->
    <div class="overview-section">
      <div class="container">
        <div class="content-grid">
          <div class="main-content">
            <section class="content-section">
              <h2 class="section-title">Program Overview</h2>
              <p class="section-text">{{ programData.overview }}</p>
              
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

            <section class="content-section">
              <h2 class="section-title">Eligibility Requirements</h2>
              <div class="requirements-list">
                <div v-for="(req, index) in programData.requirements" :key="index" class="requirement-item">
                  <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>{{ req }}</span>
                </div>
              </div>
            </section>

            <section class="content-section">
              <h2 class="section-title">Application Process</h2>
              <div class="timeline">
                <div v-for="(step, index) in applicationSteps" :key="index" class="timeline-item">
                  <div class="timeline-marker">
                    <span class="step-number">{{ index + 1 }}</span>
                  </div>
                  <div class="timeline-content">
                    <h4>{{ step.title }}</h4>
                    <p>{{ step.description }}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Sidebar -->
          <div class="sidebar">
            <div class="sticky-sidebar">
              <div class="info-card">
                <h3>Quick Information</h3>
                <div class="info-list">
                  <div class="info-item">
                    <span class="info-label">Program Level:</span>
                    <span class="info-value">{{ programData.level }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Duration:</span>
                    <span class="info-value">{{ programData.duration }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Intake:</span>
                    <span class="info-value">{{ programData.intake }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Application Fee:</span>
                    <span class="info-value">{{ programData.applicationFee }}</span>
                  </div>
                </div>
                <button class="quick-apply-btn" @click="scrollToForm">Apply Now</button>
              </div>

              <div class="info-card">
                <h3>Download Resources</h3>
                <a href="#" class="download-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Program Brochure (PDF)
                </a>
                <a href="#" class="download-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Application Checklist
                </a>
                <a href="#" class="download-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Scholarship Guide
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Country-Wise Services -->
    <div class="country-services-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-main-title">Country-Wise Services</h2>
          <p class="section-subtitle">Specialized support for your chosen destination</p>
        </div>

        <div class="countries-tabs">
          <button 
            v-for="country in countries" 
            :key="country.code"
            :class="['country-tab', { active: selectedCountry === country.code }]"
            @click="selectedCountry = country.code"
          >
            <span class="flag-icon">{{ country.flag }}</span>
            <span class="country-name">{{ country.name }}</span>
          </button>
        </div>

        <transition name="fade" mode="out-in">
          <div :key="selectedCountry" class="country-content">
            <div class="country-header">
              <div class="country-info">
                <span class="flag-large">{{ getCountryData(selectedCountry).flag }}</span>
                <div>
                  <h3>{{ getCountryData(selectedCountry).name }}</h3>
                  <p class="country-tagline">{{ getCountryData(selectedCountry).tagline }}</p>
                </div>
              </div>
              <div class="country-stats-mini">
                <div class="mini-stat">
                  <span class="mini-stat-value">{{ getCountryData(selectedCountry).universities }}</span>
                  <span class="mini-stat-label">Universities</span>
                </div>
                <div class="mini-stat">
                  <span class="mini-stat-value">{{ getCountryData(selectedCountry).avgCost }}</span>
                  <span class="mini-stat-label">Avg. Tuition</span>
                </div>
              </div>
            </div>

            <div class="services-offered">
              <h4>Services We Provide for {{ getCountryData(selectedCountry).name }}</h4>
              <div class="services-grid-country">
                <div v-for="(service, index) in getCountryData(selectedCountry).services" :key="index" class="service-card-small">
                  <svg class="service-icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>{{ service }}</span>
                </div>
              </div>
            </div>

            <div class="specializations">
              <h4>Popular Specializations</h4>
              <div class="spec-tags">
                <span v-for="(spec, index) in getCountryData(selectedCountry).specializations" :key="index" class="spec-tag">
                  {{ spec }}
                </span>
              </div>
            </div>

            <div class="important-info">
              <h4>Important Information</h4>
              <div class="info-boxes">
                <div class="info-box-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <div>
                    <strong>Application Deadline</strong>
                    <p>{{ getCountryData(selectedCountry).deadline }}</p>
                  </div>
                </div>
                <div class="info-box-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <div>
                    <strong>Visa Processing Time</strong>
                    <p>{{ getCountryData(selectedCountry).visaTime }}</p>
                  </div>
                </div>
                <div class="info-box-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <div>
                    <strong>Work Permit</strong>
                    <p>{{ getCountryData(selectedCountry).workPermit }}</p>
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
              
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">First Name *</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    v-model="formData.firstName" 
                    required
                    placeholder="John"
                  />
                </div>
                <div class="form-group">
                  <label for="lastName">Last Name *</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    v-model="formData.lastName" 
                    required
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="formData.email" 
                    required
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
                  <select id="program" v-model="formData.program" required>
                    <option value="">Select a program</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="graduate">Graduate</option>
                    <option value="postgraduate">Postgraduate / PhD</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="country">Preferred Country *</label>
                  <select id="country" v-model="formData.country" required>
                    <option value="">Select a country</option>
                    <option value="usa">United States</option>
                    <option value="canada">Canada</option>
                    <option value="uk">United Kingdom</option>
                    <option value="malaysia">Malaysia</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="fieldOfStudy">Field of Study *</label>
                <input 
                  type="text" 
                  id="fieldOfStudy" 
                  v-model="formData.fieldOfStudy" 
                  required
                  placeholder="e.g., Computer Science, Business Administration"
                />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="currentEducation">Current Education Level *</label>
                  <select id="currentEducation" v-model="formData.currentEducation" required>
                    <option value="">Select your level</option>
                    <option value="high-school">High School</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="intakeYear">Preferred Intake *</label>
                  <select id="intakeYear" v-model="formData.intakeYear" required>
                    <option value="">Select intake</option>
                    <option value="2025-fall">Fall 2025</option>
                    <option value="2026-spring">Spring 2026</option>
                    <option value="2026-fall">Fall 2026</option>
                    <option value="2027-spring">Spring 2027</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="appointmentDate">Preferred Appointment Date *</label>
                <input 
                  type="date" 
                  id="appointmentDate" 
                  v-model="formData.appointmentDate" 
                  required
                  :min="minDate"
                />
              </div>

              <div class="form-group">
                <label for="appointmentTime">Preferred Time *</label>
                <select id="appointmentTime" v-model="formData.appointmentTime" required>
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
                  v-model="formData.message" 
                  rows="4"
                  placeholder="Tell us about your goals, concerns, or any specific questions you have..."
                ></textarea>
              </div>

              <div class="form-group checkbox-group">
                <input 
                  type="checkbox" 
                  id="terms" 
                  v-model="formData.agreeToTerms" 
                  required
                />
                <label for="terms">
                  I agree to the <a href="#terms">Terms & Conditions</a> and <a href="#privacy">Privacy Policy</a>
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
          <p class="confirmation-details">
            A confirmation email has been sent to <strong>{{ formData.email }}</strong>
          </p>
          <button @click="closeModal" class="modal-close-btn">Close</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ProgramDetailsPage',
  data() {
    return {
      // Program data - this would typically come from props or API
      programData: {
        name: 'Graduate Programs',
        level: 'Master\'s Degree',
        description: 'Advance your career with a prestigious master\'s degree from world-renowned universities. Our comprehensive support ensures your success every step of the way.',
        duration: '1-2 Years',
        universities: '500+',
        successRate: '95%',
        intake: 'Fall, Spring, Summer',
        applicationFee: 'Varies by university',
        overview: 'Graduate programs offer advanced study in your chosen field, providing specialized knowledge and research opportunities. Whether you\'re looking to switch careers, advance in your current field, or pursue research, a master\'s degree opens doors to new opportunities. Our expert counselors work with you to identify the best programs that match your academic background, career goals, and budget.',
        requirements: [
          'Bachelor\'s degree from an accredited institution',
          'Minimum GPA of 3.0 (or equivalent)',
          'English proficiency test (IELTS 6.5+ or TOEFL 90+)',
          'GRE/GMAT scores (required for most programs)',
          'Letters of recommendation (2-3)',
          'Statement of Purpose',
          'Resume/CV with relevant experience',
          'Passport valid for at least 2 years'
        ]
      },
      
      applicationSteps: [
        {
          title: 'Initial Consultation',
          description: 'Meet with our counselors to discuss your goals, evaluate your profile, and shortlist universities.'
        },
        {
          title: 'Test Preparation',
          description: 'Prepare for required tests (IELTS/TOEFL, GRE/GMAT) with our expert coaching programs.'
        },
        {
          title: 'Document Preparation',
          description: 'Work with our team to craft compelling SOPs, secure strong LORs, and prepare all required documents.'
        },
        {
          title: 'Application Submission',
          description: 'Submit applications to your shortlisted universities with our guidance on deadlines and requirements.'
        },
        {
          title: 'Scholarship Assistance',
          description: 'Apply for scholarships and financial aid opportunities to reduce your education costs.'
        },
        {
          title: 'Visa Processing',
          description: 'Receive expert guidance through the visa application process, including interview preparation.'
        },
        {
          title: 'Pre-Departure Support',
          description: 'Get assistance with accommodation, travel arrangements, and orientation for your new journey.'
        }
      ],

      countries: [
        { code: 'usa', name: 'USA', flag: '🇺🇸' },
        { code: 'canada', name: 'Canada', flag: '🇨🇦' },
        { code: 'uk', name: 'UK', flag: '🇬🇧' },
        { code: 'malaysia', name: 'Malaysia', flag: '🇲🇾' }
      ],

      selectedCountry: 'usa',

      countryDetails: {
        usa: {
          flag: '🇺🇸',
          name: 'United States',
          tagline: 'Home to the world\'s top-ranked universities',
          universities: '5,000+',
          avgCost: '$30K-$60K/year',
          services: [
            'University shortlisting & application support',
            'GRE/GMAT preparation & guidance',
            'F-1 student visa processing',
            'Scholarship & funding assistance',
            'CPT/OPT work authorization help',
            'Pre-departure orientation',
            'Accommodation assistance',
            'Post-study work guidance'
          ],
          specializations: ['Computer Science', 'MBA', 'Engineering', 'Data Science', 'Healthcare', 'Finance'],
          deadline: 'Fall: Dec-Feb | Spring: Sep-Oct',
          visaTime: '3-5 weeks',
          workPermit: 'CPT during study, OPT 12-36 months after'
        },
        canada: {
          flag: '🇨🇦',
          name: 'Canada',
          tagline: 'Quality education with excellent immigration pathways',
          universities: '400+',
          avgCost: '$20K-$35K/year',
          services: [
            'University & college application support',
            'Study permit processing',
            'Post-Graduation Work Permit (PGWP) guidance',
            'Provincial Nominee Program (PNP) assistance',
            'Co-op program placement support',
            'Accommodation & settlement services',
            'Part-time work authorization',
            'Permanent residency pathway guidance'
          ],
          specializations: ['Business Analytics', 'AI & Machine Learning', 'Environmental Science', 'Nursing', 'Hospitality'],
          deadline: 'Fall: Jan-Mar | Winter: Sep-Nov',
          visaTime: '4-8 weeks',
          workPermit: '20 hrs/week during study, PGWP up to 3 years'
        },
        uk: {
          flag: '🇬🇧',
          name: 'United Kingdom',
          tagline: 'Historic universities with globally recognized degrees',
          universities: '160+',
          avgCost: '£15K-£35K/year',
          services: [
            'UCAS & university application support',
            'Student visa (Tier 4) processing',
            'Graduate Route visa guidance',
            'Scholarship application assistance',
            'Accommodation booking services',
            'Bank account & NHS registration help',
            'Part-time work guidance',
            'Career services & networking'
          ],
          specializations: ['Finance', 'International Business', 'Law', 'Medicine', 'Creative Arts', 'Engineering'],
          deadline: 'September: Jan-Jun | January: Sep-Nov',
          visaTime: '3 weeks',
          workPermit: '20 hrs/week during term, 2 years PSW visa'
        },
        malaysia: {
          flag: '🇲🇾',
          name: 'Malaysia',
          tagline: 'Affordable quality education in the heart of Asia',
          universities: '70+',
          avgCost: '$5K-$15K/year',
          services: [
            'University selection & application',
            'Student pass (visa) processing',
            'EMGS approval coordination',
            'Affordable accommodation assistance',
            'Airport pickup services',
            'Medical insurance arrangement',
            'Part-time work guidance',
            'Cultural orientation & support'
          ],
          specializations: ['IT & Computing', 'Business Management', 'Biotechnology', 'Islamic Studies', 'Tourism'],
          deadline: 'February, July, September intakes',
          visaTime: '6-8 weeks',
          workPermit: '20 hrs/week during semester breaks'
        }
      },

      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        program: '',
        country: '',
        fieldOfStudy: '',
        currentEducation: '',
        intakeYear: '',
        appointmentDate: '',
        appointmentTime: '',
        message: '',
        agreeToTerms: false
      },

      isSubmitting: false,
      showSuccessModal: false
    }
  },

  computed: {
    minDate() {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      return tomorrow.toISOString().split('T')[0]
    }
  },

  methods: {
    getCountryData(code) {
      return this.countryDetails[code] || this.countryDetails.usa
    },

    scrollToForm() {
      this.$refs.formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },

    async submitForm() {
      this.isSubmitting = true
      
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', this.formData)
        this.isSubmitting = false
        this.showSuccessModal = true
        this.resetForm()
      }, 1500)
    },

    resetForm() {
      this.formData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        program: '',
        country: '',
        fieldOfStudy: '',
        currentEducation: '',
        intakeYear: '',
        appointmentDate: '',
        appointmentTime: '',
        message: '',
        agreeToTerms: false
      }
    },

    closeModal() {
      this.showSuccessModal = false
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