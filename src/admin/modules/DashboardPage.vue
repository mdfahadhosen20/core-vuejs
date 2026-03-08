<template>
  <div class="dashboard-page">
    <!-- Welcome Header -->
    <div class="welcome-section">
      <div class="welcome-content">
        <div class="welcome-text">
          <h1 class="welcome-title">
            Welcome back, <span class="user-name">{{ userName }}</span> 👋
          </h1>
          <p class="welcome-subtitle">
            {{ currentGreeting }} Here's what's happening with your business today.
          </p>
        </div>
        <div class="welcome-date">
          <div class="date-info">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
            </svg>
            <div>
              <div class="current-date">{{ currentDate }}</div>
              <div class="current-time">{{ currentTime }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="stats-grid">
      <div class="stat-card stat-blue">
        <div class="stat-icon">
          <svg width="32" height="32" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-label">New Appointments</div>
          <div class="stat-value">{{ stats.new_appointments }}</div>
          <div class="stat-change up">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
            </svg>
            <span>Pending appointments</span>
          </div>
        </div>
      </div>

      <div class="stat-card stat-green">
        <div class="stat-icon">
          <svg width="32" height="32" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
            <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-label">Active Programs</div>
          <div class="stat-value">{{ stats.programs }}</div>
          <div class="stat-change up">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
            </svg>
            <span>Available programs</span>
          </div>
        </div>
      </div>

      <div class="stat-card stat-purple">
        <div class="stat-icon">
          <svg width="32" height="32" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-label">Countries</div>
          <div class="stat-value">{{ stats.countries }}</div>
          <div class="stat-change up">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
            </svg>
            <span>Destinations available</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="content-section">
      <!-- Recent Appointments -->
      <div class="content-card table-card">
        <div class="card-header">
          <h2 class="card-title">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
            </svg>
            Recent Appointments
          </h2>
          <button class="view-all-btn" @click="viewAllAppointments">View All</button>
        </div>

        <!-- Loading State -->
        <div v-if="appointmentsLoading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading appointments...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="!appointments || appointments.length === 0" class="empty-state">
          <svg width="64" height="64" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
          </svg>
          <h3>No appointments yet</h3>
          <p>New appointments will appear here</p>
        </div>

        <!-- Appointments Table -->
        <div v-else class="simple-table">
          <div class="table-header">
            <div class="table-row">
              <div class="table-cell">Client</div>
              <div class="table-cell">Program</div>
              <div class="table-cell">Country</div>
              <div class="table-cell">Date & Time</div>
              <div class="table-cell">Status</div>
            </div>
          </div>
          <div class="table-body">
            <div 
              v-for="appointment in displayedAppointments" 
              :key="appointment.id"
              class="table-row"
            >
              <div class="table-cell" data-label="Client">
                <div class="client-info">
                  <div class="client-avatar">
                    {{ getInitials(appointment.first_name, appointment.last_name) }}
                  </div>
                  <span>{{ appointment.first_name }} {{ appointment.last_name }}</span>
                </div>
              </div>
              <div class="table-cell" data-label="Program">
                {{ getProgramName(appointment.program_id) }}
              </div>
              <div class="table-cell" data-label="Country">
                {{ getCountryName(appointment.country_id) }}
              </div>
              <div class="table-cell" data-label="Date & Time">
                <div class="appointment-datetime">
                  <div>{{ formatDate(appointment.preferred_appointment_date) }}</div>
                  <div class="time-badge">{{ appointment.preferred_appointment_slot }}</div>
                </div>
              </div>
              <div class="table-cell" data-label="Status">
                <span class="status-badge" :class="getStatusClass(appointment)">
                  {{ getStatus(appointment) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import axios from 'axios'

const router = useRouter()
const authStore = useAuthStore()

const userName = ref('Admin')
const currentDate = ref('')
const currentTime = ref('')

// Stats
const stats = ref({
  new_appointments: 0,
  programs: 0,
  countries: 0
})

// Appointments
const appointments = ref([])
const appointmentsLoading = ref(false)

// Program and Country mappings
const programMapping = {
  9: 'Graduate',
  10: 'Undergraduate',
  11: 'Post Graduate',
  3: 'Diploma'
}

const countryMapping = {
  2: 'UK',
  3: 'USA',
  4: 'Canada'
}

const currentGreeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning!'
  if (hour < 18) return 'Good afternoon!'
  return 'Good evening!'
})

const displayedAppointments = computed(() => {
  // Show only the first 5 appointments
  return appointments.value.slice(0, 5)
})

// Fetch Stats
const fetchStats = async () => {
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`
    
    const response = await axios.get(process.env.VUE_APP_BASE_API+'/admin/dashboard/stats')
    
    if (response.data) {
      stats.value = {
        new_appointments: response.data.new_appointments || 0,
        programs: response.data.programs || 0,
        countries: response.data.countries || 0
      }
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
  }
}

// Fetch Appointments
const fetchAppointments = async () => {
  appointmentsLoading.value = true
  
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`
    
    const response = await axios.get(process.env.VUE_APP_BASE_API+'/admin/dashboard/appointments')
    
    if (response.data && response.data.appointments) {
      appointments.value = response.data.appointments
    }
  } catch (error) {
    console.error('Error fetching appointments:', error)
  } finally {
    appointmentsLoading.value = false
  }
}

// Fetch User Data for Name
const fetchUserData = async () => {
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`
    
    const response = await axios.get(process.env.VUE_APP_BASE_API+'/admin/user')
    
    if (response.data && response.data.user) {
      userName.value = response.data.user.name || 'Admin'
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

// Helper Functions
const getInitials = (firstName, lastName) => {
  const first = firstName ? firstName.charAt(0).toUpperCase() : ''
  const last = lastName ? lastName.charAt(0).toUpperCase() : ''
  return first + last || 'U'
}

const getProgramName = (programId) => {
  return programMapping[programId] || `Program ${programId}`
}

const getCountryName = (countryId) => {
  return countryMapping[countryId] || `Country ${countryId}`
}

const formatDate = (dateString) => {
  if (!dateString) return 'Not specified'
  
  const date = new Date(dateString)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  // Check if it's today
  if (date.toDateString() === today.toDateString()) {
    return 'Today'
  }
  
  // Check if it's tomorrow
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow'
  }
  
  // Otherwise return formatted date
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
  })
}

const getStatus = (appointment) => {
  // Determine status based on appointment date
  const appointmentDate = new Date(appointment.preferred_appointment_date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  appointmentDate.setHours(0, 0, 0, 0)
  
  if (appointmentDate < today) {
    return 'Completed'
  } else if (appointmentDate.getTime() === today.getTime()) {
    return 'Today'
  } else {
    return 'Pending'
  }
}

const getStatusClass = (appointment) => {
  const status = getStatus(appointment)
  
  if (status === 'Completed') return 'completed'
  if (status === 'Today') return 'today'
  return 'pending'
}

const updateDateTime = () => {
  const now = new Date()
  currentDate.value = now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit'
  })
}

const viewAllAppointments = () => {
  router.push('/admin/dashboard/appointments')
}

let timeInterval

onMounted(() => {
  updateDateTime()
  timeInterval = setInterval(updateDateTime, 1000)
  
  // Fetch all data
  fetchUserData()
  fetchStats()
  fetchAppointments()
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>

<style scoped>
.dashboard-page {
  padding: 30px;
  max-width: 1600px;
  margin: 0 auto;
  background: #f8f9fa;
  min-height: 100vh;
}

/* Welcome Section */
.welcome-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 30px;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.2);
}

.welcome-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.welcome-text {
  flex: 1;
}

.welcome-title {
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin: 0 0 12px 0;
}

.user-name {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 8px;
}

.welcome-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.welcome-date {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 16px 24px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.date-info {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
}

.date-info svg {
  flex-shrink: 0;
}

.current-date {
  font-size: 14px;
  font-weight: 600;
}

.current-time {
  font-size: 12px;
  opacity: 0.9;
}

/* Statistics Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  gap: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.stat-blue {
  border-left-color: #3b82f6;
}

.stat-green {
  border-left-color: #10b981;
}

.stat-purple {
  border-left-color: #8b5cf6;
}

.stat-icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-blue .stat-icon {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
}

.stat-green .stat-icon {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.stat-purple .stat-icon {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
}

.stat-content {
  flex: 1;
  min-width: 0;
}

.stat-label {
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
}

.stat-change {
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6b7280;
}

.stat-change.up {
  color: #10b981;
}

.stat-change svg {
  flex-shrink: 0;
}

/* Content Section */
.content-section {
  margin-bottom: 30px;
}

.content-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f3f4f6;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.view-all-btn {
  background: none;
  border: none;
  color: #667eea;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.view-all-btn:hover {
  background: #f3f4f6;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #6b7280;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f4f6;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state p {
  margin: 0;
  font-size: 14px;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-state svg {
  color: #d1d5db;
  margin-bottom: 16px;
}

.empty-state h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.empty-state p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

/* Table */
.simple-table {
  overflow-x: auto;
}

.table-header {
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 8px;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr 1.5fr 1fr;
  gap: 16px;
  padding: 12px 16px;
  align-items: center;
}

.table-body .table-row {
  border-bottom: 1px solid #f3f4f6;
  transition: all 0.2s ease;
}

.table-body .table-row:last-child {
  border-bottom: none;
}

.table-body .table-row:hover {
  background: #f9fafb;
}

.table-cell {
  font-size: 13px;
}

.table-header .table-cell {
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.5px;
}

.table-body .table-cell {
  color: #374151;
}

.client-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.client-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
}

.appointment-datetime {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.time-badge {
  display: inline-block;
  padding: 2px 8px;
  background: #f3f4f6;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: capitalize;
  display: inline-block;
}

.status-badge.today {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.pending {
  background: #dbeafe;
  color: #1e40af;
}

.status-badge.completed {
  background: #d1fae5;
  color: #065f46;
}

/* Responsive */
@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .dashboard-page {
    padding: 20px 15px;
  }

  .welcome-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .welcome-title {
    font-size: 24px;
  }

  .welcome-date {
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .table-row {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 16px;
  }

  .table-header {
    display: none;
  }

  .table-body .table-row {
    background: #f9fafb;
    border-radius: 8px;
    margin-bottom: 8px;
    border: 1px solid #e5e7eb;
  }

  .table-cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .table-cell::before {
    content: attr(data-label);
    font-weight: 600;
    color: #6b7280;
    font-size: 12px;
    text-transform: uppercase;
  }

  .client-info {
    margin-left: auto;
  }

  .appointment-datetime {
    margin-left: auto;
  }

  .status-badge {
    margin-left: auto;
  }
}
</style>