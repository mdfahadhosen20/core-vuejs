<template>
  <section class="universities-section">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Our Partners</span>
        <h2 class="section-title">Partner Universities</h2>
        <p class="section-description">
          We have established partnerships with world-class universities to help you secure admissions
        </p>
      </div>

      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Loading universities...</p>
      </div>

      <div v-else-if="universities.length === 0" class="empty-state">
        <p>No partner universities available yet.</p>
      </div>

      <div v-else class="carousel-wrapper">
        <button class="carousel-btn" @click="prev" :disabled="currentIndex === 0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <div class="carousel-viewport" ref="viewportRef">
          <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * slideWidth}px)` }">
            <div
              v-for="uni in universities"
              :key="uni.id"
              class="university-card"
              :style="{ width: cardWidth + 'px' }"
            >
              <!-- Header -->
              <div class="card-header">
                <div class="university-logo">
                  <img v-if="uni.logo && !uni._logoFailed"
                    :src="`${storageBase}/${uni.logo}`"
                    :alt="uni.name"
                    class="logo-img"
                    @error="uni._logoFailed = true"
                  />
                  <div v-else class="logo-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                    </svg>
                  </div>
                </div>
                <div class="university-meta">
                  <h3 class="university-name">{{ uni.name }}</h3>
                  <div class="university-location" v-if="uni.city || uni.country">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {{ [uni.city, uni.country.name].filter(Boolean).join(', ') }}
                  </div>
                  <div class="ranking-badge" v-if="uni.ranking">
                    ★ Ranked #{{ uni.ranking }}
                  </div>
                </div>
              </div>

              <div class="card-divider"></div>

              <!-- Stats -->
              <div class="stats-row">
                <div class="stat-item" v-if="uni.students_enrolled">
                  <span class="stat-value">{{ uni.students_enrolled }}+</span>
                  <span class="stat-label">Students</span>
                </div>
                <div class="stat-item" v-if="uni.acceptance_rate">
                  <span class="stat-value">{{ uni.acceptance_rate }}%</span>
                  <span class="stat-label">Acceptance</span>
                </div>
                <div class="stat-item" v-if="uni.established">
                  <span class="stat-value">{{ uni.established }}</span>
                  <span class="stat-label">Est.</span>
                </div>
              </div>

              <!-- Info Grid -->
              <div class="info-grid">
                <div class="info-item" v-if="uni.tuition_fee">
                  <div class="info-icon tuition">💰</div>
                  <div class="info-text">
                    <span class="info-label">Tuition Fee</span>
                    <span class="info-value">{{ uni.tuition_fee }}</span>
                  </div>
                </div>
                <div class="info-item" v-if="uni.duration">
                  <div class="info-icon duration">⏱</div>
                  <div class="info-text">
                    <span class="info-label">Duration</span>
                    <span class="info-value">{{ uni.duration }}</span>
                  </div>
                </div>
                <div class="info-item" v-if="uni.intake_session">
                  <div class="info-icon intake">📋</div>
                  <div class="info-text">
                    <span class="info-label">Intake</span>
                    <span class="info-value">{{ uni.intake_session }}</span>
                  </div>
                </div>
                <div class="info-item" v-if="uni.language">
                  <div class="info-icon language">🌐</div>
                  <div class="info-text">
                    <span class="info-label">Language</span>
                    <span class="info-value">{{ uni.language }}</span>
                  </div>
                </div>
              </div>

              <!-- Program Tags -->
              <div class="programs-tags" v-if="uni.programs?.length">
                <span v-for="(p, i) in uni.programs.slice(0, 3)" :key="i" class="program-tag">{{ p }}</span>
                <span v-if="uni.programs.length > 3" class="program-tag more">+{{ uni.programs.length - 3 }}</span>
              </div>

              <!-- Footer -->
              <div class="card-footer">
                <!-- <router-link :to="`/university/${uni.id}`" class="view-btn">
                  View Details
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </router-link> -->
                <a class="view-btn" v-if="uni.website" :href="uni.website" target="_blank">↗ Site</a>
              </div>
            </div>
          </div>
        </div>

        <button class="carousel-btn" @click="next" :disabled="currentIndex >= maxIndex">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      <!-- Dots -->
      <div class="carousel-dots" v-if="universities.length > visibleCount">
        <button v-for="i in (maxIndex + 1)" :key="i" class="dot" :class="{ active: currentIndex === i - 1 }" @click="goTo(i - 1)"></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, defineProps } from 'vue'
import axios from 'axios'

const props = defineProps({
  apiEndpoint: { type: String, default: null },
  staticData:  { type: Array,  default: null }
})

const storageBase = process.env.VUE_APP_STORAGE_URL || ''
const apiBase     = process.env.VUE_APP_BASE_API    || ''

const universities = ref([])
const loading      = ref(false)
const currentIndex = ref(0)
const viewportRef  = ref(null)
const cardWidth    = ref(280)
const visibleCount = ref(4)
const gap          = 24

const slideWidth = computed(() => cardWidth.value + gap)
const maxIndex   = computed(() => Math.max(0, universities.value.length - visibleCount.value))

const prev  = () => { if (currentIndex.value > 0) currentIndex.value-- }
const next  = () => { if (currentIndex.value < maxIndex.value) currentIndex.value++ }
const goTo  = (i) => { currentIndex.value = Math.min(Math.max(i, 0), maxIndex.value) }

const calculateSizes = () => {
  if (!viewportRef.value) return
  const vw = viewportRef.value.offsetWidth
  visibleCount.value = vw < 640 ? 1 : vw < 900 ? 2 : vw < 1100 ? 3 : 4
  cardWidth.value = (vw - gap * (visibleCount.value - 1)) / visibleCount.value
}

const loadUniversities = async () => {
  if (props.staticData) { universities.value = props.staticData; return }
  loading.value = true
  try {
    const res = await axios.get(props.apiEndpoint || `${apiBase}/universities`)
    const raw = res.data.universities || res.data.data || res.data || []

    // Parse programs JSON string for each university
    universities.value = raw.map(uni => ({
      ...uni,
      programs: parsePrograms(uni.programs)
    }))
  } catch (e) {
    console.error('Failed to load universities:', e)
  } finally {
    loading.value = false
  }
}

const parsePrograms = (value) => {
  if (!value) return []
  if (Array.isArray(value)) return value
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return value.split(',').map(s => s.trim()).filter(Boolean)
    }
  }
  return []
}

let ro = null
onMounted(async () => {
  await loadUniversities()
  await nextTick()
  calculateSizes()
  ro = new ResizeObserver(calculateSizes)
  if (viewportRef.value) ro.observe(viewportRef.value)
})
onUnmounted(() => ro?.disconnect())
</script>

<style scoped>
.universities-section { background: #fff; padding: 80px 0; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

.section-header { text-align: center; margin-bottom: 56px; }
.section-badge {
  display: inline-block; background: linear-gradient(135deg, #1E40AF, #1E3A8A);
  color: white; padding: 7px 20px; border-radius: 20px; font-size: 13px;
  font-weight: 600; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.6px;
}
.section-title { font-size: 38px; font-weight: 800; color: #1E3A8A; margin-bottom: 12px; }
.section-description { font-size: 17px; color: #6B7280; max-width: 600px; margin: 0 auto; line-height: 1.6; }

.loading-container { display: flex; flex-direction: column; align-items: center; padding: 60px; }
.spinner { width: 46px; height: 46px; border: 4px solid #f0f0f0; border-top-color: #1E40AF; border-radius: 50%; animation: spin 0.9s linear infinite; margin-bottom: 14px; }
@keyframes spin { to { transform: rotate(360deg); } }
.loading-container p, .empty-state { color: #9CA3AF; text-align: center; padding: 40px; }

/* Carousel */
.carousel-wrapper { display: flex; align-items: center; gap: 10px; }
.carousel-viewport { flex: 1; overflow: hidden; }
.carousel-track { display: flex; gap: 24px; transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1); }

.carousel-btn {
  flex-shrink: 0; width: 42px; height: 42px; border-radius: 50%;
  border: 2px solid #E5E7EB; background: white; color: #1E40AF;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}
.carousel-btn:hover:not(:disabled) { background: #1E40AF; border-color: #1E40AF; color: white; transform: scale(1.08); }
.carousel-btn:disabled { opacity: 0.3; cursor: not-allowed; }

.carousel-dots { display: flex; justify-content: center; gap: 8px; margin-top: 28px; }
.dot { width: 10px; height: 10px; border-radius: 50%; border: none; background: #D1D5DB; cursor: pointer; transition: all 0.3s ease; padding: 0; }
.dot.active { background: #1E40AF; width: 26px; border-radius: 5px; }

/* Card */
.university-card {
  flex-shrink: 0; background: white; border-radius: 16px;
  border: 1.5px solid #E5E7EB; display: flex; flex-direction: column;
  transition: all 0.3s ease;
}
.university-card:hover { border-color: #1E40AF; box-shadow: 0 12px 36px rgba(30,64,175,0.12); transform: translateY(-4px); }

.card-header { display: flex; align-items: flex-start; gap: 12px; padding: 18px 18px 14px; }
.university-logo {
  width: 52px; height: 52px; border-radius: 10px; border: 1.5px solid #E5E7EB;
  overflow: hidden; flex-shrink: 0; background: #F9FAFB;
  display: flex; align-items: center; justify-content: center;
}
.logo-img { width: 100%; height: 100%; object-fit: contain; padding: 4px; }
.logo-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #EFF6FF, #DBEAFE); color: #1E40AF; }

.university-meta { flex: 1; min-width: 0; }
.university-name { font-size: 14px; font-weight: 700; color: #1E3A8A; margin: 0 0 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.university-location { display: flex; align-items: center; gap: 4px; font-size: 12px; color: #6B7280; margin-bottom: 5px; }
.ranking-badge { display: inline-block; background: #FEF3C7; color: #D97706; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 20px; }

.card-divider { height: 1px; background: #F3F4F6; }

.stats-row { display: flex; justify-content: space-around; padding: 12px 14px; background: #F8FAFF; }
.stat-item { display: flex; flex-direction: column; align-items: center; }
.stat-value { font-size: 13px; font-weight: 700; color: #1E3A8A; }
.stat-label { font-size: 10px; color: #9CA3AF; }

.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 12px 16px; flex: 1; }
.info-item { display: flex; align-items: flex-start; gap: 7px; }
.info-icon { width: 28px; height: 28px; border-radius: 7px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 13px; }
.info-icon.tuition  { background: #D1FAE5; }
.info-icon.duration { background: #E0E7FF; }
.info-icon.intake   { background: #FEE2E2; }
.info-icon.language { background: #FEF3C7; }
.info-text { display: flex; flex-direction: column; }
.info-label { font-size: 10px; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.4px; }
.info-value { font-size: 12px; font-weight: 600; color: #374151; line-height: 1.3; }

.programs-tags { display: flex; flex-wrap: wrap; gap: 5px; padding: 0 16px 12px; }
.program-tag { background: #EFF6FF; color: #1E40AF; font-size: 11px; font-weight: 500; padding: 3px 9px; border-radius: 20px; border: 1px solid #DBEAFE; }
.program-tag.more { background: #F3F4F6; color: #6B7280; border-color: #E5E7EB; }

.card-footer { display: flex; align-items: center; gap: 8px; padding: 12px 16px; border-top: 1px solid #F3F4F6; background: #FAFAFA; margin-top: auto; }
.view-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 5px; background: linear-gradient(135deg, #1E40AF, #1E3A8A); color: white; padding: 8px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; text-decoration: none; transition: all 0.3s ease; }
.view-btn:hover { box-shadow: 0 4px 12px rgba(30,64,175,0.35); transform: translateY(-1px); }
.website-btn { color: #6B7280; font-size: 12px; font-weight: 500; text-decoration: none; padding: 8px 10px; border: 1.5px solid #E5E7EB; border-radius: 8px; transition: all 0.25s ease; white-space: nowrap; }
.website-btn:hover { color: #1E40AF; border-color: #1E40AF; background: #EFF6FF; }

@media (max-width: 768px) { .section-title { font-size: 28px; } .carousel-btn { width: 36px; height: 36px; } }
</style>