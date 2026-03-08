<template>
  <!-- Teleport to body to avoid z-index stacking issues -->
  <teleport to="body">
    <transition name="modal-backdrop">
      <div
        v-if="modelValue"
        class="modal-backdrop"
        @click.self="close"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <transition name="modal-panel">
          <div v-if="modelValue" class="modal-panel">
            <!-- Close Button -->
            <button class="modal-close" @click="close" aria-label="Close modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <!-- Modal Header -->
            <div class="modal-header">
              <!-- <div class="modal-badge">Free Consultation</div> -->
              <h2 id="modal-title" class="modal-title">Book Your Appointment</h2>
              <p class="modal-subtitle">Fill in your details and our expert counselors will reach out within 24 hours.</p>
            </div>

            <!-- Success State -->
            <transition name="fade">
              <div v-if="submitted" class="success-state">
                <div class="success-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3>Request Submitted!</h3>
                <p>Thank you for choosing StudentConsult. We've received your consultation request and will contact you shortly.</p>
                <p v-if="formData.email" class="confirm-note">
                  A confirmation will be sent to <strong>{{ formData.email }}</strong>
                </p>
                <button class="btn-primary" @click="close">Done</button>
              </div>
            </transition>

            <!-- Form -->
            <form v-if="!submitted" @submit.prevent="submitForm" class="modal-form" novalidate>

              <!-- Error Banner -->
              <div v-if="formError" class="error-banner" role="alert">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {{ formError }}
              </div>

              <!-- Row: First / Last Name -->
              <div class="form-row">
                <div class="form-group">
                  <label for="am-firstName">First Name <span class="required">*</span></label>
                  <input
                    id="am-firstName"
                    type="text"
                    v-model="formData.first_name"
                    placeholder="John"
                    required
                    :class="{ 'input-error': errors.first_name }"
                  />
                  <span v-if="errors.first_name" class="field-error">{{ errors.first_name }}</span>
                </div>
                <div class="form-group">
                  <label for="am-lastName">Last Name <span class="required">*</span></label>
                  <input
                    id="am-lastName"
                    type="text"
                    v-model="formData.last_name"
                    placeholder="Doe"
                    required
                    :class="{ 'input-error': errors.last_name }"
                  />
                  <span v-if="errors.last_name" class="field-error">{{ errors.last_name }}</span>
                </div>
              </div>

              <!-- Row: Email / Phone -->
              <div class="form-row">
                <div class="form-group">
                  <label for="am-email">Email Address</label>
                  <input
                    id="am-email"
                    type="email"
                    v-model="formData.email"
                    placeholder="john@example.com"
                    :class="{ 'input-error': errors.email }"
                  />
                  <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
                </div>
                <div class="form-group">
                  <label for="am-phone">Phone Number <span class="required">*</span></label>
                  <input
                    id="am-phone"
                    type="tel"
                    v-model="formData.phone"
                    placeholder="+1 234 567 8900"
                    required
                    :class="{ 'input-error': errors.phone }"
                  />
                  <span v-if="errors.phone" class="field-error">{{ errors.phone }}</span>
                </div>
              </div>

              <!-- Row: Program / Country -->
              <div class="form-row">
                <div class="form-group">
                  <label for="am-program">Interested Program <span class="required">*</span></label>
                  <select
                    id="am-program"
                    v-model="formData.program_id"
                    required
                    :class="{ 'input-error': errors.program_id }"
                  >
                    <option value="">Select a program</option>
                    <option
                      v-for="program in programOptions"
                      :key="program.value"
                      :value="program.value"
                    >{{ program.label }}</option>
                  </select>
                  <span v-if="errors.program_id" class="field-error">{{ errors.program_id }}</span>
                </div>
                <div class="form-group">
                  <label for="am-country">Preferred Country <span class="required">*</span></label>
                  <select
                    id="am-country"
                    v-model="formData.country_id"
                    required
                    :class="{ 'input-error': errors.country_id }"
                  >
                    <option value="">Select a country</option>
                    <option
                      v-for="country in countryOptions"
                      :key="country.value"
                      :value="country.value"
                    >{{ country.label }}</option>
                  </select>
                  <span v-if="errors.country_id" class="field-error">{{ errors.country_id }}</span>
                </div>
              </div>

              <!-- Field of Study -->
              <div class="form-group">
                <label for="am-field">Field of Study</label>
                <input
                  id="am-field"
                  type="text"
                  v-model="formData.field_of_study"
                  placeholder="e.g., Computer Science, Business Administration"
                />
              </div>

              <!-- Row: Education / Intake -->
              <div class="form-row">
                <div class="form-group">
                  <label for="am-education">Current Education Level</label>
                  <select id="am-education" v-model="formData.current_education">
                    <option value="">Select your level</option>
                    <option value="high-school">High School</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="am-intake">Preferred Intake</label>
                  <select id="am-intake" v-model="formData.preferred_intake">
                    <option value="">Select intake</option>
                    <option value="2025-fall">Fall 2025</option>
                    <option value="2026-spring">Spring 2026</option>
                    <option value="2026-fall">Fall 2026</option>
                    <option value="2027-spring">Spring 2027</option>
                  </select>
                </div>
              </div>

              <!-- Row: Date / Time -->
              <div class="form-row">
                <div class="form-group">
                  <label for="am-date">Preferred Date</label>
                  <input
                    id="am-date"
                    type="date"
                    v-model="formData.preferred_appointment_date"
                    :min="minDate"
                  />
                </div>
                <div class="form-group">
                  <label for="am-time">Preferred Time</label>
                  <select id="am-time" v-model="formData.preferred_appointment_slot">
                    <option value="">Select time slot</option>
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
              </div>

              <!-- Additional Info -->
              <div class="form-group">
                <label for="am-message">Additional Information</label>
                <textarea
                  id="am-message"
                  v-model="formData.appointment_information"
                  rows="3"
                  placeholder="Tell us about your goals or any specific questions..."
                ></textarea>
              </div>

              <!-- Terms -->
              <div class="form-group checkbox-group">
                <input
                  id="am-terms"
                  type="checkbox"
                  v-model="formData.terms_conditions"
                  true-value="1"
                  false-value="0"
                  required
                  :class="{ 'input-error': errors.terms_conditions }"
                />
                <label for="am-terms">
                  I agree to the <a href="#terms" @click.prevent>Terms & Conditions</a> and <a href="#privacy" @click.prevent>Privacy Policy</a> <span class="required">*</span>
                </label>
              </div>
              <span v-if="errors.terms_conditions" class="field-error">{{ errors.terms_conditions }}</span>

              <!-- Submit -->
              <button type="submit" class="btn-submit" :disabled="isSubmitting">
                <span v-if="!isSubmitting">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"/>
                  </svg>
                  Book Consultation
                </span>
                <span v-else class="loading-dots">
                  <span></span><span></span><span></span>
                </span>
              </button>

              <p class="form-note">* Required fields. We'll contact you within 24 hours to confirm.</p>
            </form>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, defineEmits, defineProps } from 'vue';
import axios from 'axios';

// Props & Emits
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

// API base
const apiBase = process.env.VUE_APP_BASE_API;

// State
const submitted = ref(false);
const isSubmitting = ref(false);
const formError = ref(null);
const errors = ref({});
const programOptions = ref([]);
const countryOptions = ref([]);

const defaultForm = () => ({
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
});

const formData = ref(defaultForm());

// Computed
const minDate = computed(() => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
});

// Watch: lock body scroll when modal opens
watch(() => props.modelValue, (val) => {
  document.body.style.overflow = val ? 'hidden' : '';
  if (!val) {
    // Slight delay so closing animation plays before reset
    setTimeout(reset, 300);
  }
});

// Methods
const close = () => {
  emit('update:modelValue', false);
};

const reset = () => {
  formData.value = defaultForm();
  formError.value = null;
  errors.value = {};
  submitted.value = false;
};

const validate = () => {
  const e = {};
  if (!formData.value.first_name.trim()) e.first_name = 'First name is required.';
  if (!formData.value.last_name.trim()) e.last_name = 'Last name is required.';
  if (!formData.value.phone.trim()) e.phone = 'Phone number is required.';
  if (!formData.value.program_id) e.program_id = 'Please select a program.';
  if (!formData.value.country_id) e.country_id = 'Please select a country.';
  if (formData.value.terms_conditions !== '1') e.terms_conditions = 'You must agree to the terms.';
  errors.value = e;
  return Object.keys(e).length === 0;
};

const submitForm = async () => {
  formError.value = null;
  if (!validate()) return;

  isSubmitting.value = true;
  try {
    const response = await axios.post(`${apiBase}/appointment`, formData.value);
    if (response.status === 200 || response.status === 201) {
      submitted.value = true;
    }
  } catch (error) {
    if (error.response?.status === 422) {
      const serverErrors = error.response.data.errors || {};
      errors.value = Object.fromEntries(
        Object.entries(serverErrors).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
      );
      formError.value = 'Please fix the errors below.';
    } else {
      formError.value = error.response?.data?.message || 'Failed to submit. Please try again.';
    }
  } finally {
    isSubmitting.value = false;
  }
};

const fetchOptions = async () => {
  try {
    const [progRes, countryRes] = await Promise.all([
      axios.get(`${apiBase}/system/programs`),
      axios.get(`${apiBase}/system/countries`)
    ]);
    programOptions.value = progRes.data.programs || [];
    countryOptions.value = countryRes.data.countries || [];
  } catch (e) {
    console.error('Failed to fetch options:', e);
  }
};

onMounted(fetchOptions);
</script>

<style scoped>
/* ─── Backdrop ─────────────────────────────────────── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(10, 15, 40, 0.72);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
}

/* ─── Panel ─────────────────────────────────────────── */
.modal-panel {
  position: relative;
  background: #fff;
  border-radius: 20px;
  width: 100%;
  max-width: 680px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  box-shadow:
    0 24px 80px rgba(10, 15, 40, 0.3),
    0 0 0 1px rgba(30, 64, 175, 0.08);
  scrollbar-width: thin;
  scrollbar-color: #E5E7EB transparent;
}

.modal-panel::-webkit-scrollbar {
  width: 5px;
}
.modal-panel::-webkit-scrollbar-thumb {
  background: #E5E7EB;
  border-radius: 99px;
}

/* ─── Close Button ───────────────────────────────────── */
.modal-close {
  position: sticky;
  top: 0;
  float: right;
  margin: 16px 16px -16px 0;
  z-index: 10;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #F3F4F6;
  color: #6B7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s, transform 0.2s;
}
.modal-close:hover {
  background: #FEE2E2;
  color: #DC2626;
  transform: rotate(90deg);
}

/* ─── Header ─────────────────────────────────────────── */
.modal-header {
  padding: 36px 40px 0;
  clear: both;
}

.modal-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: white;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 99px;
  margin-bottom: 14px;
}

.modal-title {
  font-size: 30px;
  font-weight: 800;
  color: #1E3A8A;
  line-height: 1.15;
  margin: 0 0 10px;
}

.modal-subtitle {
  font-size: 15px;
  color: #6B7280;
  line-height: 1.6;
  margin: 0 0 28px;
}

/* ─── Divider strip ──────────────────────────────────── */
.modal-header::after {
  content: '';
  display: block;
  height: 3px;
  background: linear-gradient(90deg, #1E40AF, #EF4444);
  border-radius: 99px;
  margin-top: 4px;
}

/* ─── Form ───────────────────────────────────────────── */
.modal-form {
  padding: 28px 40px 36px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  letter-spacing: 0.2px;
}

.required {
  color: #EF4444;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 11px 14px;
  border: 2px solid #E5E7EB;
  border-radius: 10px;
  font-size: 14px;
  color: #111827;
  background: #FAFAFA;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  font-family: inherit;
  outline: none;
  width: 100%;
  box-sizing: border-box;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #9CA3AF;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #1E40AF;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
}

.input-error {
  border-color: #EF4444 !important;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
}

.field-error {
  font-size: 12px;
  color: #DC2626;
  margin-top: 2px;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

/* ─── Checkbox ───────────────────────────────────────── */
.checkbox-group {
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.checkbox-group input[type="checkbox"] {
  width: 18px;
  height: 18px;
  min-width: 18px;
  border-radius: 5px;
  cursor: pointer;
  accent-color: #1E40AF;
  padding: 0;
}

.checkbox-group label {
  margin: 0;
  font-size: 13px;
  color: #6B7280;
  cursor: pointer;
  font-weight: 400;
}

.checkbox-group label a {
  color: #1E40AF;
  text-decoration: none;
  font-weight: 600;
}
.checkbox-group label a:hover {
  text-decoration: underline;
}

/* ─── Error Banner ───────────────────────────────────── */
.error-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #DC2626;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
}

/* ─── Submit Button ──────────────────────────────────── */
.btn-submit {
  width: 100%;
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 6px;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(239, 68, 68, 0.35);
}

.btn-submit:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.form-note {
  font-size: 12px;
  color: #9CA3AF;
  text-align: center;
  margin: 0;
}

/* ─── Loading Dots ───────────────────────────────────── */
.loading-dots {
  display: flex;
  gap: 6px;
  align-items: center;
}
.loading-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.8);
  animation: dot-bounce 1.2s infinite ease-in-out;
}
.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes dot-bounce {
  0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}

/* ─── Success State ──────────────────────────────────── */
.success-state {
  padding: 40px 40px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
}

.success-icon-wrap {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10B981, #059669);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
}

.success-icon-wrap svg {
  width: 40px;
  height: 40px;
  color: white;
}

.success-state h3 {
  font-size: 26px;
  font-weight: 800;
  color: #1E3A8A;
  margin: 0;
}

.success-state p {
  font-size: 15px;
  color: #6B7280;
  line-height: 1.6;
  margin: 0;
  max-width: 400px;
}

.confirm-note {
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 13px !important;
  color: #065F46 !important;
}

.btn-primary {
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  color: white;
  border: none;
  padding: 14px 40px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(30, 64, 175, 0.3);
}

/* ─── Transitions ────────────────────────────────────── */
.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: opacity 0.3s ease;
}
.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}

.modal-panel-enter-active {
  transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-panel-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.modal-panel-enter-from {
  opacity: 0;
  transform: translateY(24px) scale(0.96);
}
.modal-panel-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.97);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ─── Responsive ─────────────────────────────────────── */
@media (max-width: 600px) {
  .modal-panel {
    border-radius: 16px;
    max-height: calc(100vh - 24px);
  }

  .modal-header {
    padding: 28px 24px 0;
  }

  .modal-form {
    padding: 24px 24px 32px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .modal-title {
    font-size: 24px;
  }

  .success-state {
    padding: 32px 24px 40px;
  }
}
</style>