<template>
  <div class="shanta-carousel">
    <!-- Loading State -->
    <div v-if="loading" class="carousel-loading">
      <div class="spinner-large"></div>
      <p>Loading...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="slides.length === 0" class="carousel-empty">
      <p>No banners available</p>
    </div>

    <!-- Carousel Slides -->
    <transition-group v-else :name="getTransitionType(currentSlide)">
      <div 
        v-for="(slide, index) in slides" 
        v-show="currentSlide === index"
        :key="slide.id"
        class="slide-wrapper"
      >
        <div class="image-container">
          <img 
            :src="getImageUrl(slide.file_name)" 
            :alt="slide.title" 
            class="main-img"
            @error="handleImageError"
          />
          <div class="dark-overlay"></div>
        </div>

        <div class="content-overlay">
          <div class="text-group">
            <p v-if="slide.secondary_title" class="subtitle animate-up">
              {{ slide.secondary_title }}
            </p>
            <h1 class="title animate-up-slow">{{ slide.title }}</h1>
            <a 
              v-if="slide.link_path" 
              :href="slide.link_path" 
              class="cta-btn animate-fade"
            >
              {{ slide.link_title || 'Explore More' }}
            </a>
          </div>
        </div>
      </div>
    </transition-group>

    <!-- Navigation Bars -->
    <div v-if="slides.length > 0" class="navigation">
      <div 
        v-for="(slide, index) in slides" 
        :key="`nav-${slide.id}`"
        @click="goToSlide(index)"
        class="nav-block"
        :class="{ active: currentSlide === index }"
      >
        <div class="progress-container">
          <div 
            class="progress-fill"
            :style="{ width: currentSlide === index ? progress + '%' : '0%' }"
          ></div>
        </div>
        <span class="nav-label">{{ String(index + 1).padStart(2, '0') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, defineProps } from 'vue';

// Props
const props = defineProps({
  banners: {
    type: Array,
    default: () => []
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  duration: {
    type: Number,
    default: 6000 // 6 seconds per slide
  }
});

// State
const slides = ref([]);
const loading = ref(true);
const currentSlide = ref(0);
const progress = ref(0);
let timer = null;

const urlBase = process.env.VUE_APP_BASE_URL

// Methods
const getImageUrl = (fileName) => {
  if (!fileName) return '';
  return `${urlBase}/${fileName}`;
};

const handleImageError = (event) => {
  console.error('Failed to load banner image:', event.target.src);
  // Fallback to placeholder
  event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"%3E%3Crect fill="%23667eea" width="1920" height="1080"/%3E%3Ctext fill="%23ffffff" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="48"%3EImage not found%3C/text%3E%3C/svg%3E';
};

// Logic to rotate 3 different transition types
const getTransitionType = (index) => {
  const types = ['reveal-center', 'zoom-fade', 'mask-up'];
  return types[index % types.length];
};

const runCarousel = () => {
  if (!props.autoplay || slides.value.length <= 1) return;
  
  const step = 100 / (props.duration / 50);
  timer = setInterval(() => {
    if (progress.value < 100) {
      progress.value += step;
    } else {
      nextSlide();
    }
  }, 50);
};

const stopCarousel = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

const nextSlide = () => {
  progress.value = 0;
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};

const goToSlide = (index) => {
  progress.value = 0;
  currentSlide.value = index;
  
  // Restart timer
  stopCarousel();
  runCarousel();
};

// Initialize slides from banners prop
const initializeSlides = () => {
  loading.value = true;
  
  // Filter only active banners
  slides.value = (props.banners || []).filter(banner => banner.status === 'active');
  
  loading.value = false;
  
  // Start carousel if slides exist
  if (slides.value.length > 0) {
    runCarousel();
  }
};

// Watch for changes in banners prop
watch(() => props.banners, () => {
  stopCarousel();
  initializeSlides();
}, { deep: true });

// Lifecycle
onMounted(() => {
  initializeSlides();
});

onUnmounted(() => {
  stopCarousel();
});
</script>

<style scoped>
/* 1. LAYOUT & DIMENSIONS - Prevents image spill */
.shanta-carousel {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #000;
  overflow: hidden;
}

/* Loading State */
.carousel-loading {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  z-index: 100;
}

.spinner-large {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.carousel-loading p {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* Empty State */
.carousel-empty {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 18px;
  font-weight: 500;
}

.slide-wrapper {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.main-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* CROPS IMAGE TO SCREEN */
  display: block;
}

.dark-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
}

/* 2. THREE TRANSITION EFFECTS */

/* EFFECT 1: SHANTA CENTER REVEAL (Clip Path) */
.reveal-center-enter-active {
  transition: clip-path 1.4s cubic-bezier(0.77, 0, 0.175, 1);
  z-index: 10;
}
.reveal-center-enter-from {
  clip-path: inset(0 50% 0 50%);
}
.reveal-center-enter-to {
  clip-path: inset(0 0% 0 0%);
}

/* EFFECT 2: ZOOM-OUT FADE (Cinematic) */
.zoom-fade-enter-active {
  transition: transform 1.8s ease, opacity 1.5s ease;
  z-index: 10;
}
.zoom-fade-enter-from {
  transform: scale(1.3);
  opacity: 0;
}
.zoom-fade-enter-to {
  transform: scale(1);
  opacity: 1;
}

/* EFFECT 3: MASK UP (Slide Up Reveal) */
.mask-up-enter-active {
  transition: clip-path 1.2s cubic-bezier(0.19, 1, 0.22, 1);
  z-index: 10;
}
.mask-up-enter-from {
  clip-path: inset(100% 0 0 0);
}
.mask-up-enter-to {
  clip-path: inset(0 0 0 0);
}

/* Ensure old slide stays visible during reveal */
.reveal-center-leave-active, .zoom-fade-leave-active, .mask-up-leave-active {
  transition: opacity 1.5s ease;
  z-index: 1;
}
.reveal-center-leave-to, .zoom-fade-leave-to, .mask-up-leave-to {
  opacity: 0;
}

/* 3. CONTENT & TYPOGRAPHY */
.content-overlay {
  position: absolute;
  inset: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  padding: 0 8%;
  color: white;
  pointer-events: none;
}

.text-group { 
  pointer-events: auto;
  max-width: 800px;
}

.subtitle {
  color: #fbbf24;
  text-transform: uppercase;
  letter-spacing: 0.5em;
  font-size: 14px;
  margin-bottom: 20px;
  font-weight: 600;
}

.title {
  font-size: clamp(3rem, 10vw, 7rem);
  font-weight: 300;
  margin: 0 0 40px 0;
  font-family: serif;
  line-height: 1.1;
}

.cta-btn {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.4);
  color: white;
  padding: 16px 40px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  text-decoration: none;
}

.cta-btn:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.8);
  transform: translateY(-2px);
}

/* 4. NAVIGATION BARS */
.navigation {
  position: absolute;
  bottom: 50px;
  left: 8%;
  display: flex;
  gap: 30px;
  z-index: 30;
}

.nav-block {
  width: 120px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-block:hover {
  transform: translateY(-2px);
}

.nav-block.active .nav-label {
  color: white;
  font-weight: 600;
}

.progress-container {
  height: 2px;
  background: rgba(255,255,255,0.1);
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
}

.progress-fill {
  position: absolute;
  height: 100%;
  background: white;
  transition: width 0.05s linear;
}

.nav-label {
  font-size: 10px;
  color: rgba(255,255,255,0.5);
  transition: all 0.3s ease;
  display: inline-block;
  font-weight: 500;
  letter-spacing: 0.1em;
}

/* 5. CONTENT REVEAL ANIMATIONS */
.animate-up { 
  animation: up 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.5s both; 
}
.animate-up-slow { 
  animation: up 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.7s both; 
}
.animate-fade { 
  animation: fade 1.5s ease 1s both; 
}

@keyframes up {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 6. RESPONSIVE DESIGN */
@media (max-width: 1024px) {
  .content-overlay {
    padding: 0 6%;
  }

  .title {
    font-size: clamp(2.5rem, 8vw, 5rem);
  }

  .navigation {
    left: 6%;
    bottom: 40px;
  }

  .nav-block {
    width: 80px;
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .shanta-carousel {
    height: 70vh;
    min-height: 500px;
  }

  .content-overlay {
    padding: 0 5%;
    align-items: flex-end;
    padding-bottom: 120px;
  }

  .subtitle {
    font-size: 12px;
    letter-spacing: 0.3em;
    margin-bottom: 15px;
  }

  .title {
    font-size: clamp(2rem, 8vw, 3.5rem);
    margin-bottom: 30px;
  }

  .cta-btn {
    padding: 14px 32px;
    font-size: 10px;
  }

  .navigation {
    left: 5%;
    bottom: 30px;
    gap: 15px;
  }

  .nav-block {
    width: 60px;
  }

  .nav-label {
    font-size: 9px;
  }
}

@media (max-width: 480px) {
  .shanta-carousel {
    height: 60vh;
    min-height: 400px;
  }

  .content-overlay {
    padding-bottom: 100px;
  }

  .subtitle {
    font-size: 10px;
    letter-spacing: 0.2em;
  }

  .title {
    font-size: clamp(1.5rem, 7vw, 2.5rem);
    margin-bottom: 20px;
  }

  .cta-btn {
    padding: 12px 24px;
    font-size: 9px;
    letter-spacing: 0.15em;
  }

  .navigation {
    bottom: 20px;
    gap: 10px;
  }

  .nav-block {
    width: 50px;
  }
}

/* 7. ACCESSIBILITY */
@media (prefers-reduced-motion: reduce) {
  .reveal-center-enter-active,
  .zoom-fade-enter-active,
  .mask-up-enter-active,
  .reveal-center-leave-active,
  .zoom-fade-leave-active,
  .mask-up-leave-active {
    transition: opacity 0.3s ease;
  }

  .reveal-center-enter-from,
  .zoom-fade-enter-from,
  .mask-up-enter-from {
    clip-path: inset(0 0% 0 0%);
    transform: scale(1);
  }

  .animate-up,
  .animate-up-slow,
  .animate-fade {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>