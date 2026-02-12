<template>
  <div class="topbar">
    <div class="container">
      <div class="topbar-content">
        <!-- Left Side - Contact Info -->
        <div class="contact-info">
          <a href="tel:+1234567890" class="contact-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>+1 (234) 567-890</span>
          </a>
          <a href="mailto:info@studentconsult.com" class="contact-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span>info@studentconsult.com</span>
          </a>
        </div>

        <!-- Center - Announcement -->
        <div class="announcement">
          <transition name="fade" mode="out-in">
            <div :key="currentAnnouncement" class="announcement-text">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="announcement-icon">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              {{ announcements[currentAnnouncement] }}
            </div>
          </transition>
        </div>

        <!-- Right Side - Social & Quick Links -->
        <div class="quick-links">
          <a href="#" class="social-link" aria-label="Facebook">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a href="#" class="social-link" aria-label="Twitter">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
            </svg>
          </a>
          <a href="#" class="social-link" aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a href="#login" class="login-link">Student Portal</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopbarComponent',
  data() {
    return {
      currentAnnouncement: 0,
      announcements: [
        '🎓 Free consultation for new students this month!',
        '📚 Spring semester applications now open',
        '✨ Special discount: 20% off career counseling services'
      ],
      intervalId: null
    }
  },
  mounted() {
    this.startAnnouncementRotation()
  },
  beforeUnmount() {
    this.stopAnnouncementRotation()
  },
  methods: {
    startAnnouncementRotation() {
      this.intervalId = setInterval(() => {
        this.currentAnnouncement = (this.currentAnnouncement + 1) % this.announcements.length
      }, 5000)
    },
    stopAnnouncementRotation() {
      if (this.intervalId) {
        clearInterval(this.intervalId)
      }
    }
  }
}
</script>

<style scoped>
.topbar {
  background: #EF4444;
  color: white;
  font-size: 13px;
  border-bottom: 2px solid #DC2626;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.topbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  gap: 20px;
}

.contact-info {
  display: flex;
  gap: 24px;
  align-items: center;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: white;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.contact-item:hover {
  opacity: 0.8;
}

.announcement {
  flex: 1;
  text-align: center;
  overflow: hidden;
  max-width: 500px;
}

.announcement-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
}

.announcement-icon {
  flex-shrink: 0;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.quick-links {
  display: flex;
  align-items: center;
  gap: 16px;
}

.social-link {
  color: white;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.login-link {
  color: white;
  text-decoration: none;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
}

.login-link:hover {
  background: rgba(255, 255, 255, 0.25);
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .topbar-content {
    justify-content: center;
  }

  .contact-info,
  .quick-links {
    display: none;
  }

  .announcement {
    max-width: 100%;
  }

  .announcement-text {
    font-size: 12px;
  }
}

@media (max-width: 1024px) {
  .contact-info {
    gap: 16px;
  }

  .contact-item span {
    display: none;
  }

  .announcement {
    font-size: 12px;
  }
}
</style>