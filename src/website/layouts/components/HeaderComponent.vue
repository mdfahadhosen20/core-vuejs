<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <router-link to="/" class="logo">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="#1E40AF"/>
            <path d="M20 10L28 16V24L20 30L12 24V16L20 10Z" fill="#EF4444"/>
            <path d="M20 15L24 17.5V22.5L20 25L16 22.5V17.5L20 15Z" fill="white"/>
          </svg>
          <span class="logo-text">StudentConsult</span>
        </router-link>

        <!-- Navigation -->
        <nav class="nav">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/service/1" class="nav-link">Services</router-link>
          <router-link to="/contact" class="nav-link">About Us</router-link>
          <router-link to="/faq" class="nav-link">Faq</router-link>
          <router-link to="/contact" class="nav-link">Contact</router-link>
        </nav>

        <!-- CTA Button -->
        <button class="cta-button">Get Started</button>

        <!-- Mobile Menu Toggle -->
        <button class="mobile-menu-toggle" @click="toggleMenu">
          <span :class="['hamburger', { active: menuOpen }]"></span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition name="slide">
        <nav v-if="menuOpen" class="mobile-nav">
          <a href="#home" class="mobile-nav-link" @click="closeMenu">Home</a>
          <router-link to="/service/1" class="mobile-nav-link" @click="closeMenu">Services</router-link>
          <a href="#about" class="mobile-nav-link" @click="closeMenu">About Us</a>
          <a href="#testimonials" class="mobile-nav-link" @click="closeMenu">Testimonials</a>
          <a href="#contact" class="mobile-nav-link" @click="closeMenu">Contact</a>
          <button class="mobile-cta-button" @click="closeMenu">Get Started</button>
        </nav>
      </transition>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      menuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
    closeMenu() {
      this.menuOpen = false
    }
  }
}
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  text-decoration: none;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  color: white;
  letter-spacing: -0.5px;
}

.nav {
  display: flex;
  gap: 32px;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: #EF4444;
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: #FCA5A5;
}

.nav-link:hover::after {
  width: 100%;
}

.cta-button {
  background: #EF4444;
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.cta-button:hover {
  background: #DC2626;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4);
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.hamburger {
  display: block;
  width: 28px;
  height: 2px;
  background: white;
  position: relative;
  transition: all 0.3s ease;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 28px;
  height: 2px;
  background: white;
  transition: all 0.3s ease;
}

.hamburger::before {
  top: -8px;
}

.hamburger::after {
  bottom: -8px;
}

.hamburger.active {
  background: transparent;
}

.hamburger.active::before {
  top: 0;
  transform: rotate(45deg);
}

.hamburger.active::after {
  bottom: 0;
  transform: rotate(-45deg);
}

.mobile-nav {
  display: none;
}

/* Transitions */
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 768px) {
  .nav,
  .cta-button {
    display: none;
  }

  .mobile-menu-toggle {
    display: block;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 20px 0;
    background: #1E3A8A;
    border-radius: 12px;
    margin-top: 12px;
  }

  .mobile-nav-link {
    color: white;
    text-decoration: none;
    font-weight: 500;
    padding: 12px 20px;
    transition: all 0.3s ease;
    border-radius: 8px;
  }

  .mobile-nav-link:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #FCA5A5;
  }

  .mobile-cta-button {
    background: #EF4444;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 600;
    margin: 8px 20px 0;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .mobile-cta-button:hover {
    background: #DC2626;
  }
}
</style>