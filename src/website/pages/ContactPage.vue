<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-background">
        <div class="hero-shape shape-1"></div>
        <div class="hero-shape shape-2"></div>
        <div class="hero-shape shape-3"></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <div class="hero-badge">Get In Touch</div>
            <h1 class="hero-title">Let's Start Your Journey Together</h1>
            <p class="hero-description">
              Have questions about studying abroad? Our expert counselors are here to help you every step of the way. 
              Reach out to us and let's make your dreams a reality.
            </p>
            <div class="hero-features">
              <div class="feature-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>24/7 Support</span>
              </div>
              <div class="feature-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>Quick Response</span>
              </div>
              <div class="feature-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span>Expert Counselors</span>
              </div>
            </div>
          </div>
          <div class="hero-illustration">
            <svg viewBox="0 0 500 400" class="contact-illustration">
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
              <!-- Envelope -->
              <rect x="150" y="150" width="200" height="140" rx="8" fill="url(#grad1)"/>
              <path d="M150,150 L250,220 L350,150" fill="none" stroke="white" stroke-width="4"/>
              <polygon points="150,150 250,220 350,150 350,160 250,230 150,160" fill="url(#grad2)" opacity="0.8"/>
              <!-- Flying paper planes -->
              <g class="plane plane-1">
                <path d="M100,100 L120,110 L105,115 Z" fill="url(#grad2)"/>
              </g>
              <g class="plane plane-2">
                <path d="M380,120 L400,130 L385,135 Z" fill="url(#grad2)"/>
              </g>
              <g class="plane plane-3">
                <path d="M90,250 L110,260 L95,265 Z" fill="url(#grad1)"/>
              </g>
              <!-- Decorative circles -->
              <circle cx="80" cy="180" r="25" fill="url(#grad2)" opacity="0.2"/>
              <circle cx="420" cy="200" r="30" fill="url(#grad1)" opacity="0.2"/>
              <circle cx="400" cy="300" r="20" fill="url(#grad2)" opacity="0.3"/>
              <!-- Message bubbles -->
              <circle cx="180" cy="320" r="15" fill="url(#grad1)" opacity="0.6"/>
              <circle cx="320" cy="330" r="12" fill="url(#grad2)" opacity="0.6"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Contact Section -->
    <div class="main-contact-section">
      <div class="container">
        <div class="contact-grid">
          <!-- Left Side - Contact Information -->
          <div class="contact-info-side">
            <div class="info-header">
              <h2>Contact Information</h2>
              <p>Fill out the form and our team will get back to you within 24 hours</p>
            </div>

            <!-- Contact Cards -->
            <div class="contact-cards">
              <!-- Address Card -->
              <div class="contact-card">
                <div class="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div class="card-content">
                  <h4>Visit Our Office</h4>
                  <p>123 Education Street<br>New York, NY 10001<br>United States</p>
                </div>
              </div>

              <!-- Phone Card -->
              <div class="contact-card">
                <div class="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div class="card-content">
                  <h4>Call Us</h4>
                  <p>
                    <a href="tel:+12345678900">+1 (234) 567-890</a><br>
                    <a href="tel:+12345678901">+1 (234) 567-891</a><br>
                    <span class="availability">Mon-Fri: 9AM - 6PM</span>
                  </p>
                </div>
              </div>

              <!-- Email Card -->
              <div class="contact-card">
                <div class="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div class="card-content">
                  <h4>Email Us</h4>
                  <p>
                    <a href="mailto:info@studentconsult.com">info@studentconsult.com</a><br>
                    <a href="mailto:support@studentconsult.com">support@studentconsult.com</a><br>
                    <span class="availability">We reply within 24 hours</span>
                  </p>
                </div>
              </div>

              <!-- Working Hours Card -->
              <div class="contact-card">
                <div class="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div class="card-content">
                  <h4>Working Hours</h4>
                  <p>
                    Monday - Friday: 9:00 AM - 6:00 PM<br>
                    Saturday: 10:00 AM - 4:00 PM<br>
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <!-- Map -->
            <div class="map-container">
              <div class="map-placeholder">
                <svg viewBox="0 0 400 300" class="map-svg">
                  <defs>
                    <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:#E5E7EB;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#D1D5DB;stop-opacity:1" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="300" fill="url(#mapGrad)"/>
                  <!-- Grid lines -->
                  <line x1="0" y1="100" x2="400" y2="100" stroke="#9CA3AF" stroke-width="1" opacity="0.3"/>
                  <line x1="0" y1="200" x2="400" y2="200" stroke="#9CA3AF" stroke-width="1" opacity="0.3"/>
                  <line x1="100" y1="0" x2="100" y2="300" stroke="#9CA3AF" stroke-width="1" opacity="0.3"/>
                  <line x1="200" y1="0" x2="200" y2="300" stroke="#9CA3AF" stroke-width="1" opacity="0.3"/>
                  <line x1="300" y1="0" x2="300" y2="300" stroke="#9CA3AF" stroke-width="1" opacity="0.3"/>
                  <!-- Roads -->
                  <path d="M50,150 Q150,120 250,150 T400,180" stroke="#6B7280" stroke-width="3" fill="none"/>
                  <path d="M150,0 L180,300" stroke="#6B7280" stroke-width="3"/>
                  <!-- Pin -->
                  <g transform="translate(200, 150)">
                    <ellipse cx="0" cy="35" rx="15" ry="5" fill="#1E40AF" opacity="0.3"/>
                    <path d="M0,-20 C-10,-20 -15,-10 -15,0 C-15,15 0,35 0,35 C0,35 15,15 15,0 C15,-10 10,-20 0,-20 Z" fill="#EF4444"/>
                    <circle cx="0" cy="0" r="6" fill="white"/>
                  </g>
                  <!-- Buildings -->
                  <rect x="80" y="180" width="30" height="40" fill="#4B5563"/>
                  <rect x="120" y="170" width="25" height="50" fill="#4B5563"/>
                  <rect x="280" y="190" width="35" height="30" fill="#4B5563"/>
                  <!-- Windows -->
                  <rect x="85" y="185" width="5" height="5" fill="#FCD34D"/>
                  <rect x="95" y="185" width="5" height="5" fill="#FCD34D"/>
                  <rect x="85" y="195" width="5" height="5" fill="#FCD34D"/>
                  <rect x="95" y="195" width="5" height="5" fill="#FCD34D"/>
                </svg>
                <div class="map-overlay">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>123 Education Street, New York</span>
                  <a href="https://maps.google.com" target="_blank" class="map-link">Get Directions →</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Side - Contact Form -->
          <div class="contact-form-side">
            <div class="form-card">
              <div class="form-header">
                <h3>Send Us a Message</h3>
                <p>Have a specific question? Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>

              <form @submit.prevent="submitForm" class="contact-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="firstName">
                      First Name *
                      <span class="label-icon">👤</span>
                    </label>
                    <input 
                      type="text" 
                      id="firstName" 
                      v-model="formData.firstName" 
                      required
                      placeholder="John"
                    />
                  </div>
                  <div class="form-group">
                    <label for="lastName">
                      Last Name *
                      <span class="label-icon">👤</span>
                    </label>
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
                    <label for="email">
                      Email Address *
                      <span class="label-icon">📧</span>
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      v-model="formData.email" 
                      required
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div class="form-group">
                    <label for="phone">
                      Phone Number *
                      <span class="label-icon">📱</span>
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      v-model="formData.phone" 
                      required
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="subject">
                    Subject *
                    <span class="label-icon">📋</span>
                  </label>
                  <select id="subject" v-model="formData.subject" required>
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="undergraduate">Undergraduate Programs</option>
                    <option value="graduate">Graduate Programs</option>
                    <option value="postgraduate">Postgraduate/PhD Programs</option>
                    <option value="visa">Visa Assistance</option>
                    <option value="scholarship">Scholarship Information</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="country">
                    Preferred Country
                    <span class="label-icon">🌍</span>
                  </label>
                  <select id="country" v-model="formData.country">
                    <option value="">Select a country (Optional)</option>
                    <option value="usa">United States</option>
                    <option value="canada">Canada</option>
                    <option value="uk">United Kingdom</option>
                    <option value="malaysia">Malaysia</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="message">
                    Your Message *
                    <span class="label-icon">✍️</span>
                  </label>
                  <textarea 
                    id="message" 
                    v-model="formData.message" 
                    rows="6"
                    required
                    placeholder="Tell us about your goals, questions, or concerns..."
                  ></textarea>
                  <span class="char-count">{{ formData.message.length }} / 1000</span>
                </div>

                <div class="form-group checkbox-group">
                  <input 
                    type="checkbox" 
                    id="newsletter" 
                    v-model="formData.newsletter"
                  />
                  <label for="newsletter">
                    Send me updates about study abroad opportunities and events
                  </label>
                </div>

                <div class="form-group checkbox-group">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    v-model="formData.agreeToTerms" 
                    required
                  />
                  <label for="terms">
                    I agree to the <a href="#terms">Terms & Conditions</a> and <a href="#privacy">Privacy Policy</a> *
                  </label>
                </div>

                <button type="submit" class="submit-btn" :disabled="isSubmitting">
                  <span v-if="!isSubmitting">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Send Message
                  </span>
                  <span v-else>
                    <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                    Sending...
                  </span>
                </button>
              </form>
            </div>

            <!-- Quick Stats -->
            <div class="quick-stats">
              <div class="stat-box">
                <div class="stat-icon">⚡</div>
                <div class="stat-content">
                  <span class="stat-number">24hrs</span>
                  <span class="stat-label">Response Time</span>
                </div>
              </div>
              <div class="stat-box">
                <div class="stat-icon">🎓</div>
                <div class="stat-content">
                  <span class="stat-number">5000+</span>
                  <span class="stat-label">Students Helped</span>
                </div>
              </div>
              <div class="stat-box">
                <div class="stat-icon">⭐</div>
                <div class="stat-content">
                  <span class="stat-number">95%</span>
                  <span class="stat-label">Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <transition name="modal">
      <div v-if="showSuccessModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="success-animation">
            <svg class="checkmark" viewBox="0 0 52 52">
              <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
              <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>
          <h3>Message Sent Successfully!</h3>
          <p>Thank you for reaching out to StudentConsult. We've received your message and will get back to you within 24 hours.</p>
          <p class="confirmation-email">
            A confirmation has been sent to <strong>{{ formData.email }}</strong>
          </p>
          <button @click="closeModal" class="modal-btn">Close</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ContactPage',
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        country: '',
        message: '',
        newsletter: false,
        agreeToTerms: false
      },
      isSubmitting: false,
      showSuccessModal: false,
      activeFaq: null,
      faqs: [
        {
          question: 'How long does the application process take?',
          answer: 'The application process typically takes 3-6 months from initial consultation to university acceptance, depending on the country and program. We guide you through each step to ensure timely submissions.'
        },
        {
          question: 'Do you charge for consultation services?',
          answer: 'Your first consultation is completely free! After that, we offer flexible packages based on your needs. Our fees cover comprehensive support including application assistance, visa processing, and pre-departure guidance.'
        },
        {
          question: 'Can you help with scholarship applications?',
          answer: 'Absolutely! We have dedicated scholarship advisors who help identify suitable opportunities and guide you through the application process. Many of our students receive partial to full scholarships.'
        },
        {
          question: 'What documents do I need to get started?',
          answer: 'Initially, you\'ll need your academic transcripts, passport copy, and English proficiency test scores (if available). During consultation, we\'ll provide a comprehensive checklist based on your chosen program and country.'
        },
        {
          question: 'Do you provide visa assistance?',
          answer: 'Yes! Visa assistance is a key part of our service. We help with document preparation, application submission, and interview preparation to maximize your chances of visa approval.'
        },
        {
          question: 'How do I track my application status?',
          answer: 'We provide a personalized online portal where you can track all your applications in real-time. You\'ll also receive regular updates via email and phone from your dedicated counselor.'
        }
      ]
    }
  },
  methods: {
    async submitForm() {
      if (this.formData.message.length > 1000) {
        alert('Message is too long. Please keep it under 1000 characters.')
        return
      }

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
        subject: '',
        country: '',
        message: '',
        newsletter: false,
        agreeToTerms: false
      }
    },

    closeModal() {
      this.showSuccessModal = false
    },

    toggleFaq(index) {
      this.activeFaq = this.activeFaq === index ? null : index
    }
  }
}
</script>

<style scoped>
/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  padding: 60px 0 100px;
  position: relative;
  overflow: hidden;
  color: white;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.hero-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: #EF4444;
  top: -100px;
  right: -100px;
}

.shape-2 {
  width: 300px;
  height: 300px;
  background: white;
  bottom: -150px;
  left: -50px;
}

.shape-3 {
  width: 200px;
  height: 200px;
  background: #EF4444;
  top: 50%;
  right: 10%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
}

.hero-content {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-badge {
  display: inline-block;
  background: #EF4444;
  color: white;
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

.hero-features {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 600;
}

.feature-item svg {
  width: 24px;
  height: 24px;
  color: #FCA5A5;
}

.contact-illustration {
  width: 100%;
  max-width: 500px;
}

.plane {
  animation: fly 3s ease-in-out infinite;
}

.plane-1 {
  animation-delay: 0s;
}

.plane-2 {
  animation-delay: 1s;
}

.plane-3 {
  animation-delay: 2s;
}

@keyframes fly {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0.5;
  }
  50% {
    transform: translate(20px, -20px);
    opacity: 1;
  }
}

/* Main Contact Section */
.main-contact-section {
  padding: 80px 0;
  background: #F9FAFB;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 60px;
}

/* Left Side - Contact Info */
.contact-info-side {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.info-header h2 {
  font-size: 32px;
  font-weight: 800;
  color: #1E3A8A;
  margin-bottom: 12px;
}

.info-header p {
  font-size: 16px;
  color: #6B7280;
  line-height: 1.6;
}

.contact-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  display: flex;
  gap: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.contact-card:hover {
  border-color: #1E40AF;
  box-shadow: 0 8px 24px rgba(30, 64, 175, 0.12);
  transform: translateY(-2px);
}

.card-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-icon svg {
  width: 24px;
  height: 24px;
  color: white;
}

.card-content h4 {
  font-size: 18px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 8px;
}

.card-content p {
  font-size: 15px;
  color: #6B7280;
  line-height: 1.6;
}

.card-content a {
  color: #1E40AF;
  text-decoration: none;
  transition: color 0.3s;
}

.card-content a:hover {
  color: #EF4444;
}

.availability {
  display: block;
  font-size: 13px;
  color: #9CA3AF;
  margin-top: 4px;
}

/* Map */
.map-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.map-placeholder {
  position: relative;
  height: 300px;
}

.map-svg {
  width: 100%;
  height: 100%;
}

.map-overlay {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.map-overlay svg {
  width: 24px;
  height: 24px;
  color: #EF4444;
}

.map-overlay span {
  font-size: 15px;
  font-weight: 600;
  color: #1E3A8A;
}

.map-link {
  color: #1E40AF;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: color 0.3s;
}

.map-link:hover {
  color: #EF4444;
}

/* Right Side - Contact Form */
.contact-form-side {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.form-header h3 {
  font-size: 28px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 12px;
}

.form-header p {
  font-size: 15px;
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 32px;
}

.contact-form {
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
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.label-icon {
  font-size: 16px;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 14px 16px;
  border: 2px solid #E5E7EB;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #1E40AF;
  box-shadow: 0 0 0 4px rgba(30, 64, 175, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.char-count {
  font-size: 12px;
  color: #9CA3AF;
  text-align: right;
  margin-top: 4px;
}

.checkbox-group {
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
}

.checkbox-group input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-top: 2px;
  flex-shrink: 0;
}

.checkbox-group label {
  margin: 0;
  font-size: 14px;
  color: #6B7280;
  cursor: pointer;
  font-weight: 500;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 8px;
}

.submit-btn svg {
  width: 20px;
  height: 20px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Quick Stats */
.quick-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-box {
  background: white;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.stat-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(30, 64, 175, 0.15);
}

.stat-icon {
  font-size: 32px;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 20px;
  font-weight: 800;
  color: #1E40AF;
  line-height: 1;
}

.stat-label {
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
}

/* Transitions */
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from, .slide-leave-to {
  opacity: 0;
  max-height: 0;
}

.slide-enter-to, .slide-leave-from {
  opacity: 1;
  max-height: 200px;
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

.success-animation {
  margin: 0 auto 24px;
}

.checkmark {
  width: 80px;
  height: 80px;
  margin: 0 auto;
}

.checkmark-circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke: #10B981;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark-check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  stroke: #10B981;
  stroke-width: 3;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
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

.confirmation-email {
  background: #F9FAFB;
  padding: 16px;
  border-radius: 8px;
  font-size: 14px;
}

.modal-btn {
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

.modal-btn:hover {
  background: #1E3A8A;
  transform: translateY(-2px);
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
  .hero-content,
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .hero-illustration {
    order: -1;
  }

  .quick-stats {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }

  .hero-features {
    flex-direction: column;
    gap: 16px;
  }

  .section-header h2 {
    font-size: 32px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .social-links {
    grid-template-columns: 1fr;
  }

  .form-card {
    padding: 24px;
  }

  .modal-content {
    padding: 32px 24px;
  }
}
</style>