<template>
  <div class="header-wrapper">
    <div class="header-left">
      <button class="menu-toggle" @click="toggleSidebar">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
      
      <div class="search-container">
        <svg class="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
        </svg>
        <input 
          type="text" 
          class="search-input" 
          placeholder="Search..."
          v-model="searchQuery"
        />
      </div>
    </div>

    <div class="header-right">
      <!-- Notifications -->
      <!-- <div class="notification-wrapper" ref="notificationRef">
        <button 
          class="icon-button notification-button" 
          @click="toggleNotifications"
          :class="{ 'active': showNotifications }"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h16a1 1 0 00.707-1.707L20 11.586V8a6 6 0 00-6-6h-4zM10 18a3 3 0 006 0h-6z"/>
          </svg>
          <span v-if="unreadNotifications > 0" class="notification-badge">{{ unreadNotifications }}</span>
        </button>

        <transition name="dropdown-fade">
          <div v-if="showNotifications" class="dropdown-menu notification-dropdown">
            <div class="dropdown-header">
              <h3>Notifications</h3>
              <button class="mark-read-btn" @click="markAllAsRead">Mark all as read</button>
            </div>
            <div class="notification-list">
              <div 
                v-for="notification in notifications" 
                :key="notification.id"
                class="notification-item"
                :class="{ 'unread': !notification.read }"
                @click="markAsRead(notification.id)"
              >
                <div class="notification-icon" :class="notification.type">
                  <svg v-if="notification.type === 'message'" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3.293 3.293 3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                  </svg>
                  <svg v-else-if="notification.type === 'alert'" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div class="notification-content">
                  <p class="notification-title">{{ notification.title }}</p>
                  <p class="notification-message">{{ notification.message }}</p>
                  <span class="notification-time">{{ notification.time }}</span>
                </div>
                <span v-if="!notification.read" class="unread-dot"></span>
              </div>
            </div>
            <div class="dropdown-footer">
              <a href="#" class="view-all-link">View all notifications</a>
            </div>
          </div>
        </transition>
      </div> -->

      <!-- Messages -->
      <!-- <div class="message-wrapper" ref="messageRef">
        <button 
          class="icon-button message-button" 
          @click="toggleMessages"
          :class="{ 'active': showMessages }"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
          </svg>
          <span v-if="unreadMessages > 0" class="notification-badge">{{ unreadMessages }}</span>
        </button>

        <transition name="dropdown-fade">
          <div v-if="showMessages" class="dropdown-menu message-dropdown">
            <div class="dropdown-header">
              <h3>Messages</h3>
            </div>
            <div class="message-list">
              <div 
                v-for="message in messages" 
                :key="message.id"
                class="message-item"
                :class="{ 'unread': !message.read }"
                @click="openMessage(message.id)"
              >
                <div class="message-avatar">
                  <img :src="message.avatar" :alt="message.name">
                  <span v-if="message.online" class="online-indicator"></span>
                </div>
                <div class="message-content">
                  <div class="message-header-info">
                    <span class="message-name">{{ message.name }}</span>
                    <span class="message-time">{{ message.time }}</span>
                  </div>
                  <p class="message-text">{{ message.text }}</p>
                </div>
                <span v-if="!message.read" class="unread-dot"></span>
              </div>
            </div>
            <div class="dropdown-footer">
              <a href="#" class="view-all-link">View all messages</a>
            </div>
          </div>
        </transition>
      </div> -->

      <!-- User Dropdown -->
      <div class="user-dropdown-wrapper" ref="userRef">
        <button 
          class="user-button" 
          @click="toggleUserMenu"
          :class="{ 'active': showUserMenu }"
        >
          <div class="user-avatar">
            <div class="avatar-placeholder">
              {{ getUserInitials() }}
            </div>
          </div>
          <div class="user-info" v-if="userData">
            <span class="user-name">{{ userData.name }}</span>
            <span class="user-role">Administrator</span>
          </div>
          <svg 
            class="dropdown-arrow" 
            :class="{ 'rotated': showUserMenu }"
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none"
          >
            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

        <transition name="dropdown-fade">
          <div v-if="showUserMenu" class="dropdown-menu user-menu">
            <div class="user-menu-header">
              <div class="user-menu-avatar">
                <div class="avatar-placeholder-large">
                  {{ getUserInitials() }}
                </div>
              </div>
              <div class="user-menu-info" v-if="userData">
                <p class="user-menu-name">{{ userData.name }}</p>
                <p class="user-menu-email">{{ userData.email }}</p>
              </div>
            </div>
            <div class="user-menu-divider"></div>
            <ul class="user-menu-list">
              <!-- <li>
                <a href="#" class="user-menu-item" @click.prevent="goToProfile">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                  </svg>
                  <span>Profile</span>
                </a>
              </li> -->
              <li>
                <a href="#" class="user-menu-item" @click.prevent="goToSettings">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
                  </svg>
                  <span>Settings</span>
                </a>
              </li>
              <!-- <li>
                <a href="#" class="user-menu-item" @click.prevent="goToHelp">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
                  </svg>
                  <span>Help & Support</span>
                </a>
              </li> -->
            </ul>
            <div class="user-menu-divider"></div>
            <button class="logout-button" @click="handleLogout" :disabled="loggingOut">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"/>
              </svg>
              <span>{{ loggingOut ? 'Logging out...' : 'Logout' }}</span>
            </button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import axios from 'axios'

const emit = defineEmits(['toggle-sidebar'])
const router = useRouter()
const authStore = useAuthStore()

// User Data
const userData = ref(null)
const loggingOut = ref(false)

// Search
const searchQuery = ref('')

// Notifications
const showNotifications = ref(false)
const notificationRef = ref(null)
// const unreadNotifications = ref(3)
// const notifications = ref([
//   {
//     id: 1,
//     type: 'message',
//     title: 'New message from Sarah',
//     message: 'Hey! Can you review the latest design updates?',
//     time: '5 min ago',
//     read: false
//   },
//   {
//     id: 2,
//     type: 'alert',
//     title: 'Server alert',
//     message: 'CPU usage is above 90% on server 3',
//     time: '15 min ago',
//     read: false
//   },
//   {
//     id: 3,
//     type: 'success',
//     title: 'Deployment successful',
//     message: 'Version 2.1.0 has been deployed to production',
//     time: '1 hour ago',
//     read: false
//   },
//   {
//     id: 4,
//     type: 'message',
//     title: 'New comment',
//     message: 'Michael commented on your post',
//     time: '2 hours ago',
//     read: true
//   }
// ])

// Messages
const showMessages = ref(false)
const messageRef = ref(null)
// const unreadMessages = ref(2)
// const messages = ref([
//   {
//     id: 1,
//     name: 'Sarah Johnson',
//     avatar: 'https://i.pravatar.cc/40?img=1',
//     text: 'Hey! Can you review the latest design updates?',
//     time: '5m',
//     read: false,
//     online: true
//   },
//   {
//     id: 2,
//     name: 'Michael Chen',
//     avatar: 'https://i.pravatar.cc/40?img=12',
//     text: 'The new feature is ready for testing',
//     time: '1h',
//     read: false,
//     online: true
//   },
//   {
//     id: 3,
//     name: 'Emily Davis',
//     avatar: 'https://i.pravatar.cc/40?img=5',
//     text: 'Thanks for your help with the project!',
//     time: '3h',
//     read: true,
//     online: false
//   },
//   {
//     id: 4,
//     name: 'Alex Martinez',
//     avatar: 'https://i.pravatar.cc/40?img=8',
//     text: 'Meeting scheduled for tomorrow at 10 AM',
//     time: '5h',
//     read: true,
//     online: false
//   }
// ])

// User Menu
const showUserMenu = ref(false)
const userRef = ref(null)

// Fetch User Data
const fetchUserData = async () => {
  try {
    // Set authorization header with token from auth store
    axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`
    
    const response = await axios.get(process.env.VUE_APP_BASE_API+'/admin/user')
    
    if (response.data && response.data.user) {
      userData.value = response.data.user
      console.log('User data loaded:', userData.value)
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
    
    // If unauthorized, redirect to login
    if (error.response && error.response.status === 401) {
      authStore.logout()
      router.push('/admin/login')
    }
  }
}

// Get User Initials for Avatar
const getUserInitials = () => {
  if (!userData.value || !userData.value.name) return 'U'
  
  const names = userData.value.name.split(' ')
  if (names.length >= 2) {
    return (names[0][0] + names[1][0]).toUpperCase()
  }
  return userData.value.name.substring(0, 2).toUpperCase()
}

const toggleSidebar = () => {
  emit('toggle-sidebar')
}

// const toggleNotifications = () => {
//   showNotifications.value = !showNotifications.value
//   showMessages.value = false
//   showUserMenu.value = false
// }

// const toggleMessages = () => {
//   showMessages.value = !showMessages.value
//   showNotifications.value = false
//   showUserMenu.value = false
// }

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showNotifications.value = false
  showMessages.value = false
}

// const markAsRead = (id) => {
//   const notification = notifications.value.find(n => n.id === id)
//   if (notification && !notification.read) {
//     notification.read = true
//     unreadNotifications.value--
//   }
// }

// const markAllAsRead = () => {
//   notifications.value.forEach(n => n.read = true)
//   unreadNotifications.value = 0
// }

// const openMessage = (id) => {
//   const message = messages.value.find(m => m.id === id)
//   if (message && !message.read) {
//     message.read = true
//     unreadMessages.value--
//   }
//   console.log('Open message:', id)
// }

// const goToProfile = () => {
//   router.push('/admin/profile')
//   showUserMenu.value = false
// }

const goToSettings = () => {
  router.push('/admin/settings')
  showUserMenu.value = false
}

// const goToHelp = () => {
//   router.push('/admin/help')
//   showUserMenu.value = false
// }

const handleLogout = async () => {
  if (loggingOut.value) return
  
  loggingOut.value = true
  
  try {
    // Set authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`
    
    // Call logout API
    await axios.post(process.env.VUE_APP_BASE_API+'/admin/logout')
    
    console.log('Logout successful')
    
    // Clear auth store and redirect
    authStore.logout()
    router.push('/admin/login')
  } catch (error) {
    console.error('Logout error:', error)
    
    // Even if API fails, still logout locally
    authStore.logout()
    router.push('/admin/login')
  } finally {
    loggingOut.value = false
  }
}

// Click outside to close dropdowns
const handleClickOutside = (event) => {
  if (notificationRef.value && !notificationRef.value.contains(event.target)) {
    showNotifications.value = false
  }
  if (messageRef.value && !messageRef.value.contains(event.target)) {
    showMessages.value = false
  }
  if (userRef.value && !userRef.value.contains(event.target)) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  fetchUserData()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 24px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.menu-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: #64748b;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-toggle:hover {
  background: #f1f5f9;
  color: #1e293b;
}

.search-container {
  position: relative;
  max-width: 400px;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 10px 16px 10px 40px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #1e293b;
  background: #f8fafc;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-input::placeholder {
  color: #94a3b8;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.notification-wrapper,
.message-wrapper,
.user-dropdown-wrapper {
  position: relative;
}

.icon-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: #64748b;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.icon-button:hover,
.icon-button.active {
  background: #f1f5f9;
  color: #1e293b;
}

.notification-badge {
  position: absolute;
  top: -6px;
  right: -12px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ef4444;
  color: white;
  font-size: 11px;
  font-weight: 600;
  border-radius: 9px;
  border: 2px solid white;
}

.user-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px 6px 6px;
  border: none;
  background: transparent;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-button:hover,
.user-button.active {
  background: #f1f5f9;
}

.user-button .user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #e2e8f0;
  flex-shrink: 0;
}

.avatar-placeholder,
.avatar-placeholder-large {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  font-weight: 700;
  font-size: 14px;
}

.avatar-placeholder-large {
  font-size: 20px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  line-height: 1;
}

.user-role {
  font-size: 12px;
  color: #64748b;
  line-height: 1;
}

.dropdown-arrow {
  color: #94a3b8;
  transition: transform 0.3s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

/* Dropdown Menu Styles */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 320px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  z-index: 1000;
  overflow: hidden;
}

.notification-dropdown,
.message-dropdown {
  max-height: 480px;
  overflow-y: auto;
}

.dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
  background: #f8fafc;
}

.dropdown-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.mark-read-btn {
  font-size: 13px;
  color: #3b82f6;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: color 0.3s ease;
}

.mark-read-btn:hover {
  color: #2563eb;
}

/* Notification List */
.notification-list,
.message-list {
  max-height: 350px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
  transition: background 0.3s ease;
  position: relative;
}

.notification-item:hover {
  background: #f8fafc;
}

.notification-item.unread {
  background: #eff6ff;
}

.notification-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.notification-icon.message {
  background: #dbeafe;
  color: #3b82f6;
}

.notification-icon.alert {
  background: #fee2e2;
  color: #ef4444;
}

.notification-icon.success {
  background: #d1fae5;
  color: #10b981;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.notification-message {
  font-size: 13px;
  color: #64748b;
  margin: 0 0 6px 0;
  line-height: 1.4;
}

.notification-time {
  font-size: 12px;
  color: #94a3b8;
}

.unread-dot {
  width: 8px;
  height: 8px;
  background: #3b82f6;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 6px;
}

/* Message List */
.message-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
  transition: background 0.3s ease;
  position: relative;
}

.message-item:hover {
  background: #f8fafc;
}

.message-item.unread {
  background: #eff6ff;
}

.message-avatar {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.message-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.online-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  background: #10b981;
  border: 2px solid white;
  border-radius: 50%;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-header-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.message-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.message-time {
  font-size: 12px;
  color: #94a3b8;
}

.message-text {
  font-size: 13px;
  color: #64748b;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-footer {
  padding: 12px 20px;
  border-top: 1px solid #f1f5f9;
  background: #f8fafc;
  text-align: center;
}

.view-all-link {
  font-size: 14px;
  font-weight: 600;
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.3s ease;
}

.view-all-link:hover {
  color: #2563eb;
}

/* User Menu */
.user-menu {
  min-width: 280px;
}

.user-menu-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.user-menu-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
}

.user-menu-info {
  flex: 1;
  min-width: 0;
}

.user-menu-name {
  font-size: 16px;
  font-weight: 700;
  color: white;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-menu-email {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-menu-divider {
  height: 1px;
  background: #f1f5f9;
  margin: 8px 0;
}

.user-menu-list {
  list-style: none;
  padding: 8px;
  margin: 0;
}

.user-menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #64748b;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

.user-menu-item:hover {
  background: #f8fafc;
  color: #1e293b;
}

.logout-button {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 24px;
  border: none;
  background: transparent;
  color: #ef4444;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 0;
}

.logout-button:hover:not(:disabled) {
  background: #fef2f2;
}

.logout-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Dropdown Animations */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Scrollbar Styles */
.notification-list::-webkit-scrollbar,
.message-list::-webkit-scrollbar {
  width: 6px;
}

.notification-list::-webkit-scrollbar-track,
.message-list::-webkit-scrollbar-track {
  background: transparent;
}

.notification-list::-webkit-scrollbar-thumb,
.message-list::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.notification-list::-webkit-scrollbar-thumb:hover,
.message-list::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .search-container {
    display: none;
  }

  .user-info {
    display: none;
  }

  .dropdown-menu {
    min-width: 300px;
  }

  .user-menu {
    min-width: 260px;
  }
}

@media (max-width: 480px) {
  .dropdown-menu {
    min-width: 280px;
    right: -12px;
  }
}
</style>