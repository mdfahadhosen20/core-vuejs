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
              <rect x="150" y="150" width="200" height="140" rx="8" fill="url(#grad1)"/>
              <path d="M150,150 L250,220 L350,150" fill="none" stroke="white" stroke-width="4"/>
              <polygon points="150,150 250,220 350,150 350,160 250,230 150,160" fill="url(#grad2)" opacity="0.8"/>
              <g class="plane plane-1">
                <path d="M100,100 L120,110 L105,115 Z" fill="url(#grad2)"/>
              </g>
              <g class="plane plane-2">
                <path d="M380,120 L400,130 L385,135 Z" fill="url(#grad2)"/>
              </g>
              <g class="plane plane-3">
                <path d="M90,250 L110,260 L95,265 Z" fill="url(#grad1)"/>
              </g>
              <circle cx="80" cy="180" r="25" fill="url(#grad2)" opacity="0.2"/>
              <circle cx="420" cy="200" r="30" fill="url(#grad1)" opacity="0.2"/>
              <circle cx="400" cy="300" r="20" fill="url(#grad2)" opacity="0.3"/>
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

            <!-- Loading skeleton for contact cards -->
            <div v-if="systemLoading" class="contact-cards">
              <div v-for="i in 4" :key="i" class="contact-card skeleton-card">
                <div class="skeleton-icon"></div>
                <div class="skeleton-content">
                  <div class="skeleton-line short"></div>
                  <div class="skeleton-line"></div>
                  <div class="skeleton-line medium"></div>
                </div>
              </div>
            </div>

            <!-- Contact Cards -->
            <div v-else class="contact-cards">
              <!-- Address Card -->
              <div class="contact-card" v-if="systemData">
                <div class="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div class="card-content">
                  <h4>Visit Our Office</h4>
                  <p>
                    {{ systemData.address }}<br>
                    {{ systemData.city }}
                    <template v-if="systemData.state">, {{ systemData.state }}</template>
                    <template v-if="systemData.zip_code"> {{ systemData.zip_code }}</template><br>
                    {{ systemData.country }}
                  </p>
                </div>
              </div>

              <!-- Phone Card -->
              <div class="contact-card" v-if="systemData">
                <div class="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div class="card-content">
                  <h4>Call Us</h4>
                  <p>
                    <a :href="`tel:${systemData.phone}`">{{ systemData.phone }}</a>
                    <template v-if="systemData.alternate_phone && systemData.alternate_phone !== systemData.phone">
                      <br><a :href="`tel:${systemData.alternate_phone}`">{{ systemData.alternate_phone }}</a>
                    </template>
                    <template v-if="systemData.whatsapp">
                      <br><a :href="`https://wa.me/${systemData.whatsapp}`" target="_blank" class="whatsapp-link">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        WhatsApp
                      </a>
                    </template>
                    <span class="availability" v-if="systemData.business_hours">{{ systemData.business_hours }}</span>
                    <span class="availability" v-else>Mon-Fri: 9AM - 6PM</span>
                  </p>
                </div>
              </div>

              <!-- Email Card -->
              <div class="contact-card" v-if="systemData">
                <div class="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div class="card-content">
                  <h4>Email Us</h4>
                  <p>
                    <a :href="`mailto:${systemData.email}`">{{ systemData.email }}</a>
                    <span class="availability">We reply within 24 hours</span>
                  </p>
                </div>
              </div>

              <!-- Social Media Card -->
              <div class="contact-card" v-if="systemData && hasSocialLinks">
                <div class="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="18" cy="5" r="3"/>
                    <circle cx="6" cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                </div>
                <div class="card-content">
                  <h4>Follow Us</h4>
                  <div class="social-row">
                    <a v-if="systemData.facebook" :href="systemData.facebook" target="_blank" class="social-icon facebook" title="Facebook">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                      </svg>
                    </a>
                    <a v-if="systemData.twitter" :href="systemData.twitter" target="_blank" class="social-icon twitter" title="Twitter">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                      </svg>
                    </a>
                    <a v-if="systemData.instagram" :href="systemData.instagram" target="_blank" class="social-icon instagram" title="Instagram">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <path fill="white" d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line stroke="white" x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                    </a>
                    <a v-if="systemData.linkedin" :href="systemData.linkedin" target="_blank" class="social-icon linkedin" title="LinkedIn">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                        <circle cx="4" cy="4" r="2"/>
                      </svg>
                    </a>
                    <a v-if="systemData.youtube" :href="systemData.youtube" target="_blank" class="social-icon youtube" title="YouTube">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                        <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                      </svg>
                    </a>
                  </div>
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

              <!-- Error alert -->
              <div v-if="formError" class="alert alert-error">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                <span>{{ formError }}</span>
              </div>

              <form @submit.prevent="submitForm" class="contact-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="firstName">First Name <span class="required">*</span></label>
                    <input
                      type="text"
                      id="firstName"
                      v-model="formData.firstName"
                      required
                      placeholder="John"
                      :disabled="isSubmitting"
                    />
                  </div>
                  <div class="form-group">
                    <label for="lastName">Last Name <span class="required">*</span></label>
                    <input
                      type="text"
                      id="lastName"
                      v-model="formData.lastName"
                      required
                      placeholder="Doe"
                      :disabled="isSubmitting"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="email">Email Address <span class="required">*</span></label>
                    <input
                      type="email"
                      id="email"
                      v-model="formData.email"
                      required
                      placeholder="john.doe@example.com"
                      :disabled="isSubmitting"
                    />
                  </div>
                  <div class="form-group">
                    <label for="phone">Phone Number <span class="required">*</span></label>
                    <input
                      type="tel"
                      id="phone"
                      v-model="formData.phone"
                      required
                      placeholder="+1 234 567 8900"
                      :disabled="isSubmitting"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="subject">Subject <span class="required">*</span></label>
                  <select id="subject" v-model="formData.subject" required :disabled="isSubmitting">
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Undergraduate Programs">Undergraduate Programs</option>
                    <option value="Graduate Programs">Graduate Programs</option>
                    <option value="Postgraduate/PhD Programs">Postgraduate/PhD Programs</option>
                    <option value="Visa Assistance">Visa Assistance</option>
                    <option value="Scholarship Information">Scholarship Information</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <!-- Country dropdown from API -->
                <div class="form-group">
                  <label for="country">Preferred Country</label>
                  <select id="country" v-model="formData.preferred_country" :disabled="isSubmitting">
                    <option value="">Select a country (Optional)</option>
                    <option
                      v-for="country in countries"
                      :key="country.value"
                      :value="country.value"
                    >
                      {{ country.label }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="message">Your Message <span class="required">*</span></label>
                  <textarea
                    id="message"
                    v-model="formData.message"
                    rows="6"
                    required
                    maxlength="1000"
                    placeholder="Tell us about your goals, questions, or concerns..."
                    :disabled="isSubmitting"
                  ></textarea>
                  <span class="char-count" :class="{ 'near-limit': formData.message.length > 900 }">
                    {{ formData.message.length }} / 1000
                  </span>
                </div>

                <div class="form-group checkbox-group" v-if="systemData?.enable_newsletter">
                  <input
                    type="checkbox"
                    id="newsletter"
                    v-model="formData.send_updates"
                    :disabled="isSubmitting"
                  />
                  <label for="newsletter">
                    Send me updates about study abroad opportunities and events
                  </label>
                </div>

                <div class="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="terms"
                    v-model="formData.terms_conditions"
                    required
                    :disabled="isSubmitting"
                  />
                  <label for="terms">
                    I agree to the <a href="#terms">Terms & Conditions</a> and <a href="#privacy">Privacy Policy</a> <span class="required">*</span>
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
                  <span v-else class="loading-text">
                    <svg class="spinner-svg" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"/>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="4" fill="none"/>
                    </svg>
                    Sending...
                  </span>
                </button>
              </form>
            </div>

            <!-- Quick Stats -->
            <!-- <div class="quick-stats">
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
            </div> -->
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
          <p>Thank you for reaching out to us. We've received your message and will get back to you within 24 hours.</p>
          <p class="confirmation-email">
            A confirmation has been sent to <strong>{{ submittedEmail }}</strong>
          </p>
          <button @click="closeModal" class="modal-btn">Close</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ContactPage',
  data() {
    return {
      systemData: null,
      systemLoading: true,
      countries: [],
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        preferred_country: '',
        message: '',
        send_updates: false,
        terms_conditions: false
      },
      isSubmitting: false,
      showSuccessModal: false,
      formError: null,
      submittedEmail: ''
    }
  },

  computed: {
    hasSocialLinks() {
      if (!this.systemData) return false;
      return this.systemData.facebook || this.systemData.twitter ||
             this.systemData.instagram || this.systemData.linkedin ||
             this.systemData.youtube;
    }
  },

  mounted() {
    this.fetchSystemData();
    this.fetchCountries();
  },

  methods: {
    async fetchSystemData() {
      this.systemLoading = true;
      try {
        const response = await axios.get(process.env.VUE_APP_BASE_API+'/system');
        if (response.data && response.data.system) {
          this.systemData = response.data.system;
        }
      } catch (error) {
        console.error('Error fetching system data:', error);
      } finally {
        this.systemLoading = false;
      }
    },

    async fetchCountries() {
      try {
        const response = await axios.get(process.env.VUE_APP_BASE_API+'/system/countries');
        if (response.data && response.data.countries) {
          this.countries = response.data.countries;
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    },

    async submitForm() {
      this.isSubmitting = true;
      this.formError = null;

      try {
        // Build the full name and payload matching the backend expectations
        const payload = {
          name: `${this.formData.firstName} ${this.formData.lastName}`.trim(),
          email: this.formData.email,
          phone: this.formData.phone,
          subject: this.formData.subject,
          preferred_country: this.formData.preferred_country || null,
          message: this.formData.message,
          send_updates: this.formData.send_updates ? '1' : '0',
          terms_conditions: this.formData.terms_conditions ? '1' : '0'
        };

        const response = await axios.post(process.env.VUE_APP_BASE_API+'/contact', payload);

        if (response.status === 201) {
          this.submittedEmail = this.formData.email;
          this.showSuccessModal = true;
          this.resetForm();
        }
      } catch (error) {
        console.error('Error submitting form:', error);

        if (error.response) {
          if (error.response.status === 422) {
            // Validation errors
            const errors = error.response.data.errors;
            if (errors) {
              const messages = Object.values(errors).flat();
              this.formError = messages.join(', ');
            } else {
              this.formError = error.response.data.message || 'Validation failed. Please check your inputs.';
            }
          } else {
            this.formError = error.response.data.message || 'An error occurred. Please try again.';
          }
        } else if (error.request) {
          this.formError = 'Unable to connect to server. Please check your connection.';
        } else {
          this.formError = 'An unexpected error occurred. Please try again.';
        }
      } finally {
        this.isSubmitting = false;
      }
    },

    resetForm() {
      this.formData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        preferred_country: '',
        message: '',
        send_updates: false,
        terms_conditions: false
      };
      this.formError = null;
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

.plane-1 { animation-delay: 0s; }
.plane-2 { animation-delay: 1s; }
.plane-3 { animation-delay: 2s; }

@keyframes fly {
  0%, 100% { transform: translate(0, 0); opacity: 0.5; }
  50% { transform: translate(20px, -20px); opacity: 1; }
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

/* Left Side */
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
  line-height: 1.8;
}

.card-content a {
  color: #1E40AF;
  text-decoration: none;
  transition: color 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.card-content a:hover {
  color: #EF4444;
}

.whatsapp-link {
  color: #25D366 !important;
}

.whatsapp-link:hover {
  color: #128C7E !important;
}

.availability {
  display: block;
  font-size: 13px;
  color: #9CA3AF;
  margin-top: 6px;
}

/* Social Icons */
.social-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.social-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-icon svg {
  width: 18px;
  height: 18px;
}

.social-icon:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.social-icon.facebook { background: #1877F2; }
.social-icon.twitter { background: #1DA1F2; }
.social-icon.instagram { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
.social-icon.linkedin { background: #0A66C2; }
.social-icon.youtube { background: #FF0000; }

/* Skeleton Loading */
.skeleton-card {
  border: none !important;
  cursor: default;
  transform: none !important;
  pointer-events: none;
}

.skeleton-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  flex-shrink: 0;
}

.skeleton-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
}

.skeleton-line {
  height: 14px;
  border-radius: 4px;
  background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  width: 100%;
}

.skeleton-line.short { width: 40%; height: 16px; }
.skeleton-line.medium { width: 70%; }

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Right Side - Form */
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
  margin-bottom: 28px;
}

/* Alert */
.alert {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 10px;
  margin-bottom: 24px;
  font-size: 14px;
  line-height: 1.5;
}

.alert svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 1px;
}

.alert-error {
  background: #FEE2E2;
  border: 1px solid #EF4444;
  color: #991B1B;
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
}

.required {
  color: #EF4444;
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
  color: #1f2937;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #1E40AF;
  box-shadow: 0 0 0 4px rgba(30, 64, 175, 0.1);
}

.form-group input:disabled,
.form-group select:disabled,
.form-group textarea:disabled {
  background: #f9fafb;
  cursor: not-allowed;
  opacity: 0.7;
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

.char-count.near-limit {
  color: #EF4444;
  font-weight: 600;
}

.checkbox-group {
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
}

.checkbox-group input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin-top: 3px;
  flex-shrink: 0;
}

.checkbox-group label {
  margin: 0;
  font-size: 14px;
  color: #6B7280;
  cursor: pointer;
  font-weight: 500;
  line-height: 1.5;
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

.submit-btn span {
  display: flex;
  align-items: center;
  gap: 10px;
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
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-text {
  display: flex;
  align-items: center;
  gap: 10px;
}

.spinner-svg {
  width: 20px;
  height: 20px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
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
  width: 100%;
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
  100% { stroke-dashoffset: 0; }
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

  .form-row {
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