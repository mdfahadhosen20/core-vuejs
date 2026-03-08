<template>
  <div class="country-services-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <span class="hero-badge">Study Destinations</span>
          <h1 class="hero-title">Explore Your Dream Destination</h1>
          <p class="hero-description">
            Compare programs across top study destinations worldwide. Find the perfect match for your academic goals and budget.
          </p>
        </div>
      </div>
    </section>

    <!-- Filter & Results Section -->
    <section class="content-section">
      <div class="container-fluid">
        <div class="content-wrapper">
          <!-- Left Sidebar - Filters -->
          <aside class="filters-sidebar">
            <div class="sidebar-sticky">
              <div class="filter-header">
                <h2 class="filter-title">
                  <svg class="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                  </svg>
                  Filters
                </h2>
                <button v-if="hasActiveFilters" class="clear-filters-btn" @click="clearAllFilters">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                  Clear
                </button>
              </div>

              <div class="filters-list">
                <!-- Search -->
                <div class="filter-group">
                  <label class="filter-label">
                    <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.35-4.35"/>
                    </svg>
                    Search
                  </label>
                  <input 
                    type="text" 
                    v-model="filters.search" 
                    placeholder="Search countries or programs..."
                    class="filter-input"
                  />
                </div>

                <!-- Country Filter -->
                <div class="filter-group">
                  <label class="filter-label">
                    <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                    Country
                  </label>
                  <select v-model="filters.country" class="filter-select">
                    <option value="">All Countries</option>
                    <option value="usa">United States</option>
                    <option value="canada">Canada</option>
                    <option value="uk">United Kingdom</option>
                    <option value="malaysia">Malaysia</option>
                    <option value="australia">Australia</option>
                    <option value="germany">Germany</option>
                  </select>
                </div>

                <!-- Program Level -->
                <div class="filter-group">
                  <label class="filter-label">
                    <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                    </svg>
                    Program Level
                  </label>
                  <select v-model="filters.programLevel" class="filter-select">
                    <option value="">All Levels</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="graduate">Graduate</option>
                    <option value="postgraduate">Postgraduate</option>
                  </select>
                </div>

                <!-- Tuition Range -->
                <div class="filter-group">
                  <label class="filter-label">
                    <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    Tuition Fee (USD/Year)
                  </label>
                  <select v-model="filters.tuitionRange" class="filter-select">
                    <option value="">Any Budget</option>
                    <option value="0-10000">Under $10,000</option>
                    <option value="10000-20000">$10,000 - $20,000</option>
                    <option value="20000-30000">$20,000 - $30,000</option>
                    <option value="30000-50000">$30,000 - $50,000</option>
                    <option value="50000+">$50,000+</option>
                  </select>
                </div>

                <!-- Intake -->
                <div class="filter-group">
                  <label class="filter-label">
                    <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    Intake
                  </label>
                  <select v-model="filters.intake" class="filter-select">
                    <option value="">All Intakes</option>
                    <option value="fall">Fall (Sep-Nov)</option>
                    <option value="spring">Spring (Jan-Mar)</option>
                    <option value="summer">Summer (May-Jul)</option>
                  </select>
                </div>

                <!-- Sort By -->
                <div class="filter-group">
                  <label class="filter-label">
                    <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="m3 16 4 4 4-4M7 20V4M21 8l-4-4-4 4M17 4v16"/>
                    </svg>
                    Sort By
                  </label>
                  <select v-model="filters.sortBy" class="filter-select">
                    <option value="name">Name (A-Z)</option>
                    <option value="tuition-low">Tuition (Low to High)</option>
                    <option value="tuition-high">Tuition (High to Low)</option>
                    <option value="popularity">Popularity</option>
                  </select>
                </div>
              </div>

              <!-- Active Filters Summary (Mobile) -->
              <div v-if="hasActiveFilters" class="active-filters-summary">
                <p class="active-count">{{ activeFiltersCount }} filters active</p>
              </div>
            </div>
          </aside>

          <!-- Main Content Area -->
          <main class="main-content">
            <!-- Results Header -->
            <div class="results-header">
              <div class="results-count">
                <h3>
                  <span class="count-number">{{ filteredCountries.length }}</span>
                  {{ filteredCountries.length === 1 ? 'Program' : 'Programs' }} Found
                </h3>
                <p class="results-subtitle">Based on your selected filters</p>
              </div>
              
              <!-- View Toggle -->
              <div class="view-toggle">
                <button 
                  :class="['view-btn', { active: viewMode === 'grid' }]"
                  @click="viewMode = 'grid'"
                  title="Grid View"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="7" height="7"/>
                    <rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/>
                  </svg>
                </button>
                <button 
                  :class="['view-btn', { active: viewMode === 'list' }]"
                  @click="viewMode = 'list'"
                  title="List View"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="8" y1="6" x2="21" y2="6"/>
                    <line x1="8" y1="12" x2="21" y2="12"/>
                    <line x1="8" y1="18" x2="21" y2="18"/>
                    <line x1="3" y1="6" x2="3.01" y2="6"/>
                    <line x1="3" y1="12" x2="3.01" y2="12"/>
                    <line x1="3" y1="18" x2="3.01" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- No Results -->
            <div v-if="filteredCountries.length === 0" class="no-results">
              <div class="no-results-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <h3>No Programs Found</h3>
              <p>Try adjusting your filters to see more results</p>
              <button class="reset-btn" @click="clearAllFilters">Reset Filters</button>
            </div>

            <!-- Countries Grid/List -->
            <div v-else :class="['countries-container', viewMode]">
              <div 
                v-for="country in filteredCountries" 
                :key="country.id"
                :class="['country-card', viewMode]"
              >
                <!-- Country Flag & Name -->
                <div class="country-header">
                  <div class="country-flag-section">
                    <div class="country-flag-wrapper">
                      <img :src="country.flag" :alt="country.name" class="country-flag-img" />
                    </div>
                    <div class="country-basic-info">
                      <h3 class="country-name">{{ country.name }}</h3>
                      <div class="country-meta">
                        <span class="meta-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                          </svg>
                          {{ country.programCount }} Programs
                        </span>
                        <span class="meta-divider">•</span>
                        <span class="meta-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                          </svg>
                          {{ country.studentCount }}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="country-badge" :class="country.popularityClass">
                    {{ country.popularityLabel }}
                  </div>
                </div>

                <!-- Country Description -->
                <p class="country-description">{{ country.description }}</p>

                <!-- Key Stats -->
                <div class="country-stats-grid">
                  <div class="stat-card">
                    <div class="stat-icon tuition">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="1" x2="12" y2="23"/>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                    </div>
                    <div class="stat-content">
                      <span class="stat-label">Avg. Tuition</span>
                      <span class="stat-value">{{ country.avgTuition }}</span>
                    </div>
                  </div>

                  <div class="stat-card">
                    <div class="stat-icon duration">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                    </div>
                    <div class="stat-content">
                      <span class="stat-label">Duration</span>
                      <span class="stat-value">{{ country.duration }}</span>
                    </div>
                  </div>

                  <div class="stat-card">
                    <div class="stat-icon visa">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                        <line x1="1" y1="10" x2="23" y2="10"/>
                      </svg>
                    </div>
                    <div class="stat-content">
                      <span class="stat-label">Visa Success</span>
                      <span class="stat-value">{{ country.visaSuccess }}</span>
                    </div>
                  </div>
                </div>

                <!-- Features -->
                <div class="country-features">
                  <span 
                    v-for="feature in country.features" 
                    :key="feature"
                    class="feature-tag"
                  >
                    {{ feature }}
                  </span>
                </div>

                <!-- Programs Available -->
                <div class="programs-available">
                  <h4 class="programs-title">Programs Available:</h4>
                  <div class="program-tags">
                    <span 
                      v-for="program in country.programs" 
                      :key="program"
                      class="program-tag"
                    >
                      {{ program }}
                    </span>
                  </div>
                </div>

                <!-- Intake Info -->
                <div class="intake-info">
                  <svg class="intake-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span><strong>Next Intakes:</strong> {{ country.nextIntakes }}</span>
                </div>

                <!-- Action Buttons -->
                <div class="card-actions">
                  <button class="action-btn primary" @click="viewDetails(country)">
                    View Details
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                  <button class="action-btn secondary" @click="downloadBrochure(country)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Brochure
                  </button>
                  <button class="action-btn icon-btn" @click="toggleCompare(country)" :class="{ active: isInCompare(country.id) }">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      <polyline points="16 8 20 4 20 8"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>

    <!-- Comparison Sticky Bar -->
    <transition name="slide-up">
      <div v-if="compareList.length > 0" class="comparison-bar">
        <div class="container">
          <div class="comparison-content">
            <div class="comparison-info">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              <span><strong>{{ compareList.length }}</strong> programs selected for comparison</span>
            </div>
            <div class="comparison-actions">
              <button class="compare-btn" @click="comparePrograms" :disabled="compareList.length < 2">
                Compare Now
              </button>
              <button class="clear-compare-btn" @click="clearCompare">
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Need Help Choosing?</h2>
          <p class="cta-description">
            Our expert counselors are here to guide you through the selection process and help you find the perfect program
          </p>
          <div class="cta-buttons">
            <button class="cta-button primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Schedule Free Consultation
            </button>
            <button class="cta-button secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Filters
const filters = ref({
  search: '',
  country: '',
  programLevel: '',
  tuitionRange: '',
  intake: '',
  sortBy: 'name'
});

// View Mode
const viewMode = ref('grid'); // 'grid' or 'list'

// Compare List
const compareList = ref([]);

// Sample Country Data
const countries = ref([
  {
    id: 1,
    name: 'United States',
    flag: 'https://flagcdn.com/w320/us.png',
    description: 'Home to the world\'s top universities including Ivy League institutions. Perfect for STEM excellence and research opportunities.',
    programCount: '5,000+',
    studentCount: '1M+ Students',
    avgTuition: '$25,000-$55,000',
    duration: '2-4 Years',
    visaSuccess: '89%',
    popularityLabel: 'Most Popular',
    popularityClass: 'hot',
    features: ['STEM OPT', 'Research Hub', 'Work Opportunities'],
    programs: ['Undergraduate', 'Graduate', 'PhD'],
    nextIntakes: 'Fall 2024, Spring 2025',
    countryCode: 'usa',
    tuitionMin: 25000,
    tuitionMax: 55000
  },
  {
    id: 2,
    name: 'Canada',
    flag: 'https://flagcdn.com/w320/ca.png',
    description: 'Affordable, high-quality education with excellent immigration pathways and welcoming multicultural environment.',
    programCount: '400+',
    studentCount: '600K+ Students',
    avgTuition: '$15,000-$35,000',
    duration: '1-4 Years',
    visaSuccess: '92%',
    popularityLabel: 'Top Choice',
    popularityClass: 'trending',
    features: ['PR Pathways', 'Co-op Programs', 'Safe & Welcoming'],
    programs: ['Undergraduate', 'Graduate', 'Diploma'],
    nextIntakes: 'Sep 2024, Jan 2025, May 2025',
    countryCode: 'canada',
    tuitionMin: 15000,
    tuitionMax: 35000
  },
  {
    id: 3,
    name: 'United Kingdom',
    flag: 'https://flagcdn.com/w320/gb.png',
    description: 'Historic universities with globally recognized degrees, rich culture, and shorter program durations.',
    programCount: '160+',
    studentCount: '500K+ Students',
    avgTuition: '$20,000-$45,000',
    duration: '1-3 Years',
    visaSuccess: '85%',
    popularityLabel: 'Premium',
    popularityClass: 'premium',
    features: ['1-Year Masters', 'Oxford & Cambridge', 'PSW Visa'],
    programs: ['Undergraduate', 'Graduate', 'PhD'],
    nextIntakes: 'Sep 2024, Jan 2025',
    countryCode: 'uk',
    tuitionMin: 20000,
    tuitionMax: 45000
  },
  {
    id: 4,
    name: 'Malaysia',
    flag: 'https://flagcdn.com/w320/my.png',
    description: 'Affordable Asian education hub with diverse culture, quality programs, and English-medium instruction.',
    programCount: '70+',
    studentCount: '150K+ Students',
    avgTuition: '$4,000-$12,000',
    duration: '1-4 Years',
    visaSuccess: '95%',
    popularityLabel: 'Best Value',
    popularityClass: 'value',
    features: ['Low Cost', 'English Medium', 'Gateway to Asia'],
    programs: ['Undergraduate', 'Graduate', 'Foundation'],
    nextIntakes: 'Mar 2024, Jul 2024, Oct 2024',
    countryCode: 'malaysia',
    tuitionMin: 4000,
    tuitionMax: 12000
  },
  {
    id: 5,
    name: 'Australia',
    flag: 'https://flagcdn.com/w320/au.png',
    description: 'World-class education with stunning lifestyle, strong research focus, and excellent post-study work rights.',
    programCount: '150+',
    studentCount: '700K+ Students',
    avgTuition: '$20,000-$45,000',
    duration: '1-4 Years',
    visaSuccess: '88%',
    popularityLabel: 'Popular',
    popularityClass: 'trending',
    features: ['High Quality of Life', 'Research Excellence', 'Work Rights'],
    programs: ['Undergraduate', 'Graduate', 'PhD'],
    nextIntakes: 'Feb 2025, Jul 2025',
    countryCode: 'australia',
    tuitionMin: 20000,
    tuitionMax: 45000
  },
  {
    id: 6,
    name: 'Germany',
    flag: 'https://flagcdn.com/w320/de.png',
    description: 'Free or low-cost education at world-renowned institutions with strong engineering and technical programs.',
    programCount: '400+',
    studentCount: '400K+ Students',
    avgTuition: '$0-$5,000',
    duration: '2-4 Years',
    visaSuccess: '82%',
    popularityLabel: 'Free Education',
    popularityClass: 'value',
    features: ['Low/No Tuition', 'Engineering Hub', 'Job Market'],
    programs: ['Undergraduate', 'Graduate', 'PhD'],
    nextIntakes: 'Oct 2024, Apr 2025',
    countryCode: 'germany',
    tuitionMin: 0,
    tuitionMax: 5000
  }
]);

// Computed - Filtered Countries
const filteredCountries = computed(() => {
  let result = [...countries.value];

  // Search filter
  if (filters.value.search) {
    const searchLower = filters.value.search.toLowerCase();
    result = result.filter(c => 
      c.name.toLowerCase().includes(searchLower) ||
      c.description.toLowerCase().includes(searchLower) ||
      c.programs.some(p => p.toLowerCase().includes(searchLower))
    );
  }

  // Country filter
  if (filters.value.country) {
    result = result.filter(c => c.countryCode === filters.value.country);
  }

  // Program level filter
  if (filters.value.programLevel) {
    result = result.filter(c => 
      c.programs.some(p => p.toLowerCase() === filters.value.programLevel.toLowerCase())
    );
  }

  // Tuition range filter
  if (filters.value.tuitionRange) {
    const [min, max] = filters.value.tuitionRange.split('-').map(v => 
      v.replace('+', '').trim() === '' ? Infinity : parseInt(v.replace('+', ''))
    );
    
    result = result.filter(c => {
      const countryMax = c.tuitionMax;
      const countryMin = c.tuitionMin;
      
      if (max === undefined) {
        return countryMin >= min;
      }
      return countryMax >= min && countryMin <= max;
    });
  }

  // Sort
  if (filters.value.sortBy === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (filters.value.sortBy === 'tuition-low') {
    result.sort((a, b) => a.tuitionMin - b.tuitionMin);
  } else if (filters.value.sortBy === 'tuition-high') {
    result.sort((a, b) => b.tuitionMax - a.tuitionMax);
  }

  return result;
});

// Computed - Has Active Filters
const hasActiveFilters = computed(() => {
  return filters.value.search || 
         filters.value.country || 
         filters.value.programLevel || 
         filters.value.tuitionRange || 
         filters.value.intake ||
         filters.value.sortBy !== 'name';
});

// Computed - Active Filters Count
const activeFiltersCount = computed(() => {
  let count = 0;
  if (filters.value.search) count++;
  if (filters.value.country) count++;
  if (filters.value.programLevel) count++;
  if (filters.value.tuitionRange) count++;
  if (filters.value.intake) count++;
  if (filters.value.sortBy !== 'name') count++;
  return count;
});

// Methods
const clearAllFilters = () => {
  filters.value = {
    search: '',
    country: '',
    programLevel: '',
    tuitionRange: '',
    intake: '',
    sortBy: 'name'
  };
};

const viewDetails = (country) => {
  router.push(`/country/${country.id}`);
};

const downloadBrochure = (country) => {
  console.log('Download brochure for', country.name);
  // Implement download logic
};

const toggleCompare = (country) => {
  const index = compareList.value.findIndex(c => c.id === country.id);
  if (index > -1) {
    compareList.value.splice(index, 1);
  } else {
    if (compareList.value.length < 4) {
      compareList.value.push(country);
    } else {
      alert('You can compare up to 4 programs at a time');
    }
  }
};

const isInCompare = (countryId) => {
  return compareList.value.some(c => c.id === countryId);
};

const comparePrograms = () => {
  const ids = compareList.value.map(c => c.id).join(',');
  router.push(`/compare?programs=${ids}`);
};

const clearCompare = () => {
  compareList.value = [];
};
</script>

<style scoped>
.country-services-page {
  background: #F9FAFB;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.container-fluid {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  padding: 80px 0 60px;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%);
  border-radius: 50%;
}

.hero-content {
  text-align: center;
  position: relative;
  z-index: 2;
}

.hero-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.hero-title {
  font-size: 48px;
  font-weight: 800;
  color: white;
  margin-bottom: 16px;
  line-height: 1.2;
}

.hero-description {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Content Section with Sidebar */
.content-section {
  padding: 40px 0 80px;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 32px;
  align-items: start;
}

/* Left Sidebar - Filters */
.filters-sidebar {
  position: relative;
}

.sidebar-sticky {
  position: sticky;
  top: 20px;
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 2px solid #E5E7EB;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #F3F4F6;
}

.filter-title {
  font-size: 18px;
  font-weight: 700;
  color: #1E3A8A;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-icon {
  width: 20px;
  height: 20px;
  color: #EF4444;
}

.clear-filters-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: white;
  border: 1.5px solid #EF4444;
  color: #EF4444;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-filters-btn:hover {
  background: #EF4444;
  color: white;
}

.clear-filters-btn svg {
  width: 14px;
  height: 14px;
}

.filters-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 6px;
}

.input-icon {
  width: 14px;
  height: 14px;
  color: #6B7280;
}

.filter-input,
.filter-select {
  padding: 10px 12px;
  border: 1.5px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.3s ease;
  font-family: inherit;
  width: 100%;
}

.filter-input:focus,
.filter-select:focus {
  outline: none;
  border-color: #1E40AF;
  box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
}

.active-filters-summary {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 2px solid #F3F4F6;
}

.active-count {
  font-size: 13px;
  color: #1E40AF;
  font-weight: 600;
  text-align: center;
}

/* Main Content Area */
.main-content {
  min-width: 0;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.results-count h3 {
  font-size: 28px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 4px;
}

.count-number {
  color: #EF4444;
}

.results-subtitle {
  font-size: 14px;
  color: #6B7280;
}

.view-toggle {
  display: flex;
  gap: 8px;
  background: white;
  padding: 4px;
  border-radius: 10px;
  border: 1.5px solid #E5E7EB;
}

.view-btn {
  padding: 10px 16px;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.view-btn svg {
  width: 20px;
  height: 20px;
  color: #6B7280;
  transition: color 0.3s ease;
}

.view-btn.active {
  background: #1E40AF;
}

.view-btn.active svg {
  color: white;
}

.view-btn:hover:not(.active) {
  background: #F3F4F6;
}

/* No Results */
.no-results {
  text-align: center;
  padding: 80px 20px;
}

.no-results-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: #F3F4F6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-results-icon svg {
  width: 40px;
  height: 40px;
  color: #9CA3AF;
}

.no-results h3 {
  font-size: 24px;
  color: #1E3A8A;
  margin-bottom: 8px;
}

.no-results p {
  font-size: 16px;
  color: #6B7280;
  margin-bottom: 24px;
}

.reset-btn {
  padding: 12px 32px;
  background: #1E40AF;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  background: #1E3A8A;
  transform: translateY(-2px);
}

/* Countries Container */
.countries-container.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.countries-container.list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Country Card */
.country-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  border: 2px solid #E5E7EB;
  transition: all 0.4s ease;
}

.country-card:hover {
  border-color: #1E40AF;
  box-shadow: 0 12px 32px rgba(30, 64, 175, 0.15);
  transform: translateY(-4px);
}

.country-card.list {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 32px;
  align-items: start;
}

.country-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.country-flag-section {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.country-flag-wrapper {
  width: 80px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.country-flag-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.country-basic-info {
  flex: 1;
}

.country-name {
  font-size: 24px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 8px;
}

.country-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #6B7280;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-item svg {
  width: 16px;
  height: 16px;
  color: #9CA3AF;
}

.meta-divider {
  color: #D1D5DB;
}

.country-badge {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}

.country-badge.hot {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: white;
}

.country-badge.trending {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  color: white;
}

.country-badge.premium {
  background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
  color: white;
}

.country-badge.value {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: white;
}

.country-description {
  font-size: 15px;
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 24px;
}

.country-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 2px solid #F3F4F6;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #F9FAFB;
  padding: 16px;
  border-radius: 10px;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon svg {
  width: 20px;
  height: 20px;
  color: white;
}

.stat-icon.tuition {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
}

.stat-icon.duration {
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
}

.stat-icon.visa {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 12px;
  color: #6B7280;
  font-weight: 500;
}

.stat-value {
  font-size: 14px;
  color: #1E3A8A;
  font-weight: 700;
}

.country-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.feature-tag {
  background: #EFF6FF;
  color: #1E40AF;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  border: 1.5px solid #DBEAFE;
}

.programs-available {
  margin-bottom: 20px;
}

.programs-title {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
}

.program-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.program-tag {
  background: white;
  color: #1E40AF;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  border: 1.5px solid #1E40AF;
}

.intake-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #FEF3C7;
  border-radius: 8px;
  font-size: 14px;
  color: #92400E;
  margin-bottom: 24px;
  border: 1px solid #FDE68A;
}

.intake-icon {
  width: 20px;
  height: 20px;
  color: #D97706;
  flex-shrink: 0;
}

.card-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
}

.action-btn svg {
  width: 18px;
  height: 18px;
}

.action-btn.primary {
  background: #1E40AF;
  color: white;
  flex: 1;
}

.action-btn.primary:hover {
  background: #1E3A8A;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
}

.action-btn.secondary {
  background: white;
  color: #1E40AF;
  border-color: #1E40AF;
}

.action-btn.secondary:hover {
  background: #F0F9FF;
}

.action-btn.icon-btn {
  padding: 12px;
  background: white;
  color: #6B7280;
  border-color: #E5E7EB;
}

.action-btn.icon-btn:hover {
  border-color: #1E40AF;
  color: #1E40AF;
}

.action-btn.icon-btn.active {
  background: #1E40AF;
  color: white;
  border-color: #1E40AF;
}

/* Comparison Bar */
.comparison-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 2px solid #E5E7EB;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px 0;
  z-index: 1000;
}

.comparison-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comparison-info {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  color: #374151;
}

.comparison-info svg {
  width: 24px;
  height: 24px;
  color: #1E40AF;
}

.comparison-actions {
  display: flex;
  gap: 12px;
}

.compare-btn {
  padding: 12px 32px;
  background: #1E40AF;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.compare-btn:hover:not(:disabled) {
  background: #1E3A8A;
  transform: translateY(-2px);
}

.compare-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.clear-compare-btn {
  padding: 12px 24px;
  background: white;
  color: #EF4444;
  border: 1.5px solid #EF4444;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-compare-btn:hover {
  background: #EF4444;
  color: white;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  padding: 80px 0;
  position: relative;
  overflow: hidden;
  margin-top: 80px;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(30%, -30%);
}

.cta-content {
  text-align: center;
  position: relative;
  z-index: 2;
}

.cta-title {
  font-size: 42px;
  font-weight: 800;
  color: white;
  margin-bottom: 16px;
}

.cta-description {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  max-width: 700px;
  margin: 0 auto 40px;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  padding: 16px 36px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  gap: 10px;
}

.cta-button svg {
  width: 20px;
  height: 20px;
}

.cta-button.primary {
  background: #EF4444;
  color: white;
  border-color: #EF4444;
}

.cta-button.primary:hover {
  background: #DC2626;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
}

.cta-button.secondary {
  background: transparent;
  color: white;
  border-color: white;
}

.cta-button.secondary:hover {
  background: white;
  color: #1E40AF;
  transform: translateY(-2px);
}

/* Transitions */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 280px 1fr;
    gap: 24px;
  }

  .countries-container.grid {
    grid-template-columns: 1fr;
  }

  .country-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }

  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .filters-sidebar {
    order: 2;
  }

  .main-content {
    order: 1;
  }

  .sidebar-sticky {
    position: relative;
    top: 0;
  }

  .results-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .country-card {
    padding: 24px;
  }

  .country-card.list {
    grid-template-columns: 1fr;
  }

  .country-stats-grid {
    grid-template-columns: 1fr;
  }

  .card-actions {
    flex-wrap: wrap;
  }

  .action-btn.primary {
    flex: 1;
    min-width: 100%;
  }

  .comparison-content {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .comparison-actions {
    flex-direction: column;
  }

  .cta-title {
    font-size: 32px;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .cta-button {
    width: 100%;
    justify-content: center;
  }
}
</style>