<template>
  <div class="shanta-carousel">
    
    <transition-group :name="getTransitionType(currentSlide)">
      <div 
        v-for="(slide, index) in slides" 
        v-show="currentSlide === index"
        :key="slide.id"
        class="slide-wrapper"
      >
        <div class="image-container">
          <img :src="slide.image" :alt="slide.title" class="main-img" />
          <div class="dark-overlay"></div>
        </div>

        <div class="content-overlay">
          <div class="text-group">
            <p class="subtitle animate-up">{{ slide.subtitle }}</p>
            <h1 class="title animate-up-slow">{{ slide.title }}</h1>
            <button class="cta-btn animate-fade">Explore Project</button>
          </div>
        </div>
      </div>
    </transition-group>

    <div class="navigation">
      <div 
        v-for="(slide, index) in slides" 
        :key="index"
        @click="goToSlide(index)"
        class="nav-block"
      >
        <div class="progress-container">
          <div 
            class="progress-fill"
            :style="{ width: currentSlide === index ? progress + '%' : '0%' }"
          ></div>
        </div>
        <span class="nav-label">0{{ index + 1 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const slides = ref([
  { id: 1, title: "The Skymark", subtitle: "Prestige Living", image: require('@/assets/files/banners/banner-3.jpg') },
  { id: 2, title: "Forum Shanta", subtitle: "Commercial Hub", image: require('@/assets/files/banners/banner-2.jpg') },
  { id: 3, title: "Mirzapur", subtitle: "Heritage Design", image: require('@/assets/files/banners/banner-1.jpg') },
]);

const currentSlide = ref(0);
const progress = ref(0);
const duration = 6000;
let timer = null;

// Logic to rotate 3 different transition types
const getTransitionType = (index) => {
  const types = ['reveal-center', 'zoom-fade', 'mask-up'];
  return types[index % types.length];
};

const runCarousel = () => {
  const step = 100 / (duration / 50);
  timer = setInterval(() => {
    if (progress.value < 100) {
      progress.value += step;
    } else {
      nextSlide();
    }
  }, 50);
};

const nextSlide = () => {
  progress.value = 0;
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};

const goToSlide = (i) => {
  progress.value = 0;
  currentSlide.value = i;
};

onMounted(() => runCarousel());
onUnmounted(() => clearInterval(timer));
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

.text-group { pointer-events: auto; }

.subtitle {
  color: #fbbf24;
  text-transform: uppercase;
  letter-spacing: 0.5em;
  font-size: 14px;
  margin-bottom: 20px;
}

.title {
  font-size: clamp(3rem, 10vw, 7rem);
  font-weight: 300;
  margin: 0 0 40px 0;
  font-family: serif;
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
}

.progress-container {
  height: 2px;
  background: rgba(255,255,255,0.1);
  margin-bottom: 10px;
  position: relative;
}

.progress-fill {
  position: absolute;
  height: 100%;
  background: white;
}

.nav-label {
  font-size: 10px;
  color: rgba(255,255,255,0.5);
}

/* 5. CONTENT REVEAL ANIMATIONS */
.animate-up { animation: up 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.5s both; }
.animate-up-slow { animation: up 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.7s both; }
.animate-fade { animation: fade 1.5s ease 1s both; }

@keyframes up {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>