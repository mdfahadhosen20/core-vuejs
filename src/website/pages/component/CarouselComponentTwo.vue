<template>
  <div class="carousel-container">
    <div v-if="banners.length === 0" class="carousel-empty">
      <p>No banners available</p>
    </div>
    
    <div v-else class="carousel">
      <div 
        v-for="(banner, index) in banners" 
        :key="banner.id"
        class="carousel-slide"
        :class="{ active: index === currentSlide }"
      >
        <div class="carousel-image">
          <img 
            :src="`${apiBase}/storage/${banner.file_name}`" 
            :alt="banner.title"
            @error="handleImageError"
          />
          <div class="carousel-overlay"></div>
        </div>
        
        <div class="carousel-content">
          <div class="container">
            <h1 class="carousel-title">{{ banner.title }}</h1>
            <p v-if="banner.secondary_title" class="carousel-subtitle">
              {{ banner.secondary_title }}
            </p>
            <a 
              v-if="banner.link_path" 
              :href="banner.link_path" 
              class="carousel-button"
            >
              {{ banner.link_title || 'Learn More' }}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <button 
        v-if="banners.length > 1"
        class="carousel-nav prev" 
        @click="prevSlide"
        aria-label="Previous slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      
      <button 
        v-if="banners.length > 1"
        class="carousel-nav next" 
        @click="nextSlide"
        aria-label="Next slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      <!-- Indicators -->
      <div v-if="banners.length > 1" class="carousel-indicators">
        <button
          v-for="(banner, index) in banners"
          :key="`indicator-${banner.id}`"
          class="indicator"
          :class="{ active: index === currentSlide }"
          @click="goToSlide(index)"
          :aria-label="`Go to slide ${index + 1}`"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue';

// Props
const props = defineProps({
  banners: {
    type: Array,
    default: () => []
  },
  apiBase: {
    type: String,
    default: 'http://127.0.0.1:8000'
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  autoplayDelay: {
    type: Number,
    default: 5000 // 5 seconds
  }
});

// State
const currentSlide = ref(0);
let autoplayInterval = null;

// Methods
const nextSlide = () => {
  if (props.banners.length === 0) return;
  currentSlide.value = (currentSlide.value + 1) % props.banners.length;
};

const prevSlide = () => {
  if (props.banners.length === 0) return;
  currentSlide.value = currentSlide.value === 0 
    ? props.banners.length - 1 
    : currentSlide.value - 1;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

const startAutoplay = () => {
  if (props.autoplay && props.banners.length > 1) {
    autoplayInterval = setInterval(() => {
      nextSlide();
    }, props.autoplayDelay);
  }
};

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
};

const handleImageError = (event) => {
  console.error('Failed to load banner image:', event.target.src);
  event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"%3E%3Crect fill="%23ddd" width="1200" height="600"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24"%3EImage not found%3C/text%3E%3C/svg%3E';
};

// Lifecycle
onMounted(() => {
  startAutoplay();
});

onBeforeUnmount(() => {
  stopAutoplay();
});

// Restart autoplay when banners change
import { watch } from 'vue';
watch(() => props.banners, () => {
  stopAutoplay();
  currentSlide.value = 0;
  startAutoplay();
});
</script>

<style scoped>
.carousel-container {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.carousel-empty {
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-empty p {
  color: #6B7280;
  font-size: 18px;
  font-weight: 500;
}

.carousel {
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
  pointer-events: none;
}

.carousel-slide.active {
  opacity: 1;
  pointer-events: all;
}

.carousel-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.carousel-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(30, 58, 138, 0.8) 0%,
    rgba(30, 58, 138, 0.4) 50%,
    transparent 100%
  );
}

.carousel-content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 2;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  width: 100%;
}

.carousel-title {
  font-size: 56px;
  font-weight: 800;
  color: white;
  margin-bottom: 20px;
  line-height: 1.2;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  max-width: 700px;
  animation: slideInUp 0.8s ease-out;
}

.carousel-subtitle {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 32px;
  line-height: 1.5;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  animation: slideInUp 0.8s ease-out 0.2s;
  animation-fill-mode: backwards;
}

.carousel-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 36px;
  background: #EF4444;
  color: white;
  text-decoration: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
  animation: slideInUp 0.8s ease-out 0.4s;
  animation-fill-mode: backwards;
}

.carousel-button:hover {
  background: #DC2626;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.5);
}

.carousel-button svg {
  transition: transform 0.3s ease;
}

.carousel-button:hover svg {
  transform: translateX(4px);
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Navigation Arrows */
.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.carousel-nav:hover {
  background: white;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.carousel-nav.prev {
  left: 30px;
}

.carousel-nav.next {
  right: 30px;
}

.carousel-nav svg {
  color: #1E3A8A;
}

/* Indicators */
.carousel-indicators {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid white;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

.indicator.active {
  background: white;
  width: 32px;
  border-radius: 6px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .carousel {
    height: 500px;
  }

  .carousel-title {
    font-size: 42px;
  }

  .carousel-subtitle {
    font-size: 20px;
  }

  .carousel-button {
    font-size: 16px;
    padding: 14px 28px;
  }
}

@media (max-width: 768px) {
  .carousel {
    height: 400px;
  }

  .container {
    padding: 0 20px;
  }

  .carousel-title {
    font-size: 32px;
  }

  .carousel-subtitle {
    font-size: 16px;
    margin-bottom: 24px;
  }

  .carousel-button {
    font-size: 14px;
    padding: 12px 24px;
  }

  .carousel-nav {
    width: 40px;
    height: 40px;
  }

  .carousel-nav.prev {
    left: 15px;
  }

  .carousel-nav.next {
    right: 15px;
  }

  .carousel-indicators {
    bottom: 20px;
  }

  .indicator {
    width: 8px;
    height: 8px;
  }

  .indicator.active {
    width: 24px;
  }
}

@media (max-width: 480px) {
  .carousel {
    height: 350px;
  }

  .carousel-title {
    font-size: 24px;
  }

  .carousel-subtitle {
    font-size: 14px;
  }

  .carousel-overlay {
    background: linear-gradient(
      to top,
      rgba(30, 58, 138, 0.9) 0%,
      rgba(30, 58, 138, 0.6) 50%,
      rgba(30, 58, 138, 0.3) 100%
    );
  }

  .carousel-content {
    align-items: flex-end;
    padding-bottom: 60px;
  }
}
</style>