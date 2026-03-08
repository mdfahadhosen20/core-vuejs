<template>
  <div class="faq-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-background">
        <div class="floating-icon icon-1">❓</div>
        <div class="floating-icon icon-2">💡</div>
        <div class="floating-icon icon-3">📚</div>
        <div class="floating-icon icon-4">🎓</div>
        <div class="floating-icon icon-5">✨</div>
      </div>
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Frequently Asked Questions</h1>
          <p class="hero-description">
            Find answers to common questions about studying abroad, our services, and the application process
          </p>

          <!-- Quick Stats -->
          <div class="quick-stats">
            <div class="stat-item">
              <span class="stat-number">{{ categoryCount }}</span>
              <span class="stat-label">Categories</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ totalQuestions }}</span>
              <span class="stat-label">Questions</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">24/7</span>
              <span class="stat-label">Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-section">
      <div class="container">
        <div class="loading-content">
          <div class="spinner-large"></div>
          <p>Loading FAQs...</p>
        </div>
      </div>
    </div>

    <!-- Category Filters -->
    <div v-else-if="!loading && categoryCount > 0" class="category-section">
      <div class="container">
        <div class="category-tabs">
          <button 
            :class="['category-tab', { active: selectedCategory === 'all' }]"
            @click="selectCategory('all')"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            All Questions
            <span class="count">{{ totalQuestions }}</span>
          </button>
          <button 
            v-for="category in categories" 
            :key="category.id"
            :class="['category-tab', { active: selectedCategory === category.id }]"
            @click="selectCategory(category.id)"
          >
            <span class="category-emoji">{{ category.emoji }}</span>
            {{ category.name }}
            <span class="count">{{ category.count }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- FAQ Content -->
    <div v-if="!loading" class="faq-content-section">
      <div class="container">
        <!-- No FAQs State -->
        <div v-if="categoryCount === 0" class="no-results">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <h3>No FAQs Available</h3>
          <p>FAQs will be added soon. Check back later!</p>
        </div>

        <!-- FAQ List -->
        <transition-group v-else name="fade-slide" tag="div" class="faq-list">
          <div 
            v-for="(faq, index) in displayedFaqs" 
            :key="faq.id"
            class="faq-item"
            :class="{ active: activeFaq === faq.id }"
          >
            <div class="faq-question" @click="toggleFaq(faq.id)">
              <div class="question-content">
                <span class="question-number">{{ index + 1 }}</span>
                <h3>{{ faq.question }}</h3>
              </div>
              <div class="faq-controls">
                <span class="category-badge">{{ faq.categoryName }}</span>
                <svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>
            <transition name="expand">
              <div v-if="activeFaq === faq.id" class="faq-answer">
                <div class="answer-content">{{ faq.answer }}</div>
                <div class="answer-footer">
                  <button class="helpful-btn" @click.stop="markHelpful(faq.id)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                    </svg>
                    Helpful
                  </button>
                  <span class="helpful-count">{{ faq.helpfulCount || 0 }} found this helpful</span>
                </div>
              </div>
            </transition>
          </div>
        </transition-group>

        <!-- Empty Category -->
        <div v-if="displayedFaqs.length === 0 && categoryCount > 0" class="no-results">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <h3>No questions in this category yet</h3>
          <p>Check back soon or browse other categories</p>
        </div>
      </div>
    </div>

    <!-- Still Have Questions -->
    <div v-if="!loading" class="contact-cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="cta-content">
            <div class="cta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div class="cta-text">
              <h3>Still have questions?</h3>
              <p>Can't find the answer you're looking for? Our expert counselors are here to help you.</p>
            </div>
          </div>
          <div class="cta-buttons">
            <router-link to="/contact" class="cta-btn primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Contact Us
            </router-link>
            <a 
              v-if="systemSettings.phone" 
              :href="`tel:${systemSettings.phone}`" 
              class="cta-btn secondary"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Call Us Now
            </a>
            <router-link v-else to="/contact" class="cta-btn secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Book Free Consultation
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// API Configuration
const apiBase = ref(process.env.VUE_APP_BASE_API);

// State
const loading = ref(true);
const selectedCategory = ref('all');
const activeFaq = ref(null);
const faqData = ref({});
const systemSettings = ref({
  phone: ''
});

// Category metadata for icons/emojis
const categoryMetadata = {
  general: { emoji: '💼', name: 'General' },
  application: { emoji: '📝', name: 'Application Process' },
  tests: { emoji: '📊', name: 'Tests & Scores' },
  visa: { emoji: '✈️', name: 'Visa & Immigration' },
  financial: { emoji: '💰', name: 'Finances & Scholarships' },
  country: { emoji: '🌍', name: 'Country-Specific' },
  admission: { emoji: '🎓', name: 'Admissions' },
  scholarship: { emoji: '💵', name: 'Scholarships' },
  accommodation: { emoji: '🏠', name: 'Accommodation' },
  services: { emoji: '🛠️', name: 'Our Services' }
};

// Computed
const categories = computed(() => {
  return Object.keys(faqData.value).map(categoryId => {
    const metadata = categoryMetadata[categoryId] || { emoji: '📌', name: formatCategoryName(categoryId) };
    return {
      id: categoryId,
      name: metadata.name,
      emoji: metadata.emoji,
      count: faqData.value[categoryId]?.length || 0
    };
  }).filter(cat => cat.count > 0);
});

const categoryCount = computed(() => {
  return categories.value.length;
});

const allFaqs = computed(() => {
  let faqs = [];
  Object.keys(faqData.value).forEach(categoryId => {
    const categoryMeta = categories.value.find(c => c.id === categoryId);
    const categoryName = categoryMeta ? categoryMeta.name : formatCategoryName(categoryId);
    
    faqData.value[categoryId].forEach(faq => {
      faqs.push({
        ...faq,
        categoryId: categoryId,
        categoryName: categoryName,
        helpfulCount: faq.helpfulCount || 0
      });
    });
  });
  return faqs;
});

const displayedFaqs = computed(() => {
  if (selectedCategory.value === 'all') {
    return allFaqs.value;
  }
  return allFaqs.value.filter(faq => faq.categoryId === selectedCategory.value);
});

const totalQuestions = computed(() => {
  return allFaqs.value.length;
});

// Methods
const loadFaqs = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${apiBase.value}/faqs`);
    if (response.data && response.data.faqs) {
      faqData.value = response.data.faqs;
    }
  } catch (error) {
    console.error('Failed to load FAQs:', error);
    faqData.value = {};
  } finally {
    loading.value = false;
  }
};

const loadSystemSettings = async () => {
  try {
    const response = await axios.get(`${apiBase.value}/system`);
    if (response.data && response.data.system) {
      systemSettings.value = response.data.system;
    }
  } catch (error) {
    console.error('Failed to load system settings:', error);
  }
};

const formatCategoryName = (categoryId) => {
  // Convert snake_case or kebab-case to Title Case
  return categoryId
    .replace(/[_-]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const toggleFaq = (id) => {
  activeFaq.value = activeFaq.value === id ? null : id;
};

const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId;
  activeFaq.value = null;
};

const markHelpful = (id) => {
  const faq = allFaqs.value.find(f => f.id === id);
  if (faq) {
    faq.helpfulCount = (faq.helpfulCount || 0) + 1;
    // Optionally, you could send this to the backend
    // axios.post(`${apiBase.value}/api/faqs/${id}/helpful`)
  }
};

// Lifecycle
onMounted(() => {
  loadFaqs();
  loadSystemSettings();
});
</script>

<style scoped>
/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  padding: 80px 0 100px;
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

.floating-icon {
  position: absolute;
  font-size: 40px;
  opacity: 0.15;
  animation: float 6s ease-in-out infinite;
}

.icon-1 {
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.icon-2 {
  top: 20%;
  right: 15%;
  animation-delay: 1s;
}

.icon-3 {
  bottom: 20%;
  left: 20%;
  animation-delay: 2s;
}

.icon-4 {
  bottom: 15%;
  right: 10%;
  animation-delay: 3s;
}

.icon-5 {
  top: 50%;
  left: 50%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(5deg);
  }
  50% {
    transform: translateY(-10px) rotate(-5deg);
  }
  75% {
    transform: translateY(-15px) rotate(3deg);
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-description {
  font-size: 20px;
  line-height: 1.6;
  opacity: 0.95;
  margin-bottom: 48px;
}

/* Quick Stats */
.quick-stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 40px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 36px;
  font-weight: 800;
  color: #FCA5A5;
  line-height: 1;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.9;
}

/* Loading Section */
.loading-section {
  padding: 80px 0;
  background: #F9FAFB;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
}

.spinner-large {
  width: 60px;
  height: 60px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1E40AF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-content p {
  font-size: 16px;
  color: #6B7280;
  font-weight: 500;
}

/* Category Section */
.category-section {
  background: white;
  padding: 32px 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.category-tabs {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.category-tabs::-webkit-scrollbar {
  height: 6px;
}

.category-tabs::-webkit-scrollbar-track {
  background: #F3F4F6;
  border-radius: 3px;
}

.category-tabs::-webkit-scrollbar-thumb {
  background: #9CA3AF;
  border-radius: 3px;
}

.category-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #F9FAFB;
  border: 2px solid #E5E7EB;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 600;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.category-tab svg {
  width: 20px;
  height: 20px;
}

.category-tab:hover {
  border-color: #1E40AF;
  color: #1E40AF;
  background: white;
}

.category-tab.active {
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  color: white;
  border-color: transparent;
}

.category-emoji {
  font-size: 20px;
}

.count {
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
}

.category-tab.active .count {
  background: rgba(255, 255, 255, 0.25);
}

.category-tab:not(.active) .count {
  background: #E5E7EB;
  color: #6B7280;
}

/* FAQ Content */
.faq-content-section {
  padding: 60px 0;
  background: #F9FAFB;
  /* min-height: 500px; */
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 900px;
  margin: 0 auto;
}

.faq-item {
  background: white;
  border-radius: 12px;
  border: 2px solid #E5E7EB;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover {
  border-color: #1E40AF;
  box-shadow: 0 4px 16px rgba(30, 64, 175, 0.1);
}

.faq-item.active {
  border-color: #1E40AF;
  box-shadow: 0 8px 24px rgba(30, 64, 175, 0.15);
}

.faq-question {
  padding: 24px 28px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.question-content {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.question-number {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
}

.question-content h3 {
  font-size: 18px;
  font-weight: 700;
  color: #1E3A8A;
  line-height: 1.4;
  margin: 0;
}

.faq-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.category-badge {
  background: #F3F4F6;
  color: #6B7280;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.toggle-icon {
  width: 24px;
  height: 24px;
  color: #1E40AF;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.faq-item.active .toggle-icon {
  transform: rotate(180deg);
}

.faq-answer {
  border-top: 2px solid #F3F4F6;
  overflow: hidden;
}

.answer-content {
  padding: 28px;
  font-size: 16px;
  color: #4B5563;
  line-height: 1.8;
  white-space: pre-wrap;
}

.answer-footer {
  padding: 0 28px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.helpful-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #F3F4F6;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  color: #6B7280;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.helpful-btn:hover {
  background: #1E40AF;
  border-color: #1E40AF;
  color: white;
}

.helpful-btn svg {
  width: 18px;
  height: 18px;
}

.helpful-count {
  font-size: 13px;
  color: #9CA3AF;
}

/* No Results */
.no-results {
  text-align: center;
  padding: 80px 20px;
}

.no-results svg {
  width: 80px;
  height: 80px;
  color: #D1D5DB;
  margin-bottom: 24px;
}

.no-results h3 {
  font-size: 24px;
  font-weight: 700;
  color: #6B7280;
  margin-bottom: 12px;
}

.no-results p {
  font-size: 16px;
  color: #9CA3AF;
}

/* Contact CTA */
.contact-cta-section {
  padding: 80px 0;
  background: #F9FAFB;
}

.cta-card {
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  padding: 60px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  position: relative;
  overflow: hidden;
}

.cta-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%);
  border-radius: 50%;
}

.cta-content {
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;
  position: relative;
  z-index: 2;
}

.cta-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cta-icon svg {
  width: 40px;
  height: 40px;
  color: white;
}

.cta-text h3 {
  font-size: 32px;
  font-weight: 800;
  color: white;
  margin-bottom: 8px;
}

.cta-text p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  position: relative;
  z-index: 2;
}

.cta-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  white-space: nowrap;
  text-decoration: none;
}

.cta-btn svg {
  width: 20px;
  height: 20px;
}

.cta-btn.primary {
  background: #EF4444;
  color: white;
}

.cta-btn.primary:hover {
  background: #DC2626;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
}

.cta-btn.secondary {
  background: white;
  color: #1E40AF;
}

.cta-btn.secondary:hover {
  background: #F3F4F6;
  transform: translateY(-2px);
}

/* Transitions */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.expand-enter-active, .expand-leave-active {
  transition: all 0.3s ease;
}

.expand-enter-from, .expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to, .expand-leave-from {
  opacity: 1;
  max-height: 1000px;
}

/* Responsive */
@media (max-width: 1024px) {
  .cta-card {
    flex-direction: column;
    text-align: center;
  }

  .cta-content {
    flex-direction: column;
  }

  .cta-buttons {
    flex-direction: column;
    width: 100%;
  }

  .cta-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }

  .hero-description {
    font-size: 16px;
  }

  .quick-stats {
    gap: 32px;
  }

  .stat-number {
    font-size: 28px;
  }

  .category-tabs {
    flex-wrap: nowrap;
    overflow-x: auto;
  }

  .faq-question {
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
  }

  .question-content {
    width: 100%;
  }

  .faq-controls {
    width: 100%;
    justify-content: space-between;
    margin-top: 12px;
  }

  .answer-content {
    padding: 20px;
  }

  .answer-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .cta-card {
    padding: 40px 24px;
  }

  .cta-text h3 {
    font-size: 24px;
  }
}
</style>